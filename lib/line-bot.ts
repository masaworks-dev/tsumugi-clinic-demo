import { clinicStatus, DOW_LABEL, fmt, HOURS, LAST_ENTRY_MIN, type Dow, type Moment } from './hours.ts';

export const SITE_URL = 'https://tsumugi-clinic-demo.netlify.app';

export type BotMessage = {
  text: string;
  link?: { label: string; path: string };
  quick?: readonly string[];
};

const QUICK = ['診療時間', '予約', '順番受付', '料金'] as const;

export function hoursText(): string {
  const groups = new Map<string, Dow[]>();
  const closed: string[] = [];
  for (const d of [1, 2, 3, 4, 5, 6, 0] as const) {
    const slots = HOURS[d];
    if (!slots.length) {
      closed.push(DOW_LABEL[d]);
      continue;
    }
    const key = slots.map(([a, b]) => `${fmt(a)}–${fmt(b)}`).join('／');
    groups.set(key, [...(groups.get(key) ?? []), d]);
  }
  const lines = [...groups].map(([key, days]) => `${days.map((d) => DOW_LABEL[d]).join('・')}　${key}`);
  return [...lines, `休診　${[...closed, '祝'].join('・')}`].join('\n');
}

const hoursReply = (now: Moment): BotMessage => {
  const s = clinicStatus(now);
  return {
    text: `いまは「${s.text}」（${s.sub}）\n\n【診療時間】\n${hoursText()}\n\n受付は終了の${LAST_ENTRY_MIN}分前までです。`,
    link: { label: '混み具合を見る', path: '/#reserve' },
  };
};

type Rule = { match: RegExp; reply: (now: Moment) => BotMessage };

// 上から順に見て、最初に当てはまったものを返す（「順番予約」は順番受付として扱う）
const RULES: readonly Rule[] = [
  { match: /診療時間|休診|何時|やって|開いて/, reply: hoursReply },
  {
    match: /順番/,
    reply: () => ({
      text: '今日の順番受付はこちらからできます。\n呼び出しが近づくと、このトークにお知らせが届きます。',
      link: { label: '順番受付をする', path: '/#reserve' },
    }),
  },
  {
    match: /予約|よやく/,
    reply: () => ({
      text: 'WEB予約は24時間受け付けています。日時を決める「時間予約」と、当日の「順番受付」を選べます。',
      link: { label: 'WEB予約を開く', path: '/booking/' },
    }),
  },
  {
    match: /料金|値段|費用|いくら/,
    reply: () => ({ text: '予防接種・健診・自費の検査の料金はこちらです。', link: { label: '料金を見る', path: '/price/' } }),
  },
  {
    match: /初めて|はじめて|初診|持ち物/,
    reply: () => ({
      text: 'はじめての方は、マイナ保険証（または保険証）とお薬手帳をお持ちください。',
      link: { label: '受診の流れを見る', path: '/first/' },
    }),
  },
  {
    match: /アクセス|場所|地図|駐車|行き方/,
    reply: () => ({ text: '駐車場は2台（ビル裏）です。', link: { label: '地図を見る', path: '/#access' } }),
  },
  {
    match: /電話/,
    reply: () => ({ text: 'デモのため電話はつながりません。本番では、ここに医院の電話番号が入ります。' }),
  },
];

const FALLBACK: BotMessage = {
  text: 'メッセージありがとうございます。\nこのアカウントでは個別のお返事はしていません。下のボタンかメニューからお選びください。',
  quick: QUICK,
};

export function replyFor(input: string, now: Moment): BotMessage {
  const text = input.normalize('NFKC').trim();
  const rule = RULES.find((r) => r.match.test(text));
  return rule ? { quick: QUICK, ...rule.reply(now) } : FALLBACK;
}

export function greeting(name?: string): BotMessage {
  return {
    text: `${name ? `${name}さん、` : ''}友だち追加ありがとうございます。\nつむぎ内科・こどもクリニック（デモ）です。\n\n下のメニューから、WEB予約・順番受付・診療時間などを確認できます。`,
    quick: QUICK,
  };
}

export const reminderMessage = (when: string, dept: string): BotMessage => ({
  text: `【前日のお知らせ】\n明日 ${when}に${dept}のご予約があります。\nマイナ保険証とお薬手帳をお持ちください。`,
  link: { label: '予約を確認・変更する', path: '/booking/' },
});

export const queueCallMessage = (ahead: number): BotMessage => ({
  text: `【順番受付】\nまもなく順番です。あと${ahead}人で呼び出します。\n院内か、近くでお待ちください。`,
});

export type MenuAction = { type: 'uri'; path: string } | { type: 'message'; text: string };
export type MenuTile = { label: string; sub: string; action: MenuAction };

export const RICH_MENU: readonly MenuTile[] = [
  { label: 'WEB予約', sub: '日時を選んで予約', action: { type: 'uri', path: '/booking/' } },
  { label: '順番受付', sub: '今日、来た順に呼び出し', action: { type: 'uri', path: '/#reserve' } },
  { label: '診療時間', sub: '休診日もこちら', action: { type: 'message', text: '診療時間' } },
  { label: 'はじめての方', sub: '持ち物と受診の流れ', action: { type: 'uri', path: '/first/' } },
  { label: '料金', sub: '予防接種・健診など', action: { type: 'uri', path: '/price/' } },
  { label: 'アクセス', sub: '地図と駐車場', action: { type: 'message', text: 'アクセス' } },
];

// Messaging API のリッチメニュー作成（POST /v2/bot/richmenu）に渡す形。画像は 2500×1686 の3列×2段
export function richMenuRequest() {
  const w = [833, 834, 833];
  return {
    size: { width: 2500, height: 1686 },
    selected: true,
    name: 'main',
    chatBarText: 'メニュー',
    areas: RICH_MENU.map((t, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      return {
        bounds: { x: w.slice(0, col).reduce((a, b) => a + b, 0), y: row * 843, width: w[col]!, height: 843 },
        action:
          t.action.type === 'uri'
            ? { type: 'uri', label: t.label, uri: SITE_URL + t.action.path }
            : { type: 'message', label: t.label, text: t.action.text },
      };
    }),
  };
}
