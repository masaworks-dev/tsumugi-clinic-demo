import Link from 'next/link';
import type { ReactNode } from 'react';
import { MenuButton } from './chrome';
import { LogoMark, Squiggle } from './icons';
import { CLINIC_NAME, NAV_LEFT, NAV_RIGHT, type NavItem } from './nav';

function NavList({ items, side }: { items: readonly NavItem[]; side: 'l' | 'r' }) {
  return (
    <ul className={`nav ${side}`}>
      {items.map(({ href, label, Icon }) => (
        <li key={href}>
          <Link href={href}>
            <Icon />
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteHeader() {
  return (
    <header className="site-h">
      <div className="in">
        <NavList items={NAV_LEFT} side="l" />
        <Link className="logo" href="/" aria-label={`${CLINIC_NAME} トップへ`}>
          <LogoMark />
          <span>
            <span className="jp">
              つむぎ内科・
              <br />
              こどもクリニック
            </span>
            <span className="en">TSUMUGI INTERNAL MEDICINE &amp; PEDIATRICS</span>
          </span>
        </Link>
        <NavList items={NAV_RIGHT} side="r" />
        <MenuButton />
      </div>
    </header>
  );
}

export type ThreadColor = 'peach' | 'leaf' | 'sky' | 'sun';
const COLORS: Record<ThreadColor, string> = { peach: '#ffb59a', leaf: '#7cc49a', sky: '#6fb1e3', sun: '#ffd25a' };

export function SecHead({ color, children, reveal = true }: { color: ThreadColor; children: ReactNode; reveal?: boolean }) {
  return (
    <div className={`sec-h${reveal ? ' reveal' : ''}`}>
      <Squiggle color={COLORS[color]} />
      <h2>{children}</h2>
    </div>
  );
}

export function PageHead({ en, title, children }: { en: string; title: string; children: ReactNode }) {
  return (
    <div className="pagehead">
      <div className="in">
        <nav className="crumb" aria-label="現在地">
          <Link href="/">ホーム</Link>
          <span aria-hidden="true">›</span>
          <span aria-current="page">{title}</span>
        </nav>
        <p className="en">{en}</p>
        <h1>{title}</h1>
        <p className="lead2">{children}</p>
      </div>
    </div>
  );
}

export function CloudBand() {
  return (
    <div className="cloudband" aria-hidden="true">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
        <path
          d="M0 80V52c21.0 -28 83.9 -28 104.9 0c25.4 -41 101.5 -41 126.8 0c24.8 -32 99.1 -32 123.8 0c19.6 -32 78.3 -32 97.9 0c22.6 -44 90.3 -44 112.8 0c29.6 -36 118.2 -36 147.8 0c25.6 -41 102.3 -41 127.8 0c24.0 -36 95.9 -36 119.8 0c26.0 -38 103.9 -38 129.8 0c25.4 -30 101.5 -30 126.8 0c18.8 -38 75.1 -38 93.9 0c25.6 -42 102.3 -42 127.8 0V80z"
          fill="#c9d8e2"
        />
        <path
          d="M0 80V66c22.7 -27 90.9 -27 113.6 0c31.0 -34 124.0 -34 154.9 0c20.5 -27 81.8 -27 102.3 0c23.8 -33 95.0 -33 118.8 0c27.1 -28 108.3 -28 135.3 0c19.2 -28 76.9 -28 96.1 0c19.4 -33 77.7 -33 97.1 0c29.3 -39 117.3 -39 146.7 0c25.6 -28 102.5 -28 128.1 0c19.8 -30 79.3 -30 99.2 0c23.3 -36 93.4 -36 116.7 0c26.2 -41 105.0 -41 131.2 0V80z"
          fill="#26333d"
        />
      </svg>
    </div>
  );
}

const FOOTER_LINKS: ReadonlyArray<[href: string, label: string]> = [
  ['/first/', 'はじめての方へ'],
  ['/booking/', 'ご予約'],
  ['/price/', '料金案内'],
  ['/#doctor', '医師紹介'],
  ['/#online', 'オンライン診療について'],
  ['/#news', 'お知らせ'],
];

export function SiteFooter() {
  return (
    <footer>
      <div className="in">
        <div>
          <h2>{CLINIC_NAME}（架空）</h2>
          <small>
            東京都〇〇区つむぎ台1-2-3 つむぎビル1階　／　つむぎ台駅 北口から徒歩3分
            <br />
            このサイトはポートフォリオ用のデモです。クリニック名・住所・電話番号・医師はすべて架空で、実在の医療機関とは関係ありません。
          </small>
        </div>
        <div>
          <h2>制作</h2>
          <ul className="flinks">
            {FOOTER_LINKS.map(([href, label]) => (
              <li key={href}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
            <li>
              <a href="/about/">制作について</a>
            </li>
          </ul>
          <small>
            デザイン・実装：Masa（AIを活用し、設計・確認・医療広告ガイドラインへの対応は本人が実施）
            <br />
            使った技術：Next.js・TypeScript・microCMS
            <br />
            イラスト：このサイトのために描いたSVG／院長・院内の写真：AI生成のイメージ
          </small>
        </div>
      </div>
    </footer>
  );
}
