import { test } from 'node:test';
import assert from 'node:assert/strict';
import { greeting, hoursText, replyFor, richMenuRequest } from './line-bot.ts';
import type { Moment } from './hours.ts';

const tue1040: Moment = { dow: 2, min: 640 };
const thu: Moment = { dow: 4, min: 640 };

test('診療時間の表は HOURS から作る', () => {
  assert.equal(
    hoursText(),
    ['月・火・水・金　9:00–12:30／15:00–18:30', '土　9:00–13:00', '休診　木・日・祝'].join('\n'),
  );
});

test('「診療時間」には、いまの状況を先頭に付けて返す', () => {
  assert.match(replyFor('診療時間', tue1040).text, /^いまは「診療中」（受付は12:00まで）/);
  assert.match(replyFor('今日やってますか？', thu).text, /^いまは「休診日です」/);
});

test('全角・半角や前後の空白の違いは気にしない', () => {
  assert.equal(replyFor('  ｱｸｾｽ ', tue1040).link?.path, '/#access');
});

test('「順番予約」は WEB予約 ではなく順番受付として扱う', () => {
  assert.equal(replyFor('順番予約したい', tue1040).link?.path, '/#reserve');
  assert.equal(replyFor('予約したい', tue1040).link?.path, '/booking/');
});

test('当てはまらないときは、選択肢つきの定型文を返す', () => {
  const r = replyFor('こんにちは', tue1040);
  assert.equal(r.link, undefined);
  assert.deepEqual(r.quick, ['診療時間', '予約', '順番受付', '料金']);
});

test('あいさつは名前があるときだけ呼びかける', () => {
  assert.match(greeting('つむぎ').text, /^つむぎさん、/);
  assert.match(greeting().text, /^友だち追加/);
});

test('リッチメニューの6つの範囲は 2500×1686 をすき間なく埋める', () => {
  const { size, areas } = richMenuRequest();
  assert.equal(areas.length, 6);
  const total = areas.reduce((s, a) => s + a.bounds.width * a.bounds.height, 0);
  assert.equal(total, size.width * size.height);
  for (const a of areas) {
    assert.ok(a.bounds.x + a.bounds.width <= size.width);
    assert.ok(a.bounds.y + a.bounds.height <= size.height);
  }
});
