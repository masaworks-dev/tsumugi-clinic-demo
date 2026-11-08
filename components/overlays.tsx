'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useClinic, type OverlayKind } from './ClinicProvider';
import { BookingFlow } from './BookingFlow';
import { HoursTable } from './HoursTable';
import { LinePhone } from './LinePhone';
import { NAV_LEFT, NAV_RIGHT, DEMO_TEL } from './nav';
import { OpenButton } from './chrome';
import { dotClass } from '@/lib/hours';

function Dialog({ kind, title, children }: { kind: OverlayKind; title: string; children: ReactNode }) {
  const { overlay, close } = useClinic();
  const x = useRef<HTMLButtonElement>(null);
  const isOpen = overlay?.kind === kind;
  const titleId = `${kind}Title`;

  useEffect(() => {
    if (isOpen) x.current?.focus();
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="ov" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="dlg" role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header>
          <h2 id={titleId}>{title}</h2>
          <button ref={x} className="x" type="button" aria-label="閉じる" onClick={() => close()}>
            ✕
          </button>
        </header>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

// hidden を外した直後に .open を付けるとトランジションが効かないので、2フレーム待つ
function Drawer({ kind, label, children }: { kind: OverlayKind; label: string; children: ReactNode }) {
  const { overlay, close } = useClinic();
  const isOpen = overlay?.kind === kind;
  const [mounted, setMounted] = useState(false);
  const [slid, setSlid] = useState(false);
  const x = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setSlid(true)));
      return () => cancelAnimationFrame(r);
    }
    setSlid(false);
    const t = setTimeout(() => setMounted(false), 320);
    return () => clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    if (slid) x.current?.focus();
  }, [slid]);

  return (
    <aside className={`drawer${slid ? ' open' : ''}`} aria-label={label} hidden={!mounted}>
      <div className="head">
        <h2 style={{ fontSize: '1.2rem' }}>{label}</h2>
        <button ref={x} className="x" type="button" aria-label="閉じる" onClick={() => close()}>
          ✕
        </button>
      </div>
      {children}
    </aside>
  );
}

function HoursDrawerBody() {
  const { status } = useClinic();
  return (
    <>
      <div className="status" style={{ marginBottom: 16 }}>
        <span className={`dot ${dotClass(status)}`} />
        <span>{`${status.text}　${status.sub}`}</span>
      </div>
      <div className="scroll">
        <HoursTable />
      </div>
      <p className="note">△ 土曜は9:00–13:00。木曜・日曜・祝日は休診です。</p>
    </>
  );
}

function MenuDrawerBody() {
  const { close } = useClinic();
  return (
    <div className="mnav">
      {[...NAV_LEFT, ...NAV_RIGHT].map(({ href, label, Icon }) => (
        <Link key={href} href={href} onClick={() => close(false)}>
          <Icon />
          {label}
        </Link>
      ))}
    </div>
  );
}

function BookDialogBody() {
  const { overlay } = useClinic();
  if (overlay?.kind !== 'book') return null;
  return <BookingFlow key={JSON.stringify(overlay)} initialMode={overlay.mode ?? null} symptom={overlay.sym ?? null} />;
}

export function Overlays() {
  return (
    <>
      <Dialog kind="book" title="WEB予約（デモ）">
        <BookDialogBody />
      </Dialog>

      <Dialog kind="line" title="LINEで予約（見本）">
        <p className="demo-note">
          デモのため、実際のLINEは開きません。本番では友だち追加すると、LINEの中で予約でき、下のようなお知らせが届きます。トーク画面を操作できるデモもあります。
        </p>
        <LinePhone label="LINEのトーク画面の見本">
          <div className="bub">
            ご予約を受け付けました。
            <br />
            11月10日（火）10:30　内科<small>予約の変更・キャンセルはメニューの「予約確認」から</small>
          </div>
          <div className="bub">【前日のお知らせ】明日10:30にご予約があります。マイナ保険証とお薬手帳をお持ちください。</div>
          <div className="bub">【順番受付】まもなく順番です。あと2人で呼び出します。院内または近くでお待ちください。</div>
        </LinePhone>
        <div className="acts">
          <OpenButton overlay={{ kind: 'book' }} className="btn">
            WEB予約のデモ
          </OpenButton>
          <Link href="/line/" className="btn g">
            LINEのデモを操作する
          </Link>
        </div>
      </Dialog>

      <Dialog kind="tel" title="お電話でのご予約">
        <p className="demo-note">架空のクリニックのため、電話はかかりません。本番ではここから電話アプリが開きます。</p>
        <p style={{ fontSize: '1.6rem', fontFamily: "'Kiwi Maru',serif", margin: 0 }}>{DEMO_TEL}</p>
        <p className="note">受付時間：診療時間内（受付は終了の30分前まで）</p>
      </Dialog>

      <Drawer kind="hours" label="診療時間">
        <HoursDrawerBody />
      </Drawer>
      <Drawer kind="menu" label="メニュー">
        <MenuDrawerBody />
      </Drawer>
    </>
  );
}
