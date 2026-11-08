'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { clinicStatus, isAccepting, momentFor, type ClinicStatus, type ClockMode, type Moment } from '@/lib/hours';

export type BookMode = 'time' | 'queue';

export type Overlay =
  | { kind: 'book'; mode?: BookMode; sym?: string }
  | { kind: 'line' }
  | { kind: 'tel' }
  | { kind: 'hours' }
  | { kind: 'menu' };

export type OverlayKind = Overlay['kind'];

type ClinicState = {
  clock: ClockMode;
  setClock: (m: ClockMode) => void;
  moment: Moment;
  status: ClinicStatus;
  wait: number;
  overlay: Overlay | null;
  open: (o: Overlay) => void;
  close: (restoreFocus?: boolean) => void;
  reduceMotion: boolean;
};

const Ctx = createContext<ClinicState | null>(null);

export function useClinic(): ClinicState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useClinic は ClinicProvider の中で使ってください');
  return v;
}

function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

export function ClinicProvider({ children }: { children: ReactNode }) {
  const [clock, setClock] = useState<ClockMode>('now');
  const [now, setNow] = useState<Date | null>(null);
  const [wait, setWait] = useState(4);
  const [overlay, setOverlay] = useState<Overlay | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const reduceMotion = usePrefersReducedMotion();

  // ビルド時の時刻で固まらないよう、マウント後に時刻を入れる
  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  const moment = useMemo(() => momentFor(clock, now ?? undefined), [clock, now]);
  const status = useMemo(() => clinicStatus(moment), [moment]);

  const accepting = isAccepting(status);
  useEffect(() => {
    if (!accepting) return;
    const id = setInterval(() => {
      setWait((w) => Math.max(1, Math.min(9, w + (Math.random() < 0.5 ? -1 : 1))));
    }, 7000);
    return () => clearInterval(id);
  }, [accepting]);

  const open = useCallback((o: Overlay) => {
    lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOverlay(o);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOverlay(null);
    if (restoreFocus) lastFocus.current?.focus();
    lastFocus.current = null;
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  const value = useMemo<ClinicState>(
    () => ({ clock, setClock, moment, status, wait, overlay, open, close, reduceMotion }),
    [clock, moment, status, wait, overlay, open, close, reduceMotion],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
