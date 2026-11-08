export type Dow = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// 0:00 からの分。[開始, 終了)
export type Slot = readonly [start: number, end: number];

export const DOW_LABEL = ['日', '月', '火', '水', '木', '金', '土'] as const;

export const HOURS: Record<Dow, readonly Slot[]> = {
  0: [],
  1: [[540, 750], [900, 1110]],
  2: [[540, 750], [900, 1110]],
  3: [[540, 750], [900, 1110]],
  4: [],
  5: [[540, 750], [900, 1110]],
  6: [[540, 780]],
};

export const LAST_ENTRY_MIN = 30;

export type Moment = { dow: Dow; min: number };

export type StatusKind = 'open' | 'soon' | 'lunch' | 'before' | 'after' | 'holiday';

export type ClinicStatus = {
  kind: StatusKind;
  text: string;
  sub: string;
};

export type ClockMode = 'now' | 'am' | 'lunch' | 'last' | 'closed';

export const CLOCK_OPTIONS: ReadonlyArray<{ value: ClockMode; label: string }> = [
  { value: 'now', label: 'いま（日本時間）' },
  { value: 'am', label: '平日 10:40（診療中）' },
  { value: 'lunch', label: '平日 13:20（昼休み）' },
  { value: 'last', label: '平日 18:10（まもなく受付終了）' },
  { value: 'closed', label: '木曜（休診日）' },
];

const PRESETS: Record<Exclude<ClockMode, 'now'>, Moment> = {
  am: { dow: 2, min: 640 },
  lunch: { dow: 2, min: 800 },
  last: { dow: 2, min: 1090 },
  closed: { dow: 4, min: 640 },
};

export const fmt = (m: number): string => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function tokyoNow(date: Date = new Date()): Moment {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tokyo',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(date);
  const get = (t: Intl.DateTimeFormatPartTypes) => parts.find((p) => p.type === t)?.value ?? '0';
  const dow = WEEKDAYS.indexOf(get('weekday')) as Dow;
  return { dow, min: (Number(get('hour')) % 24) * 60 + Number(get('minute')) };
}

export function momentFor(mode: ClockMode, date?: Date): Moment {
  return mode === 'now' ? tokyoNow(date) : PRESETS[mode];
}

export const isOpenDay = (dow: Dow): boolean => HOURS[dow].length > 0;

export function nextOpen(t: Moment): string {
  for (let i = 1; i <= 7; i++) {
    const d = ((t.dow + i) % 7) as Dow;
    const first = HOURS[d][0];
    if (first) return `次の診療は${DOW_LABEL[d]}曜 ${fmt(first[0])}から`;
  }
  return '';
}

export function clinicStatus(t: Moment): ClinicStatus {
  const slots = HOURS[t.dow];
  if (!slots.length) return { kind: 'holiday', text: '休診日です', sub: nextOpen(t) };

  for (const [a, b] of slots) {
    const lastEntry = b - LAST_ENTRY_MIN;
    if (t.min >= a && t.min < lastEntry) {
      const left = lastEntry - t.min;
      return left <= 30
        ? { kind: 'soon', text: '診療中', sub: `受付終了まであと${left}分` }
        : { kind: 'open', text: '診療中', sub: `受付は${fmt(lastEntry)}まで` };
    }
    if (t.min >= lastEntry && t.min < b) {
      return { kind: 'soon', text: '受付を終了しました', sub: `診療は${fmt(b)}まで` };
    }
  }

  const later = slots.find(([a]) => t.min < a);
  if (later) {
    const before = t.min < slots[0]![0];
    return {
      kind: before ? 'before' : 'lunch',
      text: before ? '診療開始前です' : 'お昼休みです',
      sub: `${fmt(later[0])}から受付します`,
    };
  }
  return { kind: 'after', text: '本日の診療は終了しました', sub: nextOpen(t) };
}

export const isAccepting = (s: ClinicStatus): boolean => s.kind === 'open' || s.kind === 'soon';

export const dotClass = (s: ClinicStatus): string =>
  s.kind === 'open' ? 'on' : s.kind === 'soon' ? 'mid' : '';

/* ---------- 予約デモ用 ---------- */

export type BookingDay = { key: number; dow: Dow; label: string };

export function upcomingDays(count = 10, from: Date = new Date()): BookingDay[] {
  const today = tokyoNow(from);
  const md = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', month: 'numeric', day: 'numeric' });
  return Array.from({ length: count }, (_, i) => {
    const parts = md.formatToParts(new Date(from.getTime() + i * 864e5));
    const m = parts.find((p) => p.type === 'month')?.value;
    const d = parts.find((p) => p.type === 'day')?.value;
    return { key: i, dow: ((today.dow + i) % 7) as Dow, label: `${m}/${d}` };
  });
}

export type TimeSlot = { min: number; full: boolean };

// 埋まり具合はデモ用。日付ごとに毎回同じ結果になるよう疑似乱数で決める
export function slotsFor(day: BookingDay): TimeSlot[] {
  const out: TimeSlot[] = [];
  let seed = day.key * 7 + 3;
  for (const [a, b] of HOURS[day.dow]) {
    for (let m = a; m < b - LAST_ENTRY_MIN; m += 30) {
      seed = (seed * 31 + 11) % 97;
      out.push({ min: m, full: seed % 4 === 0 });
    }
  }
  return out;
}
