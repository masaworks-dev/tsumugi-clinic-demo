import { createHmac, timingSafeEqual } from 'node:crypto';
import type { Moment } from './hours.ts';
import { greeting, replyFor, SITE_URL, type BotMessage } from './line-bot.ts';

// Messaging API の Webhook イベントのうち、使う部分だけ
export type WebhookEvent = {
  type: string;
  replyToken?: string;
  message?: { type: string; text?: string };
};

export type LineMessage =
  | { type: 'text'; text: string; quickReply?: QuickReply }
  | {
      type: 'template';
      altText: string;
      template: { type: 'buttons'; text: string; actions: { type: 'uri'; label: string; uri: string }[] };
      quickReply?: QuickReply;
    };

type QuickReply = { items: { type: 'action'; action: { type: 'message'; label: string; text: string } }[] };

export function verifySignature(body: string, signature: string | null, channelSecret: string): boolean {
  if (!signature) return false;
  const expected = createHmac('sha256', channelSecret).update(body).digest();
  const given = Buffer.from(signature, 'base64');
  return given.length === expected.length && timingSafeEqual(given, expected);
}

// リンク付きの返信は「本文」＋「ボタン」の2通に分ける（ボタンの本文は160文字までのため）
export function toLineMessages(m: BotMessage): LineMessage[] {
  const quickReply: QuickReply | undefined = m.quick && {
    items: m.quick.map((q) => ({ type: 'action', action: { type: 'message', label: q, text: q } })),
  };
  const out: LineMessage[] = [{ type: 'text', text: m.text }];
  if (m.link) {
    out.push({
      type: 'template',
      altText: m.link.label,
      template: {
        type: 'buttons',
        text: 'こちらから開けます',
        actions: [{ type: 'uri', label: m.link.label, uri: SITE_URL + m.link.path }],
      },
    });
  }
  if (quickReply) out[out.length - 1] = { ...out[out.length - 1]!, quickReply };
  return out;
}

export type Reply = { replyToken: string; messages: LineMessage[] };

export function repliesFor(events: readonly WebhookEvent[], now: Moment): Reply[] {
  const out: Reply[] = [];
  for (const e of events) {
    if (!e.replyToken) continue;
    if (e.type === 'follow') {
      out.push({ replyToken: e.replyToken, messages: toLineMessages(greeting()) });
    } else if (e.type === 'message' && e.message?.type === 'text' && e.message.text) {
      out.push({ replyToken: e.replyToken, messages: toLineMessages(replyFor(e.message.text, now)) });
    }
  }
  return out;
}
