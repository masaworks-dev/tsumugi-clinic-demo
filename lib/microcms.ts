export type NewsItem = {
  id: string;
  date: string; // 2026-11-04 のような表示用
  dateTime: string; // <time datetime>
  category: string;
  title: string;
  body?: string;
};

type MicroCmsNews = {
  id: string;
  title: string;
  body?: string;
  category?: string | string[];
  date?: string;
  publishedAt?: string;
};

type MicroCmsList<T> = { contents: T[]; totalCount: number };

// news の GET だけを許可したキー（公開しても書き込みはできない）
const CMS = {
  service: 'tsumugi-demo',
  key: 'xH0c6VRWkcGE9tDbxKAv3cCpMBrKOKFED8js',
} as const;

const ymd = new Intl.DateTimeFormat('ja-JP', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function toNewsItem(raw: MicroCmsNews): NewsItem {
  const d = new Date(raw.date ?? raw.publishedAt ?? Date.now());
  const category = (Array.isArray(raw.category) ? raw.category[0] : raw.category) || 'お知らせ';
  return {
    id: raw.id,
    date: ymd.format(d).replace(/\//g, '.'),
    dateTime: d.toISOString().slice(0, 10),
    category,
    title: raw.title,
    body: raw.body,
  };
}

export async function fetchNews(limit = 5, signal?: AbortSignal): Promise<NewsItem[]> {
  const url = `https://${CMS.service}.microcms.io/api/v1/news?limit=${limit}&orders=-date`;
  const res = await fetch(url, { headers: { 'X-MICROCMS-API-KEY': CMS.key }, signal });
  if (!res.ok) throw new Error(`microCMS ${res.status}`);
  const data = (await res.json()) as MicroCmsList<MicroCmsNews>;
  return data.contents.map(toNewsItem);
}

// 取得に失敗したとき用
export const FALLBACK_NEWS: NewsItem[] = [
  { id: 'f1', date: '2026.11.04', dateTime: '2026-11-04', category: '休診', title: '11月23日（月・祝）は休診です。' },
  {
    id: 'f2',
    date: '2026.10.20',
    dateTime: '2026-10-20',
    category: '予防接種',
    title: 'インフルエンザ予防接種の予約を受け付けています。料金は院内の掲示をご覧ください。',
  },
  {
    id: 'f3',
    date: '2026.10.01',
    dateTime: '2026-10-01',
    category: 'お知らせ',
    title: 'LINEで予約の確認と前日のお知らせを受け取れるようになりました。',
  },
];
