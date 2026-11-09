# Slack Block Kit: 単体ブロック全パターン図鑑 (Type & SubType Catalog)

Slack Block Kit の全ブロックについて、**「1つのブロック単体だけ（Single Block）」** を使用した際の最小 JSON 定義とサブ Type 一覧リファレンスです。

---

## 📋 全 16 種類 トップレベル Block Type & 45 種類 サブ Type 一覧表

| # | トップレベル Block `type` | サブ Type / 特徴 | 主な用途・説明 |
|---|---|---|---|
| 1 | `header` | `text: plain_text` | メッセージの大見出し（最大150文字、太字・絵文字対応） |
| 2 | `alert` | `level: info` | 情報共有用バナー（青枠線・情報アイコン） |
| | | `level: warning` | 警告用バナー（橙/黄枠線・警告アイコン） |
| | | `level: error` | エラー・障害用バナー（赤枠線・エラーアイコン） |
| | | `level: success` | 完了・成功用バナー（緑枠線・チェックアイコン） |
| 3 | `section` | `text: mrkdwn` | マークダウン形式の標準テキスト段落 |
| | | `fields: 2-column key-value` | 左右2列に整列するメタデータ（最大10項目） |
| | | `accessory: button` | 右側に単一ボタンを配置したセクション |
| | | `accessory: image` | 右側にサムネイル画像を配置したセクション |
| | | `accessory: static_select` | 右側にドロップダウン選択メニューを配置したセクション |
| | | `accessory: overflow` | 右側に「︙」3点リーダーメニューを配置したセクション |
| 4 | `actions` | `elements: primary button` | 強調表示される緑色のプライマリアクションボタン |
| | | `elements: danger button` | 警告・削除用のアクションボタン（赤色枠） |
| | | `elements: static_select` | 単一選択ドロップダウンメニュー |
| | | `elements: multi_static_select` | 複数選択対応のドロップダウンメニュー |
| | | `elements: datepicker` | カレンダーから日付を選択する日付ピッカー |
| | | `elements: timepicker` | 時刻を選択するタイムピッカー |
| | | `elements: overflow` | 複数アクションをまとめるオーバーフローメニュー |
| | | `elements: checkboxes` | チェックボックスリスト |
| | | `elements: radio_buttons` | ラジオボタン選択肢リスト |
| 5 | `data_visualization` | `chart.type: bar` | 離散カテゴリの比較を行う棒グラフ |
| | | `chart.type: line` | 時系列・トレンド推移を表す折れ線グラフ |
| | | `chart.type: area` | 累積値・ボリューム推移を表す面グラフ |
| | | `chart.type: pie` | 割合・シェア構成比率を表す円グラフ |
| 6 | `data_table` | `pagination & sort & action` | ページ送り・ソート・Action Cell付きの対話型データテーブル |
| 7 | `table` | `align: left / center / right` | 列アライメント指定対応のシンプルな静的テーブル |
| 8 | `card` | `style: standard card` | 単体で角丸ボーダー枠線を持つカードコンポーネント |
| 9 | `carousel` | `horizontal scrolling cards` | 左右スワイプ・スクロールでカードを閲覧するカルーセル |
| 10 | `container` | `is_collapsible: true` | タップで展開・収納できる折りたたみアコーディオン |
| 11 | `layout` | `columns: 2 columns` | 2分割カラムレイアウト |
| | | `columns: 3 columns` | 3分割カラムレイアウト（Slackネイティブ最大列数） |
| 12 | `input` | `element: plain_text_input` | 1行のプレーンテキスト入力フィールド |
| | | `element: multiline` | 複数行テキストエリア |
| | | `element: static_select` | 入力フォーム用の単一選択メニュー |
| | | `element: multi_static_select` | 入力フォーム用の複数選択メニュー |
| | | `element: datepicker` | 入力フォーム用の日付ピッカー |
| | | `element: checkboxes` | 入力フォーム用のチェックボックス |
| | | `element: radio_buttons` | 入力フォーム用のラジオボタン |
| | | `element: number_input` | 数値専用入力フィールド（decimal / integer） |
| | | `element: url_text_input` | URL形式バリデーション付き入力フィールド |
| | | `element: email_text_input` | メールアドレス形式バリデーション付き入力フィールド |
| 13 | `context` | `elements: mrkdwn + image` | 小さなグレー文字とアバターアイコンによる補足メタデータ |
| 14 | `divider` | `divider line` | セクション間を視覚的に区切るシンプルな境界線 |
| 15 | `image` | `title + image_url + alt_text` | タイトル付きの全幅画像ブロック |
| 16 | `markdown` | `native markdown block` | Slackの新仕様ネイティブマークダウンブロック |

---

## 💡 単体ブロック設計のベストプラクティス

1. **大見出しには `header` を単独使用**:
   - `section` の太字 `*見出し*` ではなく `header` を使うことで、Slackのフォントスケーリングやアクセシビリティに対応します。
2. **通知の最上段には `alert`**:
   - 絵文字だけの通知に比べ、`alert` の `level`（`info`, `warning`, `error`, `success`）を使うことで一目でステータスを伝達。
3. **キー・バリュー形式の情報には `section.fields`**:
   - 改行を連打するのではなく、2列フィールドで縦長スクロールを防止。
4. **アクションは `actions` で1箇所に集約**:
   - メッセージ下部にボタンやセレクトボックスをまとめ、次の行動を明確に誘導。
5. **列レイアウトの制限**:
   - `layout` ブロックは **1行あたり最大3列**（アイテム3つまで）。4列以上のグリッドを作りたい場合は、`layout` ブロックを複数行配置するか、`table` / `data_table` を使用します。
