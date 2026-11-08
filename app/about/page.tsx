import type { Metadata } from 'next';
import './about.css';

export const metadata: Metadata = {
  title: '制作について',
  description: '架空の内科・小児科クリニックのデモサイトについて、工夫した点と医療広告ガイドラインへの対応をまとめたページです。',
};

const OVERVIEW: ReadonlyArray<[dt: string, dd: string]> = [
  ['想定した医院', '東京の住宅街にある、内科と小児科の診療所（院長1名）。患者さんは近所の家族と高齢の方が中心。'],
  ['担当範囲', '構成、文章、イラスト、デザイン、コーディング、スマホ対応、表示確認'],
  ['ページ', 'トップ、ご予約、料金案内、はじめての方へ（予約デモ・LINE通知の見本つき）'],
  ['使った技術', 'Next.js（App Router・静的書き出し）、TypeScript、microCMS、SVGで描いたイラスト。写真はCanvaのAI生成。'],
  ['AIの使い方', 'コードの下書きと画像の生成にAIを使い、構成の判断、文章、ガイドラインの確認、表示の検証は自分で行いました。'],
];

const FACTS: ReadonlyArray<[b: string, span: string]> = [
  ['4ページ', 'すべて静的なHTMLに書き出し'],
  ['strict', 'TypeScriptの厳しい型チェックで作成'],
  ['3か所', '予約への入口（上・右端・スマホ下）'],
  ['390px〜', 'スマホ幅で横はみ出しなし'],
];

const POINTS: ReadonlyArray<[h: string, p: string]> = [
  [
    '時刻で変わる「今日の診療状況」',
    '日本時間に合わせて「診療中・受付終了まであと◯分・昼休み・休診日」を自動で表示し、時間表の今日の列も色を変えます。「今行って間に合うか」が、一目で分かるようにしました。',
  ],
  [
    '時間予約と順番受付の両方',
    '内科・小児科では、日時を決める予約より「来た順に呼ぶ」順番受付が多く使われます。待ち人数と呼び出しの目安を表示し、予約の流れは3つの手順に絞りました。',
  ],
  [
    'どこからでも予約できる導線',
    'PCでは、上に残るヘッダー（電話・受付時間）と右端の縦メニューを置きました。スマホでは、親指で押しやすい画面下に「電話・LINE・WEB予約」のバーを出します。',
  ],
  [
    '診療時間は1か所のデータから',
    '診療時間を型つきのデータとして1か所にまとめ、診療状況の表示・時間表・予約できる時間の枠を、すべてそこから計算しています。時間が変わっても、直すのは1か所だけです。',
  ],
  [
    '動きは「見せ場」と「操作」だけ',
    'トップのイラストが描かれる動きと、ボタンやアイコンの反応だけに動きを付けました。時間表・料金・掲示は動かしません。端末で「視差効果を減らす」を設定している方には、すべての動きを止めます。',
  ],
  [
    '個人情報を受け取らないデモ',
    '予約デモは、どこにも送信も保存もしません。本番では、予約サービス（SelectType・Airリザーブなど）とLINE公式アカウントにつなぐ想定です。',
  ],
];

const RULES: ReadonlyArray<[rule: string, how: string]> = [
  ['患者の体験談・口コミを載せない', '「患者さんの声」の欄は作らず、院長のあいさつだけにしました'],
  ['治療前後の写真（Before/After）を載せない', '参考にしたサイトの「症例写真」にあたる欄は作っていません'],
  ['他院と比べて優れていると見せる表現をしない', '「選ばれる理由」「No.1」は使わず、「当院の診療体制」などの事実の説明にしました'],
  ['自費診療は料金を明示する', '予防接種・健診・文書料を、税込みの金額で料金案内ページに載せました'],
  ['オンライン診療の掲示（2026年度の改定）', '対象・処方・費用・急変時の対応を、トップページに記載例として載せました'],
  ['実在の医療機関と誤解させない', '医院名・住所・電話・医師はすべて架空と明記し、写真には「AI生成のイメージ」と表記しました'],
];

export default function AboutPage() {
  return (
    <>
      <div className="bar">
        <div className="in">
          <span>ポートフォリオ：制作の説明ページ</span>
          <a href="/">← デモサイトに戻る</a>
        </div>
      </div>
      <header>
        <div className="in">
          <p className="en">CASE STUDY</p>
          <h1>
            つむぎ内科・こどもクリニック
            <br />
            （架空）のサイト制作
          </h1>
          <p>
            地域の内科・小児科を想定したホームページのデモです。「具合の悪い人が、スマホで迷わず予約できること」と「医療広告ガイドラインに沿うこと」を軸に、企画・文章・デザイン・実装まで一人で行いました。
          </p>
          <div className="cta" style={{ marginTop: 22 }}>
            <a className="btn" href="/">
              デモサイトを見る
            </a>
            <a className="btn w" href="/booking/">
              ご予約ページを見る
            </a>
          </div>
        </div>
      </header>

      <section>
        <div className="in">
          <h2>概要</h2>
          <dl className="over">
            {OVERVIEW.map(([dt, dd]) => (
              <div key={dt} style={{ display: 'contents' }}>
                <dt>{dt}</dt>
                <dd>{dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section>
        <div className="in">
          <h2>数字で見ると</h2>
          <div className="facts">
            {FACTS.map(([b, s]) => (
              <div className="fact" key={b}>
                <b>{b}</b>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <p className="note">写真は表示される直前に読み込み、スマホには小さいサイズ（約10〜30KB）を出し分けています。</p>
        </div>
      </section>

      <section>
        <div className="in">
          <h2>工夫した点</h2>
          <div className="points">
            {POINTS.map(([h, p]) => (
              <div className="pt" key={h}>
                <h3>{h}</h3>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="in">
          <h2>医療広告ガイドラインへの対応</h2>
          <div className="scroll">
            <table>
              <thead>
                <tr>
                  <th scope="col">ルール</th>
                  <th scope="col">このサイトでの対応</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {RULES.map(([r, h]) => (
                  <tr key={r}>
                    <td>{r}</td>
                    <td>{h}</td>
                    <td className="ok">対応</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="note">実際の医院で制作するときは、掲載内容を医院の方に確認していただいたうえで公開します。</p>
        </div>
      </section>

      <section>
        <div className="in">
          <h2>本番で作る場合</h2>
          <ul className="plain">
            <li>お知らせは、このデモでもmicroCMSから読み込んでいます。医院の方が管理画面で書き換えると、サイトにそのまま反映されます</li>
            <li>予約は、医院で使っている予約サービスかLINE公式アカウントを埋め込みます</li>
            <li>公開後に、表示速度とGoogleでの見え方を確認してお渡しします</li>
          </ul>
        </div>
      </section>

      <footer>
        <div className="in">制作：Masa　／　つむぎ内科・こどもクリニックは架空の医院で、実在の医療機関とは関係ありません。</div>
      </footer>
    </>
  );
}
