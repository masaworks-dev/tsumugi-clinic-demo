import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { repliesFor, toLineMessages, verifySignature } from './line-webhook.ts';

const SECRET = 'test-channel-secret';
const sign = (body: string, secret = SECRET) => createHmac('sha256', secret).update(body).digest('base64');

test('正しい署名だけを通す', () => {
  const body = JSON.stringify({ events: [] });
  assert.equal(verifySignature(body, sign(body), SECRET), true);
  assert.equal(verifySignature(body, sign(body, 'other'), SECRET), false);
  assert.equal(verifySignature(body + ' ', sign(body), SECRET), false);
  assert.equal(verifySignature(body, null, SECRET), false);
  assert.equal(verifySignature(body, 'short', SECRET), false);
});

test('テキストと友だち追加にだけ返信し、ほかのイベントは無視する', () => {
  const replies = repliesFor(
    [
      { type: 'message', replyToken: 'a', message: { type: 'text', text: '料金' } },
      { type: 'follow', replyToken: 'b' },
      { type: 'message', replyToken: 'c', message: { type: 'sticker' } },
      { type: 'unfollow' },
    ],
    { dow: 2, min: 640 },
  );
  assert.deepEqual(
    replies.map((r) => r.replyToken),
    ['a', 'b'],
  );
});

test('リンクがある返信は、本文とボタンの2通にして最後にクイックリプライを付ける', () => {
  const [text, buttons] = toLineMessages({ text: '本文', link: { label: '開く', path: '/price/' }, quick: ['予約'] });
  assert.equal(text?.type, 'text');
  assert.equal(text?.quickReply, undefined);
  assert.equal(buttons?.type, 'template');
  if (buttons?.type !== 'template') return;
  assert.equal(buttons.template.actions[0]?.uri, 'https://tsumugi-clinic-demo.netlify.app/price/');
  assert.equal(buttons.quickReply?.items[0]?.action.text, '予約');
});
