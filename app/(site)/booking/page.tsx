import type { Metadata } from 'next';
import Link from 'next/link';
import { OpenButton } from '@/components/chrome';
import { PageHead, SecHead } from '@/components/layout-parts';

export const metadata: Metadata = { title: 'ご予約' };

const COMPARE: ReadonlyArray<[label: string, time: string, queue: string]> = [
  ['向いている方', '健診・予防接種・定期の診察など、予定が決まっている方', '急な発熱やせきなど、今日みてほしい方'],
  ['受付できる日', '翌日から2週間先まで', '当日の診療時間内のみ'],
  ['来院のタイミング', '予約時間の5分前まで', '「あと3人」のお知らせが届いたら'],
  ['待ち時間の目安', '短め（検査がある日は延びることがあります）', 'WEBとLINEで、待ち人数をいつでも確認できます'],
];

export default function BookingPage() {
  return (
    <main className="view sub">
      <PageHead en="RESERVATION" title="ご予約">
        ご予約は、WEB・LINE・お電話で受け付けています。
        <br />
        予約がなくても受診できますが、予約の方を優先してご案内します。
      </PageHead>

      <section>
        <div className="in">
          <div className="ways">
            <div className="way">
              <span className="num">01</span>
              <h2>WEBで予約</h2>
              <p>24時間受け付けています。日時を決める「時間予約」と、当日来た順に呼ぶ「順番受付」を選べます。</p>
              <OpenButton overlay={{ kind: 'book' }} className="btn y">
                WEB予約（デモ）を開く
              </OpenButton>
            </div>
            <div className="way">
              <span className="num">02</span>
              <h2>LINEで予約</h2>
              <p>友だち追加すると、LINEの中で予約でき、確認と前日のお知らせが届きます。順番受付の呼び出しも届きます。</p>
              <Link href="/line/" className="btn g">
                LINEのデモを試す
              </Link>
            </div>
            <div className="way">
              <span className="num">03</span>
              <h2>お電話で予約</h2>
              <p className="tel">03-0000-0000</p>
              <p>診療時間内に受け付けています（受付は終了の30分前まで）。デモ用の番号のため、実際にはつながりません。</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="in">
          <SecHead color="sky" reveal={false}>
            時間予約と順番受付のちがい
          </SecHead>
          <div className="scroll card" style={{ padding: 0 }}>
            <table className="cmp">
              <thead>
                <tr>
                  <th scope="col" />
                  <th scope="col">時間予約</th>
                  <th scope="col">順番受付</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([label, time, queue]) => (
                  <tr key={label}>
                    <th scope="row">{label}</th>
                    <td>{time}</td>
                    <td>{queue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="in two">
          <div className="card">
            <h3>発熱・感染症が心配な方へ</h3>
            <p className="p2">
              発熱、せき、のどの痛みがある方は、WEB問診で症状を入力してからお越しください。ほかの患者さんと分けて、別の待合室にご案内します。
            </p>
          </div>
          <div className="card">
            <h3>変更・キャンセル</h3>
            <p className="p2">
              予約の変更・キャンセルは、WEB・LINEから前日の18:30まで行えます。当日の変更はお電話でご連絡ください。キャンセル料はかかりません。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
