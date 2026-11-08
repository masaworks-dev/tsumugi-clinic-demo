import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHead, SecHead } from '@/components/layout-parts';

export const metadata: Metadata = { title: 'はじめての方へ' };

const STEPS: ReadonlyArray<[title: string, text: string]> = [
  ['予約する', 'WEB・LINE・お電話で。予約なしでも受診できます。'],
  ['WEB問診に答える', 'スマホで3分ほど。受付での記入がいらなくなります。'],
  ['来院・受付', 'マイナ保険証を受付の読み取り機に置いてください。'],
  ['診察', '症状と、生活やお仕事の事情も伺ってから方針をご説明します。'],
  ['会計・お薬', '処方箋は近くの薬局へ。お薬はLINEで薬局に送ることもできます。'],
];

const FAQ: ReadonlyArray<[q: string, a: string]> = [
  ['予約しないと受診できませんか？', '予約なしでも受診できます。予約の方を優先するため、お待ちいただく時間が長くなることがあります。'],
  ['中学生がひとりで受診してもいいですか？', 'はじめての受診は、保護者の方と一緒にお越しください。2回目以降で症状が軽い場合は、事前にお電話でご相談ください。'],
  ['車で行けますか？', 'ビルの裏に2台分の駐車場があります。満車のときは、近くのコインパーキングをご利用ください。'],
];

export default function FirstVisitPage() {
  return (
    <main className="view sub">
      <PageHead en="FIRST VISIT" title="はじめての方へ">
        はじめて受診される方に、予約から会計までの流れと、お持ちいただくものをご案内します。
      </PageHead>

      <section>
        <div className="in">
          <SecHead color="leaf" reveal={false}>
            受診の流れ
          </SecHead>
          <ol className="steps5">
            {STEPS.map(([t, p]) => (
              <li key={t}>
                <b>{t}</b>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="in two">
          <div className="card">
            <h3>お持ちいただくもの</h3>
            <ul className="chk">
              <li>マイナ保険証、または資格確認書</li>
              <li>お薬手帳（飲んでいるお薬がある方）</li>
              <li>紹介状・健診の結果（お持ちの方）</li>
            </ul>
          </div>
          <div className="card">
            <h3>こどもの受診</h3>
            <ul className="chk">
              <li>保護者の方と一緒にお越しください</li>
              <li>母子手帳と、こども医療証をお持ちください</li>
              <li>ベビーカーのまま入れます。おむつ替えの台があります</li>
            </ul>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="in">
          <SecHead color="sun" reveal={false}>
            よくあるご質問
          </SecHead>
          <div className="faq">
            {FAQ.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
            <details>
              <summary>オンライン診療は、はじめてでも使えますか？</summary>
              <p>
                オンライン診療は、一度当院で対面の診察を受けた方を中心にご案内しています。
                <Link href="/#online">トップページの「オンライン診療について」</Link>もご覧ください。
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>
  );
}
