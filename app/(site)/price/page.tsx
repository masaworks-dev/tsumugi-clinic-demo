import type { Metadata } from 'next';
import { PageHead } from '@/components/layout-parts';

export const metadata: Metadata = { title: '料金案内' };

type PriceRow = { item: string; price: string };
type PriceCategory = { name: string; rows: PriceRow[]; note?: string };

// デモ用の金額（税込み）
const PRICES: readonly PriceCategory[] = [
  {
    name: '予防接種',
    rows: [
      { item: 'インフルエンザ（13歳以上）', price: '3,800円' },
      { item: 'インフルエンザ（13歳未満・1回あたり）', price: '3,300円' },
      { item: 'おたふくかぜ', price: '5,500円' },
      { item: '帯状疱疹（不活化ワクチン・1回あたり）', price: '22,000円' },
    ],
    note: '定期接種は、区の助成により自己負担なしで受けられます。対象年齢は区のお知らせをご確認ください。',
  },
  {
    name: '健康診断',
    rows: [
      { item: '雇入時健康診断（基本項目）', price: '8,800円' },
      { item: '一般健康診断（血液検査つき）', price: '12,100円' },
      { item: '特定健診（区の受診券をお持ちの方）', price: '受診券の自己負担額' },
    ],
  },
  {
    name: '文書料',
    rows: [
      { item: '診断書（当院の書式）', price: '3,300円' },
      { item: '診断書（会社・学校の書式）', price: '5,500円' },
      { item: '登園・登校許可書', price: '1,100円' },
    ],
  },
];

export default function PricePage() {
  return (
    <main className="view sub">
      <PageHead en="PRICE" title="料金案内">
        保険診療は、加入している健康保険の負担割合に応じたお支払いになります。
        <br />
        ここでは、保険がきかない自費の料金をご案内します。
      </PageHead>
      <section>
        <div className="in">
          <p className="demo-note" style={{ maxWidth: 'none' }}>
            デモサイトのため、料金は架空の例です。実際の医院では、院内の掲示と同じ金額を載せます。
          </p>
          {PRICES.map((c) => (
            <div className="cat" key={c.name}>
              <h2 className="vlabel">{c.name}</h2>
              <div className="plist">
                {c.rows.map((r) => (
                  <div key={r.item}>
                    <span>{r.item}</span>
                    <b>{r.price}</b>
                  </div>
                ))}
                {c.note && <p className="pnote">{c.note}</p>}
              </div>
            </div>
          ))}
          <p className="note">料金はすべて税込みです。お支払いは、現金・クレジットカード・電子マネー・QRコード決済をご利用いただけます。</p>
        </div>
      </section>
    </main>
  );
}
