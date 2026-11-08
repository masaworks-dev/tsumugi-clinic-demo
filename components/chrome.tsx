'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, type ReactNode } from 'react';
import { CLOCK_OPTIONS, DOW_LABEL, dotClass, type ClockMode } from '@/lib/hours';
import { useClinic, type Overlay } from './ClinicProvider';
import { IconCalendar, IconLineSmall, IconMenu, IconPhone, LogoMark } from './icons';
import { CLINIC_NAME, DEMO_TEL } from './nav';

export function OpenButton({
  overlay,
  className,
  children,
  ...rest
}: { overlay: Overlay; className?: string; children: ReactNode } & Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  'onClick' | 'type'
>) {
  const { open } = useClinic();
  return (
    <button type="button" className={className} onClick={() => open(overlay)} {...rest}>
      {children}
    </button>
  );
}

export function DemoBar() {
  const { clock, setClock } = useClinic();
  return (
    <div className="demo-bar">
      <div className="in">
        <span>
          <b>デモサイト</b>　架空のクリニックです。実在の医院・医師とは関係なく、予約やLINEは外部に送信されません。
          <a href="/about/" style={{ color: 'var(--sun)', marginLeft: 8 }}>
            制作について
          </a>
        </span>
        <label>
          表示する時刻
          <select value={clock} onChange={(e) => setClock(e.target.value as ClockMode)}>
            {CLOCK_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

export const MenuButton = () => (
  <OpenButton overlay={{ kind: 'menu' }} className="menu-btn" aria-label="メニューを開く">
    <IconMenu />
    メニュー
  </OpenButton>
);

function useScrolledPast(y: number): boolean {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const on = () => setPast(scrollY > y);
    on();
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, [y]);
  return past;
}

export function StickyHeader() {
  const show = useScrolledPast(260);
  return (
    <div className={`stk${show ? ' show' : ''}`}>
      <div className="in">
        <Link className="slogo" href="/">
          <LogoMark small />
          <span>{CLINIC_NAME}</span>
        </Link>
        <div className="stel">
          <span className="n">{DEMO_TEL}</span>
          <small>受付 平日 9:00–12:00／15:00–18:00　土 9:00–12:30</small>
        </div>
        <OpenButton overlay={{ kind: 'book' }} className="btn y">
          WEB予約
        </OpenButton>
        <MenuButton />
      </div>
    </div>
  );
}

export function SideNav() {
  const { status } = useClinic();
  return (
    <nav className="side" aria-label="予約と診療時間">
      <OpenButton overlay={{ kind: 'line' }} className="b-line">
        <svg viewBox="0 0 28 28" aria-hidden="true">
          <path d="M14 4C7.4 4 3 8 3 12.6c0 4 3.4 7.4 8.4 8.2l-.6 3.6 4.6-3.4C21 20.6 25 17 25 12.6 25 8 20.6 4 14 4z" fill="#2f9e5b" stroke="#26333d" strokeWidth="1.8" strokeLinejoin="round" />
        </svg>
        <span className="t">LINEで予約</span>
      </OpenButton>
      <OpenButton overlay={{ kind: 'book' }} className="b-web">
        <svg viewBox="0 0 28 28" aria-hidden="true">
          <rect x="4" y="6" width="20" height="18" rx="4" fill="#fff" stroke="#26333d" strokeWidth="1.8" />
          <path d="M4 11h20M10 3v5M18 3v5" stroke="#26333d" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <span className="t">WEBで予約</span>
      </OpenButton>
      <OpenButton overlay={{ kind: 'hours' }} className="b-hours">
        <span className={`dot ${dotClass(status)}`} />
        <span className="t">診療時間</span>
      </OpenButton>
    </nav>
  );
}

export function MobileBar() {
  const show = useScrolledPast(220);
  return (
    <nav className={`mbar${show ? ' show' : ''}`} aria-label="予約と電話">
      <OpenButton overlay={{ kind: 'tel' }}>
        <IconPhone />
        電話
      </OpenButton>
      <OpenButton overlay={{ kind: 'line' }} className="l">
        <IconLineSmall />
        LINE予約
      </OpenButton>
      <OpenButton overlay={{ kind: 'book' }} className="w">
        <IconCalendar />
        WEB予約
      </OpenButton>
    </nav>
  );
}

export function StatusBadge() {
  const { status, moment } = useClinic();
  return (
    <div className="status" role="status" aria-live="polite">
      <span className={`dot ${dotClass(status)}`} />
      <span>{`今日（${DOW_LABEL[moment.dow]}）｜${status.text}`}</span>
      <small>{status.sub}</small>
    </div>
  );
}

// 旧サイトはハッシュで下層ページを切り替えていたので、そのURLを新しいページへ
const OLD_HASH: Record<string, string> = {
  '#page-booking': '/booking/',
  '#page-price': '/price/',
  '#page-first': '/first/',
};

export function PageEffects() {
  const pathname = usePathname();
  const { close, reduceMotion } = useClinic();

  useEffect(() => {
    const go = () => {
      const to = OLD_HASH[location.hash];
      if (to) location.replace(to);
    };
    go();
    addEventListener('hashchange', go);
    return () => removeEventListener('hashchange', go);
  }, []);

  useEffect(() => {
    close(false);
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.remove('pre');
            io.unobserve(en.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('.reveal').forEach((el) => {
      if (el.getBoundingClientRect().top > innerHeight) {
        el.classList.add('pre');
        io.observe(el);
      }
    });
    return () => io.disconnect();
  }, [pathname, reduceMotion, close]);

  return null;
}
