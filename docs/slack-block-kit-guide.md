# Slack Block Kit: Data Table & Data Visualization ガイド

Slack Block Kit に追加されたネイティブデータ表現コンポーネント（`data_visualization`, `data_table`, `table`）の仕様・実装ガイドです。

---

## 1. Data Visualization Block (`data_visualization`)

Slack メッセージ内で外部画像（PNG/SVG）を生成・アップロードすることなく、**ネイティブな対話型グラフを描画**できるブロックです。

### 主な特徴
- **4種類のチャート対応**:
  - `bar`: カテゴリ間の離散比較（棒グラフ）
  - `line`: 時系列・推移（折れ線グラフ）
  - `area`: 累積データ・ボリューム推移（面グラフ）
  - `pie`: 構成比率・セグメント割合（円グラフ）
- **Slack 内での機能**:
  - ホバー時のツールチップ表示
  - 表形式（Table view）への即時切り替え
  - チャートデータの CSV ダウンロード
- **制約事項**:
  - 1つのメッセージあたり最大 **2個** まで配置可能
  - `pie` チャート: 1〜12 の正のセグメント
  - `bar` / `line` / `area` チャート: 1〜12 の系列（series）、1〜20 のカテゴリ
  - タイトル・軸ラベル: 最大 50 文字
  - 系列・カテゴリ・セグメントラベル: 最大 20 文字

### JSON スキーマ例 (Bar Chart)
```json
{
  "type": "data_visualization",
  "title": "Weekly Signups",
  "chart": {
    "type": "bar",
    "series": [
      {
        "name": "Signups",
        "data": [
          { "label": "Mon", "value": 12 },
          { "label": "Tue", "value": 18 },
          { "label": "Wed", "value": 9 },
          { "label": "Thu", "value": 22 },
          { "label": "Fri", "value": 17 }
        ]
      }
    ],
    "axis_config": {
      "categories": ["Mon", "Tue", "Wed", "Thu", "Fri"],
      "y_label": "Count"
    }
  }
}
```

---

## 2. Data Table Block (`data_table`)

高度な対話性（クライアントサイドソート、ページネーション、ボタンアクション）を備えた高機能テーブルブロックです。

### 主な特徴
- **ページネーション**: `page_size`（1〜100、デフォルト 5）を指定可能
- **クリックソート**: 列ヘッダークリックで昇順・降順ソート
  - テキストセル: 辞書順
  - `raw_number` セル: 数値順
- **アクセシビリティ**: `caption`（必須）および `row_header_column_index`（主キー列のインデックス）
- **Action Cell (`action_cell`)**: セル内にボタン（`button`）を配置可能（クリック時に行の `value` を Bot へ送信）
- **制約事項**:
  - 1〜20 列、2〜201 行（ヘッダー1行 + データ行最大200行）
  - 1行目（ヘッダー）には `rich_text` を使用不可
  - メッセージあたりのテーブルセル文字数合計は最大 20,000 文字

### JSON スキーマ例
```json
{
  "type": "data_table",
  "caption": "Production Cluster Status",
  "page_size": 5,
  "row_header_column_index": 0,
  "rows": [
    [
      { "type": "raw_text", "text": "Cluster" },
      { "type": "raw_text", "text": "Uptime %" },
      { "type": "raw_text", "text": "Action" }
    ],
    [
      { "type": "raw_text", "text": "prod-east-1" },
      { "type": "raw_number", "value": 99.99 },
      {
        "type": "action_cell",
        "element": {
          "type": "button",
          "text": { "type": "plain_text", "text": "Inspect" },
          "value": "cluster_east_1",
          "action_id": "btn_inspect"
        }
      }
    ]
  ]
}
```

---

## 3. Standard Table Block (`table`)

シンプルな表形式のレイアウトを提供する軽量テーブルブロックです。

### 主な特徴
- `column_settings` による列ごとの配置（`align: "left" | "center" | "right"`）
- 折り返し制御（`is_wrapped: boolean`）
- `raw_text`, `raw_number`, `rich_text` をセル内に配置可能
- 最大 100 行、20 列まで対応
- ページネーションやソートが不要な軽量サマリー表示に最適

---

## 4. `table` と `data_table` の使い分け

| 機能 / 特徴 | `table` | `data_table` |
| :--- | :--- | :--- |
| **主な用途** | 軽量な一覧・スペック表 | 業務ダッシュボード・インシデント管理 |
| **ソート機能** | なし | あり（テキスト・数値ソート） |
| **ページネーション** | なし | あり（`page_size` 設定可能） |
| **Action Button** | なし | あり（`action_cell`） |
| **カラムアライメント** | あり（`column_settings`） | 自動 |
| **行数制限** | 最大 100 行 | 最大 201 行（ヘッダー含） |
