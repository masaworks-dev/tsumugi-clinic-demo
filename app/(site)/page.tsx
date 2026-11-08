import { OpenButton, StatusBadge } from '@/components/chrome';
import { Gallery, NewsList, WaitCard } from '@/components/home-widgets';
import { HoursTable } from '@/components/HoursTable';
import { HeroArt, MapArt, SymptomIcon, type Symptom } from '@/components/home-art';
import { SecHead } from '@/components/layout-parts';
import { IconCalendar } from '@/components/icons';

const SYMPTOMS: ReadonlyArray<{ key: Symptom; title: string; sub: string }> = [
  { key: 'fever', title: '発熱', sub: '急な熱、だるさ' },
  { key: 'cough', title: 'せき・のど', sub: 'かぜの症状' },
  { key: 'stomach', title: 'おなか', sub: '腹痛、下痢、吐き気' },
  { key: 'vaccine', title: '予防接種', sub: '定期接種・任意接種' },
  { key: 'bp', title: '血圧・血糖', sub: '生活習慣病の管理' },
  { key: 'checkup', title: '健康診断', sub: '特定健診・企業健診' },
  { key: 'allergy', title: 'アレルギー', sub: '花粉症、じんましん' },
];

export default function HomePage() {
  return (
    <main className="view" id="top">
      <div className="hero">
        <svg className="cloud c1" viewBox="0 0 180 70" aria-hidden="true">
          <path d="M20 60c-14 0-16-20 0-22 0-16 20-22 30-12 6-18 34-20 42-2 16-8 32 4 26 18 18 0 22 18 6 18z" fill="#fff" stroke="#c9d6de" strokeWidth="2" />
        </svg>
        <svg className="cloud c2" viewBox="0 0 180 70" aria-hidden="true">
          <path d="M20 60c-14 0-16-20 0-22 0-16 20-22 30-12 6-18 34-20 42-2 16-8 32 4 26 18 18 0 22 18 6 18z" fill="#fff" stroke="#c9d6de" strokeWidth="2" />
        </svg>
        <div className="in">
          <div>
            <StatusBadge />
            <h1>
              <span className="nw">「なんだか、</span>
              <span className="nw">いつもとちがう」</span>
              <br />
              <span className="nw">そんな日に、</span>
              <span className="nw">
                <em>まず相談できる</em>
              </span>
              <span className="nw">場所。</span>
            </h1>
            <p className="lead">おとなも、こどもも。内科と小児科を、ひとつの医院で。つむぎ台駅の北口から歩いて3分です。</p>
            <div className="cta">
              <OpenButton overlay={{ kind: 'book' }} className="btn y">
                <IconCalendar />
                WEBで予約する
              </OpenButton>
              <OpenButton overlay={{ kind: 'hours' }} className="btn">
                診療時間を見る
              </OpenButton>
            </div>
          </div>
          <div className="art">
            <HeroArt />
          </div>
        </div>
      </div>
      <div className="in" id="reserve">
        <WaitCard />
      </div>
      <section id="medical">
        <div className="in">
          <SecHead color="peach">こんなときに、ご相談ください</SecHead>
          <div className="tiles">
            {SYMPTOMS.map((s) => (
              <OpenButton key={s.key} overlay={{ kind: 'book', sym: s.title }} className="tile reveal">
                <SymptomIcon name={s.key} />
                {s.title}
                <span>{s.sub}</span>
              </OpenButton>
            ))}
            <a className="tile reveal" href="#online">
              <SymptomIcon name="online" />
              オンライン診療<span>再診の方を中心に</span>
            </a>
          </div>
        </div>
      </section>
      <section id="inside" style={{ paddingTop: 0 }}>
        <div className="in">
          <SecHead color="leaf">院内のようす</SecHead>
          <Gallery />
          <p className="note">写真はすべてAI生成のイメージです（架空のクリニック）。</p>
        </div>
      </section>
      <section id="access" style={{ paddingTop: 0 }}>
        <div className="in two">
          <div className="card reveal">
            <h3>診療時間</h3>
            <div className="scroll">
              <HoursTable />
            </div>
            <p className="note">△ 土曜は9:00–13:00。木曜・日曜・祝日は休診です。受付は診療終了の30分前までです。</p>
          </div>
          <div className="card reveal">
            <h3>アクセス</h3>
            <div className="map">
              <MapArt />
            </div>
            <dl className="info">
              <dt>住所</dt>
              <dd>東京都〇〇区つむぎ台1-2-3 つむぎビル1階（架空）</dd>
              <dt>駐車場</dt>
              <dd>2台（ビル裏）</dd>
              <dt>電話</dt>
              <dd>03-0000-0000（デモ用の番号）</dd>
            </dl>
          </div>
        </div>
      </section>
      <section id="first" style={{ paddingTop: 0 }}>
        <div className="in">
          <SecHead color="leaf">はじめての方へ</SecHead>
          <div className="flow">
            <div className="reveal">
              <b>WEBかLINEで予約</b>
              <p>時間を決める「時間予約」と、来た順に呼ぶ「順番受付」を選べます。お電話でも受け付けています。</p>
            </div>
            <div className="reveal">
              <b>WEB問診に回答</b>
              <p>来院前にスマホで症状を入力していただくと、受付での待ち時間が短くなります。</p>
            </div>
            <div className="reveal">
              <b>来院・受付</b>
              <p>マイナ保険証または資格確認書、お薬手帳、こどもの場合は母子手帳をお持ちください。</p>
            </div>
          </div>
        </div>
      </section>
      <section id="doctor" style={{ paddingTop: 0 }}>
        <div className="in">
          <SecHead color="sky">医師紹介</SecHead>
          <div className="doc">
            <figure className="docfig reveal">
              <img
                src="/doctor-900.webp"
                srcSet="/doctor-480.webp 480w, /doctor-900.webp 900w"
                sizes="(max-width:860px) 80vw, 320px"
                width={900}
                height={1125}
                loading="lazy"
                decoding="async"
                alt="白衣を着て微笑む院長（AI生成のイメージ）"
              />
              <figcaption>AI生成のイメージです（架空の医師）</figcaption>
            </figure>
            <div className="reveal">
              <p className="role">院長　内科・小児科</p>
              <h3>
                森川 結<span style={{ fontSize: '.9rem', color: 'var(--sub)', marginLeft: 10 }}>もりかわ ゆい（架空の医師）</span>
              </h3>
              <ul>
                <li>〇〇大学医学部卒業</li>
                <li>〇〇総合病院 内科・小児科で勤務</li>
                <li>日本内科学会 認定内科医（設定上の資格）</li>
              </ul>
              <blockquote>
                熱やせきのような身近な症状から、血圧や血糖の管理まで、家族みなさんの「かかりつけ」でいたいと考えています。気になることは、小さなことでもお話しください。
              </blockquote>
            </div>
          </div>
        </div>
      </section>
      <section id="news" style={{ paddingTop: 0 }}>
        <div className="in">
          <SecHead color="sun">お知らせ</SecHead>
          <NewsList />
        </div>
      </section>
      <section id="online" style={{ paddingTop: 0 }}>
        <div className="in">
          <SecHead color="sky">オンライン診療について</SecHead>
          <div className="online reveal">
            <h3>当院のオンライン診療（掲示事項）</h3>
            <ul>
              <li>対象：当院で一度以上対面診療を受けた再診の方が中心です</li>
              <li>初診の方は、症状により対面での受診をお願いすることがあります</li>
              <li>使用するサービス：オンライン診療システム（予約時にご案内）</li>
            </ul>
            <ul>
              <li>処方：お薬は院外処方箋を薬局へ送付します</li>
              <li>費用：保険診療の自己負担分のほか、システム利用料はかかりません</li>
              <li>症状が急に悪くなった場合は、対面での受診や救急をご案内します</li>
            </ul>
            <p className="note" style={{ gridColumn: '1/-1', margin: 0 }}>
              ※デモのための記載例です。実際の掲示内容は、厚生労働省の指針と各医院の運用に合わせて作成します。
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
