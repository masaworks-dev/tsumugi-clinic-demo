import { test } from 'node:test';
import assert from 'node:assert/strict';
import { clinicStatus, nextOpen, slotsFor, tokyoNow, upcomingDays, type Moment } from './hours.ts';

const at = (dow: Moment['dow'], hhmm: string): Moment => {
  const [h, m] = hhmm.split(':').map(Number);
  return { dow, min: h! * 60 + m! };
};

test('平日の午前は診療中で、受付終了の時刻を出す', () => {
  const s = clinicStatus(at(2, '10:40'));
  assert.equal(s.kind, 'open');
  assert.equal(s.sub, '受付は12:00まで');
});

test('受付終了30分前を切ると「まもなく」になる', () => {
  const s = clinicStatus(at(2, '17:45'));
  assert.equal(s.kind, 'soon');
  assert.equal(s.sub, '受付終了まであと15分');
});

test('受付終了後、診療終了までは「受付を終了しました」', () => {
  assert.equal(clinicStatus(at(1, '12:10')).text, '受付を終了しました');
});

test('昼休みは午後の開始時刻を出す', () => {
  const s = clinicStatus(at(3, '13:20'));
  assert.equal(s.kind, 'lunch');
  assert.equal(s.sub, '15:00から受付します');
});

test('木曜は休診で、次の診療日を出す', () => {
  const s = clinicStatus(at(4, '10:00'));
  assert.equal(s.kind, 'holiday');
  assert.equal(s.sub, '次の診療は金曜 9:00から');
});

test('土曜の診療後は、日曜を飛ばして月曜を案内する', () => {
  assert.equal(clinicStatus(at(6, '14:00')).kind, 'after');
  assert.equal(nextOpen(at(6, '14:00')), '次の診療は月曜 9:00から');
});

test('予約枠は30分ごとで、受付終了の時刻を含まない', () => {
  const tue = { key: 0, dow: 2, label: '11/10' } as const;
  const mins = slotsFor(tue).map((s) => s.min);
  assert.equal(mins[0], 540);
  assert.ok(mins.every((m) => m < 750 - 30 || (m >= 900 && m < 1110 - 30)));
  assert.equal(slotsFor({ key: 0, dow: 4, label: '11/12' }).length, 0);
});

test('日本時間で曜日と時刻を求める', () => {
  // 2026-11-08 15:30 UTC は、日本時間で 11/9（月）0:30
  assert.deepEqual(tokyoNow(new Date('2026-11-08T15:30:00Z')), { dow: 1, min: 30 });
  assert.equal(upcomingDays(2, new Date('2026-11-08T15:30:00Z'))[0]?.label, '11/9');
});
