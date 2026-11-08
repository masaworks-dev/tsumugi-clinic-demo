'use client';

import { HOURS, type Dow } from '@/lib/hours';
import { useClinic } from './ClinicProvider';

const COLS: ReadonlyArray<{ dow: Dow; label: string }> = [
  { dow: 1, label: '月' },
  { dow: 2, label: '火' },
  { dow: 3, label: '水' },
  { dow: 4, label: '木' },
  { dow: 5, label: '金' },
  { dow: 6, label: '土' },
  { dow: 0, label: '日・祝' },
];

const ROWS = [
  { label: '9:00–12:30', slot: 0 },
  { label: '15:00–18:30', slot: 1 },
] as const;

// 午前が 12:30 以外で終わる日（土曜）は △
function mark(dow: Dow, slot: number): { text: string; open: boolean } {
  const s = HOURS[dow][slot];
  if (!s) return { text: '／', open: false };
  return { text: slot === 0 && s[1] !== 750 ? '△' : '○', open: true };
}

export function HoursTable() {
  const { moment } = useClinic();
  const today = (d: Dow) => (d === moment.dow ? 'today' : undefined);
  return (
    <table className="hours">
      <thead>
        <tr>
          <th scope="col">
            <span className="sr">時間帯</span>
          </th>
          {COLS.map((c) => (
            <th key={c.dow} scope="col" className={today(c.dow)}>
              {c.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ROWS.map((r) => (
          <tr key={r.label}>
            <th scope="row" style={{ textAlign: 'left', fontWeight: 700, borderBottom: '1px dashed var(--line)' }}>
              {r.label}
            </th>
            {COLS.map((c) => {
              const m = mark(c.dow, r.slot);
              const cls = [m.open ? 'o' : '', today(c.dow) ?? ''].filter(Boolean).join(' ') || undefined;
              return (
                <td key={c.dow} className={cls}>
                  {m.text}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
