'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  greeting,
  queueCallMessage,
  reminderMessage,
  replyFor,
  RICH_MENU,
  type BotMessage,
  type MenuTile,
} from '@/lib/line-bot';
import { useClinic } from './ClinicProvider';

type Entry =
  | { id: number; from: 'bot'; msg: BotMessage; push?: boolean }
  | { id: number; from: 'me'; text: string }
  | { id: number; from: 'note'; text: string; path: string };

let seq = 0;
const nextId = () => ++seq;

export function LineDemo() {
  const { moment, reduceMotion } = useClinic();
  const [log, setLog] = useState<Entry[]>(() => [{ id: nextId(), from: 'bot', msg: greeting() }]);
  const [typing, setTyping] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [draft, setDraft] = useState('');
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [log, typing]);

  const botSays = (msg: BotMessage, push = false) => {
    if (reduceMotion) return setLog((l) => [...l, { id: nextId(), from: 'bot', msg, push }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setLog((l) => [...l, { id: nextId(), from: 'bot', msg, push }]);
    }, 600);
  };

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setLog((l) => [...l, { id: nextId(), from: 'me', text: t }]);
    botSays(replyFor(t, moment));
  };

  const tap = (tile: MenuTile) => {
    if (tile.action.type === 'message') return send(tile.action.text);
    const path = tile.action.path;
    setLog((l) => [...l, { id: nextId(), from: 'note', text: `LINEの中のブラウザで「${tile.label}」が開きます`, path }]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    send(draft);
    setDraft('');
  };

  const last = log[log.length - 1];
  const quick = last?.from === 'bot' && !typing ? last.msg.quick : undefined;

  return (
    <div className="ldemo">
      <div className="lphone" role="group" aria-label="LINEのトーク画面（デモ）">
        <div className="lscreen">
          <div className="lhead">
            <i aria-hidden="true">つ</i>
            <b>つむぎクリニック（デモ）</b>
          </div>

          <div className="llog" ref={logRef} aria-live="polite">
            {log.map((e) =>
              e.from === 'me' ? (
                <p key={e.id} className="lmsg me">
                  {e.text}
                </p>
              ) : e.from === 'note' ? (
                <p key={e.id} className="lnote">
                  {e.text}
                  <Link href={e.path}>開く</Link>
                </p>
              ) : (
                <div key={e.id} className="lbot">
                  {e.push && <span className="lpush">プッシュ通知</span>}
                  <p className="lmsg">{e.msg.text}</p>
                  {e.msg.link && (
                    <div className="lcard">
                      <span>こちらから開けます</span>
                      <Link href={e.msg.link.path}>{e.msg.link.label}</Link>
                    </div>
                  )}
                </div>
              ),
            )}
            {typing && (
              <p className="lmsg ltyping" aria-label="入力中">
                <span />
                <span />
                <span />
              </p>
            )}
          </div>

          {quick && (
            <div className="lquick" aria-label="クイックリプライ">
              {quick.map((q) => (
                <button key={q} type="button" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <form className="linput" onSubmit={onSubmit}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="メッセージを入力"
              aria-label="メッセージ"
              maxLength={60}
            />
            <button type="submit" disabled={!draft.trim()}>
              送信
            </button>
          </form>

          {menuOpen && (
            <div className="lmenu">
              {RICH_MENU.map((t, i) => (
                <button key={t.label} type="button" className={i === 0 ? 'main' : undefined} onClick={() => tap(t)}>
                  <b>{t.label}</b>
                  <small>{t.sub}</small>
                </button>
              ))}
            </div>
          )}
          <button type="button" className="lbar" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            メニュー {menuOpen ? '▼' : '▲'}
          </button>
        </div>
      </div>

      <div className="lside">
        <h2>試してみてください</h2>
        <ul>
          <li>下のメニューを押す（「診療時間」「アクセス」は自動で返信します）</li>
          <li>「料金」「はじめて」「駐車場」などと送ってみる</li>
          <li>ページ上の「表示する時刻」を変えると、診療時間の返信も変わります</li>
        </ul>
        <h2>お知らせを届ける</h2>
        <p>本番では、予約システムからこのトークに自動で届きます。</p>
        <div className="lpushes">
          <button type="button" className="btn" onClick={() => botSays(reminderMessage('10:30', '内科'), true)}>
            予約の前日のお知らせ
          </button>
          <button type="button" className="btn" onClick={() => botSays(queueCallMessage(2), true)}>
            順番受付の呼び出し
          </button>
        </div>
      </div>
    </div>
  );
}
