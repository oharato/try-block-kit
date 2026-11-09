import type { Block } from 'slack-blocks-to-jsx';

export interface SubTypeItem {
  id: string;
  name: string;
  subTypeTag: string;
  description: string;
  block: Block;
}

export interface BlockGroup {
  type: string;
  groupName: string;
  description: string;
  subTypes: SubTypeItem[];
}

export const blockCatalogByType: BlockGroup[] = [
  // ==========================================
  // 1. header
  // ==========================================
  {
    type: 'header',
    groupName: 'Header Block (header)',
    description: 'メッセージの冒頭に配置する大見出し。フォントサイズが大きく視線を集めます。',
    subTypes: [
      {
        id: 'header-plain',
        name: 'Header (plain_text)',
        subTypeTag: 'text: plain_text',
        description: '標準的なテキスト大見出し。絵文字をサポート。最大150文字。',
        block: {
          type: 'header',
          text: {
            type: 'plain_text',
            text: '📌 2026年度 システムアーキテクチャ刷新計画',
            emoji: true,
          },
        },
      },
    ],
  },

  // ==========================================
  // 2. alert (level ごと)
  // ==========================================
  {
    type: 'alert',
    groupName: 'Alert Block (alert)',
    description: 'ステータスや重要度を専用のカラー枠線とアイコンで強調するバナーブロック。',
    subTypes: [
      {
        id: 'alert-error',
        name: 'Alert (level: error)',
        subTypeTag: 'level: "error"',
        description: '重大障害やインシデントを一瞬で伝える赤色の緊急アラート枠。',
        block: {
          type: 'alert',
          level: 'error',
          text: {
            type: 'mrkdwn',
            text: '*P1 Critical*: 本番DBクラスタでフェイルオーバーが発生しました。ただちに対応してください。',
          },
        },
      },
      {
        id: 'alert-warning',
        name: 'Alert (level: warning)',
        subTypeTag: 'level: "warning"',
        description: 'リソースしきい値超過や注意喚起を伝える黄色の警告枠。',
        block: {
          type: 'alert',
          level: 'warning',
          text: {
            type: 'mrkdwn',
            text: '*Warning*: メモリ使用率が 89.4% に達しました。不要プロセスの停止を推奨します。',
          },
        },
      },
      {
        id: 'alert-success',
        name: 'Alert (level: success)',
        subTypeTag: 'level: "success"',
        description: 'ビルド成功やデプロイ完了を祝福する緑色の完了通知枠。',
        block: {
          type: 'alert',
          level: 'success',
          text: {
            type: 'mrkdwn',
            text: '*Deploy Success*: `v2.4.0` が本番環境へ正常にデプロイされました (全148テスト通過)。',
          },
        },
      },
      {
        id: 'alert-info',
        name: 'Alert (level: info)',
        subTypeTag: 'level: "info"',
        description: '告知やメンテナンス情報を伝える青色のインフォメーション枠。',
        block: {
          type: 'alert',
          level: 'info',
          text: {
            type: 'mrkdwn',
            text: '*お知らせ*: 本日 23:00 より定期バックアップを実施します。サービス断は発生しません。',
          },
        },
      },
    ],
  },

  // ==========================================
  // 3. section (サブタイプごと)
  // ==========================================
  {
    type: 'section',
    groupName: 'Section Block (section)',
    description: 'メッセージの中心となる汎用ブロック。テキスト、2列フィールド、右側アクセサリを自在に組み合わせ可能。',
    subTypes: [
      {
        id: 'section-mrkdwn',
        name: 'Section (Markdown Text)',
        subTypeTag: 'text: mrkdwn',
        description: 'マークダウン（太字、斜体、リンク、コード、絵文字）を含む本文テキスト。',
        block: {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: 'こちらは標準の **Section Block** です。\n• *太字*、_斜体_、~打ち消し~\n• `インラインコード` や <https://api.slack.com|外部リンク>\n• :rocket: 絵文字が使用できます。',
          },
        },
      },
      {
        id: 'section-fields',
        name: 'Section (2-Column Fields)',
        subTypeTag: 'fields: TextObject[]',
        description: 'キー・バリュー形式のメタデータを左右2列に美しく整列。縦スクロールを削減。',
        block: {
          type: 'section',
          fields: [
            { type: 'mrkdwn', text: '*担当チーム:*\nSRE プラットフォーム' },
            { type: 'mrkdwn', text: '*稼働ステータス:*\n:white_check_mark: 正常 (99.99%)' },
            { type: 'mrkdwn', text: '*対象クラスタ:*\n`production-tokyo`' },
            { type: 'mrkdwn', text: '*リードエンジニア:*\n<@U12345678> (Kenji)' },
          ],
        },
      },
      {
        id: 'section-accessory-button',
        name: 'Section with Accessory Button',
        subTypeTag: 'accessory: button',
        description: 'テキストの右端にアクションボタンを配置し、視線の終着点で行動を促す。',
        block: {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*月次インフラコストレポート*\n先月比で 14.2% の削減に成功しました。詳細な明細を確認できます。',
          },
          accessory: {
            type: 'button',
            text: { type: 'plain_text', text: '📊 レポートを開く' },
            style: 'primary',
            url: 'https://aws.amazon.com',
            action_id: 'btn_acc_sample',
          },
        },
      },
      {
        id: 'section-accessory-image',
        name: 'Section with Accessory Image',
        subTypeTag: 'accessory: image',
        description: 'テキストの右端にコンパクトなサムネイル画像を配置。',
        block: {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*TypeScript 7.0 リリースまとめ*\nコンパイラ刷新により大規模プロジェクトの型チェック速度が3.2倍に高速化。',
          },
          accessory: {
            type: 'image',
            image_url: 'https://images.unsplash.com/photo-1516116211227-bbc679e000c2?w=200&auto=format&fit=crop&q=60',
            alt_text: 'TypeScript',
          },
        },
      },
      {
        id: 'section-accessory-select',
        name: 'Section with Accessory Select',
        subTypeTag: 'accessory: static_select',
        description: 'テキストの右端にドロップダウン選択メニューを配置。',
        block: {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*タスクステータスの変更*\n現在の進捗状況を選択してください。',
          },
          accessory: {
            type: 'static_select',
            placeholder: { type: 'plain_text', text: 'ステータス...' },
            action_id: 'sel_status',
            options: [
              { text: { type: 'plain_text', text: '未着手 (Todo)' }, value: 'todo' },
              { text: { type: 'plain_text', text: '進行中 (In Progress)' }, value: 'in_progress' },
              { text: { type: 'plain_text', text: '完了 (Done)' }, value: 'done' },
            ],
          },
        },
      },
      {
        id: 'section-accessory-datepicker',
        name: 'Section with Accessory Datepicker',
        subTypeTag: 'accessory: datepicker',
        description: 'テキストの右端にカレンダー日付選択ピッカーを配置。',
        block: {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*対応期日の設定*\nこのタスクの期限日を指定してください。',
          },
          accessory: {
            type: 'datepicker',
            initial_date: '2026-11-15',
            placeholder: { type: 'plain_text', text: '日付を選択' },
            action_id: 'picker_due',
          },
        },
      },
      {
        id: 'section-accessory-overflow',
        name: 'Section with Accessory Overflow (︙)',
        subTypeTag: 'accessory: overflow',
        description: 'テキストの右端にその他操作（三点リーダー）メニューを配置。',
        block: {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*インシデント #4092: 認証サービス遅延*\n優先度: High · ステータス: 調査中',
          },
          accessory: {
            type: 'overflow',
            action_id: 'overflow_actions',
            options: [
              { text: { type: 'plain_text', text: '優先度を変更' }, value: 'change_priority' },
              { text: { type: 'plain_text', text: 'Runbookを開く' }, value: 'open_runbook' },
              { text: { type: 'plain_text', text: 'インシデントをクローズ' }, value: 'close_incident' },
            ],
          },
        },
      },
    ],
  },

  // ==========================================
  // 4. actions (エレメントごと)
  // ==========================================
  {
    type: 'actions',
    groupName: 'Actions Block (actions)',
    description: 'ボタン、セレクト、日付ピッカーなどのインタラクティブ要素を横一列に並べる対話ブロック。',
    subTypes: [
      {
        id: 'actions-buttons',
        name: 'Actions (Primary / Danger / Default Buttons)',
        subTypeTag: 'element: button',
        description: '押し間違いを防ぐため、ボタンの重要度を色分け（緑・赤・グレー）して提示。',
        block: {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: { type: 'plain_text', text: '✅ 承認してリリース' },
              style: 'primary',
              value: 'approve',
              action_id: 'btn_act_approve',
            },
            {
              type: 'button',
              text: { type: 'plain_text', text: '❌ ロールバック' },
              style: 'danger',
              value: 'rollback',
              action_id: 'btn_act_rollback',
            },
            {
              type: 'button',
              text: { type: 'plain_text', text: '📖 ドキュメント' },
              url: 'https://docs.slack.com',
              action_id: 'btn_act_docs',
            },
          ],
        },
      },
      {
        id: 'actions-select-menus',
        name: 'Actions (Select & DatePicker)',
        subTypeTag: 'elements: static_select + datepicker',
        description: '担当者ドロップダウンと日付ピッカーを組み合わせた操作行。',
        block: {
          type: 'actions',
          elements: [
            {
              type: 'static_select',
              placeholder: { type: 'plain_text', text: '担当者をアサイン...' },
              action_id: 'act_assign',
              options: [
                { text: { type: 'plain_text', text: '佐藤 健二 (SRE)' }, value: 'sato' },
                { text: { type: 'plain_text', text: '田中 美咲 (DevOps)' }, value: 'tanaka' },
              ],
            },
            {
              type: 'datepicker',
              initial_date: '2026-11-20',
              placeholder: { type: 'plain_text', text: '完了予定日' },
              action_id: 'act_date',
            },
          ],
        },
      },
    ],
  },

  // ==========================================
  // 5. data_visualization (チャート種別ごと)
  // ==========================================
  {
    type: 'data_visualization',
    groupName: 'Data Visualization Block (data_visualization)',
    description: '外部画像を使わずにSlackネイティブに描画されるインタラクティブグラフ。',
    subTypes: [
      {
        id: 'dataviz-line',
        name: 'Chart: Line (折れ線グラフ)',
        subTypeTag: 'chart.type: "line"',
        description: '時系列のレイテンシやリクエスト数などの推移を表す折れ線グラフ。',
        block: {
          type: 'data_visualization',
          title: 'API レイテンシ推移 (p95 / p50)',
          chart: {
            type: 'line',
            series: [
              {
                name: 'p95',
                data: [
                  { label: '08:00', value: 120 },
                  { label: '10:00', value: 210 },
                  { label: '12:00', value: 280 },
                  { label: '14:00', value: 190 },
                  { label: '16:00', value: 140 },
                ],
              },
              {
                name: 'p50',
                data: [
                  { label: '08:00', value: 40 },
                  { label: '10:00', value: 65 },
                  { label: '12:00', value: 90 },
                  { label: '14:00', value: 70 },
                  { label: '16:00', value: 45 },
                ],
              },
            ],
            axis_config: {
              categories: ['08:00', '10:00', '12:00', '14:00', '16:00'],
              x_label: '時刻 (JST)',
              y_label: 'ms',
            },
          },
        },
      },
      {
        id: 'dataviz-bar',
        name: 'Chart: Bar (棒グラフ)',
        subTypeTag: 'chart.type: "bar"',
        description: 'カテゴリや期間ごとの離散的な比較（売上目標対比など）を表す棒グラフ。',
        block: {
          type: 'data_visualization',
          title: '週次売上目標達成率 ($K)',
          chart: {
            type: 'bar',
            series: [
              {
                name: '目標',
                data: [
                  { label: 'Week 1', value: 80 },
                  { label: 'Week 2', value: 85 },
                  { label: 'Week 3', value: 90 },
                  { label: 'Week 4', value: 95 },
                ],
              },
              {
                name: '実績',
                data: [
                  { label: 'Week 1', value: 92 },
                  { label: 'Week 2', value: 104 },
                  { label: 'Week 3', value: 88 },
                  { label: 'Week 4', value: 118 },
                ],
              },
            ],
            axis_config: {
              categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
              x_label: '週',
              y_label: '$K',
            },
          },
        },
      },
      {
        id: 'dataviz-pie',
        name: 'Chart: Pie (円グラフ)',
        subTypeTag: 'chart.type: "pie"',
        description: 'セグメントの構成比率やシェアを表す円グラフ。',
        block: {
          type: 'data_visualization',
          title: '月間クラウドコスト内訳比率',
          chart: {
            type: 'pie',
            segments: [
              { label: 'AWS', value: 4500 },
              { label: 'Cloudflare', value: 2100 },
              { label: 'Google Cloud', value: 1400 },
              { label: 'Datadog', value: 900 },
            ],
          },
        },
      },
      {
        id: 'dataviz-area',
        name: 'Chart: Area (面グラフ)',
        subTypeTag: 'chart.type: "area"',
        description: '累積ボリュームやアクティブユーザー数の推移を表す面グラフ。',
        block: {
          type: 'data_visualization',
          title: 'アクティブユーザー推移 (Desktop vs Mobile)',
          chart: {
            type: 'area',
            series: [
              {
                name: 'Desktop',
                data: [
                  { label: 'Mon', value: 3200 },
                  { label: 'Tue', value: 4100 },
                  { label: 'Wed', value: 4500 },
                  { label: 'Thu', value: 4300 },
                  { label: 'Fri', value: 3800 },
                ],
              },
              {
                name: 'Mobile',
                data: [
                  { label: 'Mon', value: 1800 },
                  { label: 'Tue', value: 2200 },
                  { label: 'Wed', value: 2500 },
                  { label: 'Thu', value: 2400 },
                  { label: 'Fri', value: 2900 },
                ],
              },
            ],
            axis_config: {
              categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              x_label: '曜日',
              y_label: 'Users',
            },
          },
        },
      },
    ],
  },

  // ==========================================
  // 6. data_table (高機能テーブル)
  // ==========================================
  {
    type: 'data_table',
    groupName: 'Data Table Block (data_table)',
    description: 'ページ送り、列ソート、行内ボタン（action_cell）を備えた高機能な運用データテーブル。',
    subTypes: [
      {
        id: 'datatable-interactive',
        name: 'Data Table with Action Cells',
        subTypeTag: 'raw_text + raw_number + action_cell',
        description: 'ページネーションとクリックソート、各行にアクションボタンを内蔵したテーブル。',
        block: {
          type: 'data_table',
          caption: '本番サーバーノード一覧 & リソース状態',
          page_size: 3,
          row_header_column_index: 0,
          rows: [
            [
              { type: 'raw_text', text: 'Node ID' },
              { type: 'raw_text', text: 'Zone' },
              { type: 'raw_number', value: 0 },
              { type: 'raw_text', text: '操作' },
            ],
            [
              { type: 'raw_text', text: 'node-tokyo-01' },
              { type: 'raw_text', text: 'ap-northeast-1a' },
              { type: 'raw_number', value: 45.2 },
              {
                type: 'action_cell',
                element: {
                  type: 'button',
                  text: { type: 'plain_text', text: '再起動' },
                  value: 'restart_1',
                  action_id: 'btn_node_1',
                },
              },
            ],
            [
              { type: 'raw_text', text: 'node-tokyo-02' },
              { type: 'raw_text', text: 'ap-northeast-1c' },
              { type: 'raw_number', value: 89.6 },
              {
                type: 'action_cell',
                element: {
                  type: 'button',
                  text: { type: 'plain_text', text: 'ドレイン' },
                  style: 'danger',
                  value: 'drain_2',
                  action_id: 'btn_node_2',
                },
              },
            ],
            [
              { type: 'raw_text', text: 'node-tokyo-03' },
              { type: 'raw_text', text: 'ap-northeast-1d' },
              { type: 'raw_number', value: 31.8 },
              {
                type: 'action_cell',
                element: {
                  type: 'button',
                  text: { type: 'plain_text', text: '詳細' },
                  value: 'inspect_3',
                  action_id: 'btn_node_3',
                },
              },
            ],
          ],
        },
      },
    ],
  },

  // ==========================================
  // 7. table (標準テーブル)
  // ==========================================
  {
    type: 'table',
    groupName: 'Standard Table Block (table)',
    description: '列アライメント（左・中央・右寄せ）と折り返し設定に対応した軽量表。',
    subTypes: [
      {
        id: 'table-aligned',
        name: 'Table with Column Alignment',
        subTypeTag: 'column_settings: align left/center/right',
        description: '列ごとに配置（左寄せ、中央揃え、右寄せ）を設定したスペック・料金一覧表。',
        block: {
          type: 'table',
          column_settings: [
            { align: 'left', is_wrapped: false },
            { align: 'center', is_wrapped: false },
            { align: 'right', is_wrapped: false },
          ],
          rows: [
            [
              { type: 'raw_text', text: 'プラン名' },
              { type: 'raw_text', text: 'SLA保証' },
              { type: 'raw_text', text: '月額費用' },
            ],
            [
              { type: 'raw_text', text: 'Starter' },
              { type: 'raw_text', text: '99.9%' },
              { type: 'raw_number', value: 2980 },
            ],
            [
              { type: 'raw_text', text: 'Professional' },
              { type: 'raw_text', text: '99.99%' },
              { type: 'raw_number', value: 9800 },
            ],
            [
              { type: 'raw_text', text: 'Enterprise' },
              { type: 'raw_text', text: '99.999%' },
              { type: 'raw_number', value: 49800 },
            ],
          ],
        },
      },
    ],
  },

  // ==========================================
  // 8. card
  // ==========================================
  {
    type: 'card',
    groupName: 'Card Block (card)',
    description: 'タイトル、subtitle、本文、アクションボタンを美しい角丸ボーダー枠線で囲む独立カード。',
    subTypes: [
      {
        id: 'card-standard',
        name: 'Card Block with Action Buttons',
        subTypeTag: 'title + subtitle + body + actions',
        description: '単体で完結する角丸枠線のカードブロック。',
        block: {
          type: 'card',
          title: {
            type: 'plain_text',
            text: '🎴 Datadog アラート: High Memory Usage',
          },
          subtitle: {
            type: 'plain_text',
            text: 'ホスト: prod-worker-08 · メモリ使用率: 92.4% · 継続時間: 15分',
          },
          body: {
            type: 'mrkdwn',
            text: 'キャッシュサーバーのメモリ枯渇が進行しています。OOM Killer発動前にメモリクリーンアップを実行してください。',
          },
          actions: [
            {
              type: 'button',
              text: { type: 'plain_text', text: '🔍 Datadog を開く' },
              style: 'primary',
              url: 'https://datadog.com',
              action_id: 'btn_card_dd',
            },
            {
              type: 'button',
              text: { type: 'plain_text', text: 'キャッシュ退避' },
              value: 'flush_cache',
              action_id: 'btn_card_flush',
            },
          ],
        },
      },
    ],
  },

  // ==========================================
  // 9. carousel
  // ==========================================
  {
    type: 'carousel',
    groupName: 'Carousel Block (carousel)',
    description: '複数のカードを横スクロール・横スワイプで閲覧できる省スペースギャラリー。',
    subTypes: [
      {
        id: 'carousel-gallery',
        name: 'Carousel (Multiple Horizontal Cards)',
        subTypeTag: 'elements: CardBlock[]',
        description: 'チャンネルの縦幅を占有せず、左右にスライドして複数カードを確認できるブロック。',
        block: {
          type: 'carousel',
          elements: [
            {
              type: 'card',
              title: { type: 'plain_text', text: 'サーバー 1: Tokyo Primary' },
              subtitle: { type: 'plain_text', text: 'QPS: 2,400 · CPU: 42%' },
              body: { type: 'mrkdwn', text: ':white_check_mark: 正常稼働中' },
              actions: [{ type: 'button', text: { type: 'plain_text', text: '詳細' }, action_id: 'car_btn_1' }],
            },
            {
              type: 'card',
              title: { type: 'plain_text', text: 'サーバー 2: Osaka Replica' },
              subtitle: { type: 'plain_text', text: 'QPS: 1,800 · CPU: 38%' },
              body: { type: 'mrkdwn', text: ':white_check_mark: 正常稼働中' },
              actions: [{ type: 'button', text: { type: 'plain_text', text: '詳細' }, action_id: 'car_btn_2' }],
            },
            {
              type: 'card',
              title: { type: 'plain_text', text: 'サーバー 3: Seoul Standby' },
              subtitle: { type: 'plain_text', text: 'QPS: 0 · CPU: 8%' },
              body: { type: 'mrkdwn', text: ':zzz: スタンバイ待機' },
              actions: [{ type: 'button', text: { type: 'plain_text', text: '詳細' }, action_id: 'car_btn_3' }],
            },
          ],
        },
      },
    ],
  },

  // ==========================================
  // 10. container
  // ==========================================
  {
    type: 'container',
    groupName: 'Container Block (container)',
    description: '子ブロックをひとまとめにし、タイトルとサブタイトル付きで折りたたみ可能な枠。',
    subTypes: [
      {
        id: 'container-collapsible',
        name: 'Container (Collapsible Accordion)',
        subTypeTag: 'is_collapsible: true',
        description: 'クリックで開閉できる折りたたみコンテナ。監査ログや詳細情報の格納に最適。',
        block: {
          type: 'container',
          title: {
            type: 'plain_text',
            text: '📦 ビルド＆テスト詳細実行ログ (クリックで開閉)',
          },
          subtitle: {
            type: 'mrkdwn',
            text: 'テスト件数: 248件通過 (0件失敗) · 実行時間: 1分12秒',
          },
          is_collapsible: true,
          default_collapsed: false,
          width: 'full',
          child_blocks: [
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: '```\n[Test 1/3] Unit Tests: 180 passed (4.2s)\n[Test 2/3] Integration Tests: 52 passed (18.1s)\n[Test 3/3] E2E Playwright: 16 passed (42.5s)\nTotal Coverage: 92.4% Statements\n```',
              },
            },
          ],
        },
      },
    ],
  },

  // ==========================================
  // 11. layout (マルチカラム)
  // ==========================================
  {
    type: 'layout',
    groupName: 'Layout Block (layout)',
    description: '1行あたり最大3列のマルチカラムグリッドレイアウトを構成するブロック。',
    subTypes: [
      {
        id: 'layout-2col',
        name: 'Layout (2 Columns / 外枠付き)',
        subTypeTag: 'grid_lines: "outer", items: 2',
        description: '左右2列に対称な情報を配置し、外枠線で囲んだグリッド。',
        block: {
          type: 'layout',
          label: 'Frontend vs Backend Health',
          is_label_visible: true,
          grid_lines: 'outer',
          rows: [
            {
              items: [
                {
                  width: 'standard',
                  block: {
                    type: 'section',
                    text: { type: 'mrkdwn', text: '*🌐 フロントエンド (Edge)*\n• Uptime: 99.99%\n• Avg Latency: 14ms\n• Cache Hit Rate: 94.2%' },
                  },
                },
                {
                  width: 'standard',
                  block: {
                    type: 'section',
                    text: { type: 'mrkdwn', text: '*⚙️ バックエンド (API)*\n• Uptime: 99.95%\n• Avg Latency: 68ms\n• Error Rate: 0.01%' },
                  },
                },
              ],
            },
          ],
        },
      },
      {
        id: 'layout-3col',
        name: 'Layout (3 Columns / 3列並び)',
        subTypeTag: 'items: 3 (Max)',
        description: '1行に最大3つのアイテムを横並びで配置した3列レイアウト。',
        block: {
          type: 'layout',
          label: '3-Tier Architecture Status',
          is_label_visible: false,
          rows: [
            {
              items: [
                {
                  width: 'standard',
                  block: {
                    type: 'section',
                    text: { type: 'mrkdwn', text: '*🌐 Web*\nCPU: 35%\nConn: 1,420' },
                  },
                },
                {
                  width: 'standard',
                  block: {
                    type: 'section',
                    text: { type: 'mrkdwn', text: '*⚙️ App*\nCPU: 62%\nQueue: 48' },
                  },
                },
                {
                  width: 'standard',
                  block: {
                    type: 'section',
                    text: { type: 'mrkdwn', text: '*🐘 DB*\nCPU: 44%\nReplica Lag: 0s' },
                  },
                },
              ],
            },
          ],
        },
      },
    ],
  },

  // ==========================================
  // 12. input (フォーム入力)
  // ==========================================
  {
    type: 'input',
    groupName: 'Input Block (input)',
    description: 'モーダルやメッセージ内でユーザーからの文字入力や選択を受け付けるフォームブロック。',
    subTypes: [
      {
        id: 'input-text',
        name: 'Input (plain_text_input: 単一行)',
        subTypeTag: 'element: plain_text_input',
        description: '一行の自由入力テキストフィールド。',
        block: {
          type: 'input',
          label: { type: 'plain_text', text: 'Jira チケット番号' },
          element: {
            type: 'plain_text_input',
            placeholder: { type: 'plain_text', text: '例: PROJ-1234' },
            action_id: 'inp_jira',
          },
        },
      },
      {
        id: 'input-multiline',
        name: 'Input (multiline: 複数行テキスト)',
        subTypeTag: 'multiline: true',
        description: '複数行の理由やコメントを入力するテキストエリア。',
        block: {
          type: 'input',
          label: { type: 'plain_text', text: 'リリース理由 / 変更サマリー' },
          element: {
            type: 'plain_text_input',
            multiline: true,
            placeholder: { type: 'plain_text', text: '変更内容の詳細を記入してください...' },
            action_id: 'inp_summary',
          },
        },
      },
      {
        id: 'input-checkboxes',
        name: 'Input (checkboxes: チェックボックス)',
        subTypeTag: 'element: checkboxes',
        description: '複数選択可能なチェックボックス入力。',
        block: {
          type: 'input',
          label: { type: 'plain_text', text: 'デプロイ前チェックリスト' },
          element: {
            type: 'checkboxes',
            action_id: 'inp_chk',
            options: [
              { text: { type: 'plain_text', text: 'ステージング環境で動作確認済み' }, value: 'stg_ok' },
              { text: { type: 'plain_text', text: 'DBマイグレーション実行済み' }, value: 'db_ok' },
              { text: { type: 'plain_text', text: 'ロールバック手順書を確認済み' }, value: 'rollback_ok' },
            ],
          },
        },
      },
    ],
  },

  // ==========================================
  // 13. context
  // ==========================================
  {
    type: 'context',
    groupName: 'Context Block (context)',
    description: '小さな文字とアイコンでフッター情報（作成者、更新日時、バージョン）を表示するブロック。',
    subTypes: [
      {
        id: 'context-avatar',
        name: 'Context (Avatar Icon + Markdown)',
        subTypeTag: 'elements: [image, mrkdwn]',
        description: 'アバターアイコンとグレーテキストを組み合わせた標準的なフッター。',
        block: {
          type: 'context',
          elements: [
            {
              type: 'image',
              image_url: 'https://api.slack.com/img/blocks/bkb_template_images/placeholder.png',
              alt_text: 'bot avatar',
            },
            {
              type: 'mrkdwn',
              text: '最終更新: *2026-11-10 00:30 JST* · 配信元: `@ci-cd-bot` v2.4.1 · チャンネル: `#ops-alerts`',
            },
          ],
        },
      },
    ],
  },

  // ==========================================
  // 14. divider
  // ==========================================
  {
    type: 'divider',
    groupName: 'Divider Block (divider)',
    description: 'コンテンツの塊を視覚的に分ける薄い水平線（<hr>）。',
    subTypes: [
      {
        id: 'divider-standard',
        name: 'Divider (水平区切り線)',
        subTypeTag: 'type: "divider"',
        description: 'プロパティなしでシンプルに使える境界線。',
        block: {
          type: 'divider',
        },
      },
    ],
  },

  // ==========================================
  // 15. image
  // ==========================================
  {
    type: 'image',
    groupName: 'Image Block (image)',
    description: 'タイトル付きで全幅の画像を挿入する独立ブロック。',
    subTypes: [
      {
        id: 'image-titled',
        name: 'Image with Title & Alt',
        subTypeTag: 'image_url + title + alt_text',
        description: 'キャプションタイトル付きの大画像ブロック。',
        block: {
          type: 'image',
          image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
          alt_text: 'システム構成図',
          title: {
            type: 'plain_text',
            text: '🖼️ システムアーキテクチャ全体図 2026',
          },
        },
      },
    ],
  },

  // ==========================================
  // 16. markdown
  // ==========================================
  {
    type: 'markdown',
    groupName: 'Markdown Block (markdown)',
    description: '標準的な GitHub Flavored Markdown (GFM) をそのままパースして描画する専用ブロック。',
    subTypes: [
      {
        id: 'markdown-gfm',
        name: 'Markdown (GFM Table & Tasks)',
        subTypeTag: 'text: GFM markdown',
        description: 'GFMテーブル、タスクリスト、コードブロックに対応。',
        block: {
          type: 'markdown',
          text: '### 🚀 GFM Markdown Block\n\n| コマンド | 説明 | 速度 |\n| :--- | :--- | :--- |\n| `pnpm install` | 依存関係高速解決 | ~2.4s |\n| `pnpm build` | 本番ビルド実行 | ~0.4s |\n\n- [x] TypeScript 7.0 適用\n- [x] 全パーツ網羅カタログ整備\n- [ ] CI自動デプロイ',
        },
      },
    ],
  },
];
