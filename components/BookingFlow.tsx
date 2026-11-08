'use client';

import { useMemo, useState } from 'react';
import { DOW_LABEL, fmt, isOpenDay, slotsFor, upcomingDays, type BookingDay } from '@/lib/hours';
import { useClinic, type BookMode } from './ClinicProvider';
import { LinePhone } from './LinePhone';

type Dept = '内科' | '小児科';
type Step = 'kind' | 'when' | 'confirm' | 'done';

const DEPTS: ReadonlyArray<{ v: Dept; note: string }> = [
  { v: '内科', note: '中学生以上' },
  { v: '小児科', note: '中学生まで' },
];

const STEP_INDEX: Record<Exclude<Step, 'done'>, number> = { kind: 0, when: 1, confirm: 2 };

const DemoNote = () => (
  <p className="demo-note">デモのため、入力した内容はどこにも送信・保存されません。名前や症状などの個人情報は入力しないでください。</p>
);

function Steps({ at }: { at: number }) {
  return (
    <div className="steps" aria-hidden="true">
      {['種類', '日時', '確認'].map((s, i) => (
        <span key={s} className={i <= at ? 'on' : ''}>
          {i + 1}. {s}
        </span>
      ))}
    </div>
  );
}

export function BookingFlow({ initialMode, symptom }: { initialMode: BookMode | null; symptom: string | null }) {
  const { wait, close } = useClinic();
  const days = useMemo(() => upcomingDays(), []);
  const [step, setStep] = useState<Step>('kind');
  const [mode, setMode] = useState<BookMode | null>(initialMode);
  const [dept, setDept] = useState<Dept>('内科');
  const [dayKey, setDayKey] = useState<number>(() => days.find((d) => isOpenDay(d.dow))?.key ?? 0);
  const [slot, setSlot] = useState<number | null>(null);
  const [nick, setNick] = useState('');
  const [queueNo, setQueueNo] = useState<number | null>(null);

  const day: BookingDay = days.find((d) => d.key === dayKey) ?? days[0]!;
  const when =
    mode === 'queue'
      ? `本日・順番受付（いま${wait}人待ち）`
      : `${day.label}（${DOW_LABEL[day.dow]}）${slot !== null ? fmt(slot) : ''}`;

  const restart = () => {
    setStep('kind');
    setMode(null);
    setSlot(null);
    setNick('');
    setQueueNo(null);
  };

  if (step === 'done') {
    const name = nick.trim() || 'つむぎ';
    return (
      <>
        <div className="done">
          <svg viewBox="0 0 76 76" aria-hidden="true">
            <circle cx="38" cy="38" r="32" fill="#a8dcbc" stroke="#26333d" strokeWidth="3" />
            <path d="M24 39l10 10 19-21" fill="none" stroke="#26333d" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 style={{ fontSize: '1.3rem', marginTop: 6 }}>予約の流れはここまでです</h3>
          <p className="demo-note" style={{ marginTop: 10 }}>
            デモのため、予約は確定していません。本番ではこの時点で予約システムに登録され、LINEかメールに確認が届きます。
          </p>
        </div>
        <LinePhone label="LINEに届くお知らせの見本">
          <div className="bub">
            {name}さん、ご予約を受け付けました。
            <br />
            {dept}　{when}
            {queueNo !== null && (
              <>
                <br />
                受付番号：{queueNo}
              </>
            )}
            <small>見本の表示です（実際には送信されません）</small>
          </div>
          <div className="bub">
            {queueNo !== null
              ? '【順番受付】あと2人で呼び出します。院内または近くでお待ちください。'
              : '【前日のお知らせ】明日のご予約をお忘れなく。マイナ保険証とお薬手帳をお持ちください。'}
          </div>
        </LinePhone>
        <div className="acts">
          <button className="btn" type="button" onClick={restart}>
            もう一度試す
          </button>
          <button className="btn y" type="button" onClick={() => close()}>
            閉じる
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <DemoNote />
      <Steps at={STEP_INDEX[step]} />

      {step === 'kind' && (
        <>
          <p className="fs-lbl">予約の種類</p>
          <div className="choice">
            <button type="button" aria-pressed={mode === 'time'} onClick={() => setMode('time')}>
              時間予約<small>日時を決めて来院</small>
            </button>
            <button type="button" aria-pressed={mode === 'queue'} onClick={() => setMode('queue')}>
              順番受付<small>今日、来た順に呼び出し</small>
            </button>
          </div>
          <p className="fs-lbl">診療科</p>
          <div className="choice">
            {DEPTS.map((d) => (
              <button key={d.v} type="button" aria-pressed={dept === d.v} onClick={() => setDept(d.v)}>
                {d.v}
                <small>{d.note}</small>
              </button>
            ))}
          </div>
          {symptom && (
            <p className="note" style={{ marginTop: 0 }}>
              相談したい症状：{symptom}
            </p>
          )}
          <div className="acts">
            <span />
            <button className="btn y" type="button" disabled={!mode} onClick={() => setStep(mode === 'queue' ? 'confirm' : 'when')}>
              次へ
            </button>
          </div>
        </>
      )}

      {step === 'when' && (
        <>
          <p className="fs-lbl">日にち</p>
          <div className="days">
            {days.map((d) => {
              const openDay = isOpenDay(d.dow);
              return (
                <button
                  key={d.key}
                  type="button"
                  disabled={!openDay}
                  aria-pressed={d.key === dayKey}
                  onClick={() => {
                    setDayKey(d.key);
                    setSlot(null);
                  }}
                >
                  {d.label}
                  <small>
                    {DOW_LABEL[d.dow]}
                    {openDay ? '' : ' 休'}
                  </small>
                </button>
              );
            })}
          </div>
          <p className="fs-lbl">時間（×は予約で埋まっています）</p>
          <div className="slots">
            {slotsFor(day).map((s) => (
              <button key={s.min} type="button" disabled={s.full} aria-pressed={slot === s.min} onClick={() => setSlot(s.min)}>
                {s.full ? '× ' : ''}
                {fmt(s.min)}
              </button>
            ))}
          </div>
          <div className="acts">
            <button className="btn" type="button" onClick={() => setStep('kind')}>
              戻る
            </button>
            <button className="btn y" type="button" disabled={slot === null} onClick={() => setStep('confirm')}>
              次へ
            </button>
          </div>
        </>
      )}

      {step === 'confirm' && (
        <form
          onSubmit={(e) => {
            e.preventDefault(); // どこにも送信しない
            setQueueNo(mode === 'queue' ? 20 + wait : null);
            setStep('done');
          }}
        >
          <div className="sum">
            <div>
              <span>種類</span>
              <b>{mode === 'queue' ? '順番受付' : '時間予約'}</b>
            </div>
            <div>
              <span>診療科</span>
              <b>{dept}</b>
            </div>
            <div>
              <span>日時</span>
              <b>{when}</b>
            </div>
          </div>
          <div className="field">
            <label htmlFor="nick" className="fs-lbl" style={{ margin: 0 }}>
              呼び出し用のニックネーム（デモ）
            </label>
            <input id="nick" maxLength={12} placeholder="例：つむぎ" value={nick} onChange={(e) => setNick(e.target.value)} />
          </div>
          <div className="acts">
            <button className="btn" type="button" onClick={() => setStep(mode === 'queue' ? 'kind' : 'when')}>
              戻る
            </button>
            <button className="btn y" type="submit">
              予約する（デモ）
            </button>
          </div>
        </form>
      )}
    </>
  );
}
