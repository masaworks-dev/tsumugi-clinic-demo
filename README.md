# つむぎ内科・こどもクリニック（デモ）

実在のクリニックサイトを参考に、ポートフォリオ用に作った内科・小児科クリニックのホームページのデモです。

- 公開サイト：https://tsumugi-clinic-demo.netlify.app
- 制作の説明：https://tsumugi-clinic-demo.netlify.app/about/

医院名・住所・電話番号・医師は実在しません（医療機関と誤解されないため）。予約や LINE のトーク画面はデモで、入力した内容はどこにも送信・保存しません。

## 技術

- Next.js 16（App Router）＋ TypeScript（`strict` と `noUncheckedIndexedAccess`）
- `output: 'export'` で静的な HTML に書き出し、Netlify で公開
- お知らせは microCMS から読み込み（読み取り専用キー。つながらないときは固定の内容を表示）
- LINE Messaging API の Webhook を Netlify Functions で受信（`/api/line/webhook`）
- UI ライブラリや CSS フレームワークは使わず、CSS と SVG イラストは手書き

## 設計で決めたこと

**静的書き出しにした**
クリニックのサイトは更新が少なく、速さと安さが大事です。サーバーを持たない静的サイトにして、月額のサーバー代がかからないようにしました。お知らせだけは医院の方が更新するので、microCMS からブラウザで読み込みます。

**診療時間は1か所のデータから計算する**
`lib/hours.ts` に診療時間を型つきのデータとして置き、次の3つをすべてここから計算しています。

- 今日の診療状況（診療中・受付終了まであと◯分・昼休み・休診日）
- 時間表の「今日」の列
- 予約デモで選べる時間の枠

診療時間が変わっても、直すのはこのファイルだけです。画面に依存しない純粋な関数にして、`lib/hours.test.ts` でテストしています（Node.js 標準のテスト機能）。

**表示は日本時間で計算する**
閲覧者がどの国にいても、`Intl.DateTimeFormat` の `Asia/Tokyo` で医院の時刻を求めます。

**予約は「本物につなぐ前提」のデモにする**
予約の流れ（種類 → 日時 → 確認）は画面だけで完結させ、送信はしません。本番では SelectType などの予約サービスや LINE 公式アカウントを埋め込む想定です。

**LINE の返信は、デモと本番で同じ関数を使う**
`lib/line-bot.ts` の `replyFor(文字列, 時刻)` が返信の中身を決めます。サイトの `/line/` のトーク画面（デモ）も、`netlify/functions/line-webhook.ts`（本番の受信口）も、これを呼ぶだけです。

- 受信口では `X-Line-Signature` を HMAC-SHA256 で確かめてから返信します（`lib/line-webhook.ts`）
- 「診療時間」への返信は `lib/hours.ts` で今の状況を計算して先頭に付けます
- リッチメニューの範囲（2500×1686 の3列×2段）も `richMenuRequest()` で同じデータから作ります

本物の LINE につなぐときは、Netlify の環境変数に `LINE_CHANNEL_SECRET` と `LINE_CHANNEL_ACCESS_TOKEN` を入れ、LINE Developers の Webhook URL に `https://<サイト>/api/line/webhook` を設定します。鍵がないあいだは 503 を返します。

**医療広告ガイドラインに沿う**
体験談・Before/After・他院との比較表現は載せず、自費診療は税込みの金額を明記しています。

**動きは控えめにする**
イラストが描かれる動きとボタンの反応だけにし、端末で「視差効果を減らす」を設定している方にはすべての動きを止めます。

## フォルダ

```
app/(site)/   クリニックのページ（トップ・ご予約・料金案内・はじめての方へ・LINE連携）
app/about/    制作の説明ページ（別のデザイン）
components/   画面の部品（ヘッダー、予約デモ、ダイアログなど）
lib/          診療時間の計算、LINE の返信と Webhook、microCMS の読み込み
netlify/      LINE の Webhook を受ける関数
public/       画像（AI 生成のイメージ）
```

## 動かし方

```bash
npm install
npm run dev        # 開発サーバー
npm run typecheck  # 型チェック
npm test           # 診療時間と LINE の返信のテスト
npm run build      # out/ に書き出し
```

## AI の使い方

コードの下書きと、写真（院長・院内）の生成に AI を使いました。構成と文章、医療広告ガイドラインの確認、表示の検証は自分で行っています。
