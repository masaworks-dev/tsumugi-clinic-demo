import type { Metadata } from 'next';
import { PageHead, SecHead } from '@/components/layout-parts';
import { LineDemo } from '@/components/LineDemo';

export const metadata: Metadata = { title: 'LINE連携（デモ）' };

const PARTS: ReadonlyArray<[title: string, body: string]> = [
  ['リッチメニュー', 'トーク画面の下に、予約・順番受付・診療時間などのボタンを並べます。よく聞かれることは電話の前にLINEで解決できます。'],
  ['キーワードへの自動返信', '「診療時間」「駐車場」などの言葉に自動で返します。診療時間は送った時刻で計算し、「いまは昼休み」なども添えます。'],
  ['予約のお知らせ', '予約の確認、前日のお知らせ、順番受付の呼び出しをLINEに送ります。電話での問い合わせや、無断キャンセルを減らせます。'],
];

export default function LinePage() {
  return (
    <main className="view sub">
      <PageHead en="LINE" title="LINE連携（デモ）">
        LINE公式アカウントで、予約・お知らせ・よくある質問への返信をまとめて行う例です。
        <br />
        このページの画面はデモで、実際のLINEには送信されません。
      </PageHead>

      <section>
        <div className="in">
          <LineDemo />
        </div>
      </section>

      <section>
        <div className="in">
          <SecHead color="leaf" reveal={false}>
            できること
          </SecHead>
          <div className="ways">
            {PARTS.map(([title, body], i) => (
              <div key={title} className="way">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <h2>{title}</h2>
                <p>{body}</p>
              </div>
            ))}
          </div>
          <p className="note">
            返信の中身はこのデモと本番で同じコードを使っています。LINEのMessaging APIからの受信（署名の確認と返信）も用意してあり、公式アカウントの鍵を設定すれば、そのまま本物のLINEで動きます。
          </p>
        </div>
      </section>
    </main>
  );
}
