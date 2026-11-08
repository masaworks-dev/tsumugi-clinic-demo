import { tokyoNow } from '../../lib/hours.ts';
import { repliesFor, verifySignature, type WebhookEvent } from '../../lib/line-webhook.ts';

const REPLY_API = 'https://api.line.me/v2/bot/message/reply';

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const secret = process.env.LINE_CHANNEL_SECRET;
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  if (!secret || !token) return new Response('LINE channel is not configured', { status: 503 });

  const body = await req.text();
  if (!verifySignature(body, req.headers.get('x-line-signature'), secret)) {
    return new Response('Bad signature', { status: 401 });
  }

  const { events = [] } = JSON.parse(body) as { events?: WebhookEvent[] };
  const results = await Promise.allSettled(
    repliesFor(events, tokyoNow()).map((r) =>
      fetch(REPLY_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(r),
      }).then((res) => {
        if (!res.ok) throw new Error(`reply ${res.status}`);
      }),
    ),
  );
  for (const r of results) if (r.status === 'rejected') console.error(r.reason);

  // LINE 側の再送を避けるため、返信に失敗しても 200 を返す
  return new Response('OK');
};

export const config = { path: '/api/line/webhook' };
