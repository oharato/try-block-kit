# Slack Block Kit: All Components & Layout Best Practices Demo

Slack Block Kit の全主要コンポーネント（**Header, Alert, Section, Fields, Accessory, Divider, Data Visualization, Data Table, Standard Table, Carousel, Card, Container, Actions, Image, Input, Context**）をローカル環境でレンダリング・検証できるデモアプリケーションです。

「**単純なマークダウン通知を書くよりも劇的に見やすいレイアウトとは何か？**」という課題に対し、同一情報を Markdown と Block Kit ベストプラクティスで左右に並べた比較デモと、6つのレイアウト黄金原則を提供しています。

---

## 🌟 主な機能

1. **🔍 単体ブロック全パターン図鑑 (Type & SubType Catalog)**:
   - Block Kit のブロックを**「1つだけ」**使ったときの最小構成とレンダリング結果を一覧化。
   - 全16種類のトップレベル Block `type`（header, alert, section, actions, data_visualization, data_table, table, card, carousel, container, layout, input, context, divider, image, markdown）と、その内側の全45種類のサブ `type`（各チャート種別、ボタン各種、セレクト各種、入力エレメント各種、アラートレベル等）を完全網羅。
   - リアルタイム検索フィルター、Type別絞り込み、単体JSONのワンクリックコピー、Interactive Playground連携（単体ブロックの読み込み）に対応。
2. **📰 記事要約 複数配置パターン (3列・2列・カルーセル・折りたたみ・縦並び)**:
   - 「タイトル＋メタデータ2列＋要約3行」のレイアウト設計。
   - Slackネイティブ最大列数である **3列レスポンシブ角丸カード型**、**2列並び角丸カード型**、**横スクロール・カルーセル型**、**折りたたみアコーディオン型**、**縦並びスタック型** を提供。
   - 画面幅シミュレータ（100% / 720px / 390px）とレスポンシブON/OFFトグルを搭載。
3. **⚖️ マークダウン vs Block Kit 比較 (Before / After)**:
   - 全く同じインシデント通知情報を、「単純なマークダウン（Before）」と「Block Kit ベストプラクティス適用（After）」で左右に並べて視覚的に比較。
   - 「なぜ見やすくなるのか」「どのような原則で作ればいいのか」を 6 つの黄金原則とともに解説。
4. **🏛️ 全パーツ網羅カタログ (All Components Showcase)**:
   - 複合メッセージとして全主要パーツを組み合わせた全体カタログ。
5. **📈 Data Visualization ギャラリー**:
   - `line` (折れ線), `pie` (円), `area` (面), `bar` (棒) の 4 種類。
6. **📑 Data Table & Standard Table**:
   - ソート・ページ送り・Action Cell 付きの `data_table` と、列アライメント指定の `table` の比較。
7. **🛠️ Interactive Playground (JSON Editor)**:
   - Block Kit の JSON をブラウザ上でリアルタイム編集し、即座にレンダリング確認。単体ブロック図鑑からの読み込みにも対応。
8. **↔️ Payload JSON パネル開閉トグル**:
   - 画面上部のトグルで JSON パネルを開閉し、Live Render を全幅（Wide View）で閲覧可能。
9. **🌙 ダークモード / ☀️ ライトモード**:
   - ワンタッチで切り替え可能。

---

## 🌐 プレビュー URL (同LAN対応)

開発サーバーは `0.0.0.0` でバインドされており、同一ネットワーク内のPCやスマートフォンからも閲覧できます。

- **ローカル**: [http://localhost:5173/](http://localhost:5173/)
- **同一 LAN**: `http://192.168.242.100:5173/`

---

## 🚀 開発・起動手順

### 動作環境
- **Node.js**: v24.22.1 (LTS)
- **パッケージマネージャー**: `pnpm` v12.13.0
- **ランタイム管理**: `mise`

### 依存関係インストール
```bash
pnpm install
```

### 開発サーバー起動
```bash
pnpm run dev
```

### プロダクションビルド & 型チェック
```bash
pnpm run build
```

---

## 🔧 トラブルシューティング & 設定ナレッジ

### pnpm の `Read-only file system (os error 30)` 回避策
- **事象**: Linux 環境下で `XDG_RUNTIME_DIR` が読み取り専用マウントされている場合、pnpm が store operation lock (`pnpm-store-operation-locks`) を作成できずインストールエラーが発生します。
- **解決策**:
  - `.mise.toml` の `[env]` に `XDG_RUNTIME_DIR = "/tmp"` を指定することで、常に書き込み可能な `/tmp` ディレクトリにロックが生成されるように構成しています。

---

## 📚 ドキュメント
- [単純なマークダウンより見やすいレイアウト実践ガイド](docs/layout-best-practices.md)
- [Slack Block Kit データブロック詳細仕様書](docs/slack-block-kit-guide.md)
