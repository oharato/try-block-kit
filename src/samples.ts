import type { Block } from 'slack-blocks-to-jsx';

/**
 * =========================================================================
 * 📰 複数記事要約 パターン 5: 【画面幅で可変！ 3列並びレスポンシブ角丸カード型】
 * =========================================================================
 */
export const articlesThreeColumnBlocks: Block[] = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '🖥️ 3列並びレスポンシブ角丸カード (Responsive 3-Column Grid)',
      emoji: true,
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Slack Block Kit の `layout` ブロックは **1行あたり最大 3 列まで** 配置できます。\n画面幅（デスクトップ・タブレット・スマートフォン）に応じて **3列 → 2列 → 1列** へと自動で美しくレスポンシブに折り返します。',
    },
  },
  {
    type: 'layout',
    label: 'Responsive 3-Column Articles',
    is_label_visible: false,
    rows: [
      {
        items: [
          // カラム 1: Cloudflare
          {
            width: 'standard',
            block: {
              type: 'card',
              title: {
                type: 'plain_text',
                text: '1. Cloudflare 次世代エッジAI',
              },
              subtitle: {
                type: 'plain_text',
                text: '🌐 Cloudflare · ⏱️ 5 min',
              },
              body: {
                type: 'mrkdwn',
                text: '• ⚡ *コールドスタート 0ms*: V8メモリ状態復元\n• 🌍 *超低遅延*: 330都市エッジでP99 < 18ms\n• 💰 *コスト60%削減*: オンデマンド並列化',
              },
              actions: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '📖 記事を読む' },
                  style: 'primary',
                  url: 'https://blog.cloudflare.com',
                  action_id: 'btn_3col_1',
                },
              ],
            },
          },
          // カラム 2: TypeScript
          {
            width: 'standard',
            block: {
              type: 'card',
              title: {
                type: 'plain_text',
                text: '2. TypeScript 7.0 新機能',
              },
              subtitle: {
                type: 'plain_text',
                text: '📘 Microsoft · ⏱️ 4 min',
              },
              body: {
                type: 'mrkdwn',
                text: '• 🚀 *Rust解析器*: 型チェック3.2倍速\n• 🎯 *推論精度向上*: 非同期チェーン\n• 📦 *ゼロコンフィグ*: Bundler適合',
              },
              actions: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '📖 記事を読む' },
                  style: 'primary',
                  url: 'https://devblogs.microsoft.com/typescript',
                  action_id: 'btn_3col_2',
                },
              ],
            },
          },
          // カラム 3: PostgreSQL
          {
            width: 'standard',
            block: {
              type: 'card',
              title: {
                type: 'plain_text',
                text: '3. PostgreSQL 18 ベクトル検索',
              },
              subtitle: {
                type: 'plain_text',
                text: '🐘 Postgres · ⏱️ 6 min',
              },
              body: {
                type: 'mrkdwn',
                text: '• 🧠 *HNSW統合*: コアエンジン実行\n• ⚡ *SIMD加速*: AVX-512でQPS2.1倍\n• 🛡️ *メモリ40%減*: 量子化改善',
              },
              actions: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '📖 記事を読む' },
                  style: 'primary',
                  url: 'https://www.postgresql.org',
                  action_id: 'btn_3col_3',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: '📱 *レスポンシブ仕様*: 大画面=3列並び / 中画面=2列+1列 / モバイル画面=1列縦並び に自動調整されます。',
      },
    ],
  },
];

/**
 * 2列並び（角丸カード）
 */
export const articlesTwoColumnBlocks: Block[] = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '🎴 角丸カード枠付き 2列並びグリッド (Two-Column Rounded Cards)',
      emoji: true,
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'カルーセル型で好評の **「角丸のボーダー枠線（カードUI）」** を、左右2列のグリッド配置に適用しました。各記事が独立したカードとして視覚的に際立ち、横幅を活かして効率よく比較できます。',
    },
  },
  {
    type: 'layout',
    label: 'Row 1: AI & Language Updates',
    is_label_visible: false,
    rows: [
      {
        items: [
          {
            width: 'standard',
            block: {
              type: 'card',
              title: {
                type: 'plain_text',
                text: '1. Cloudflare 次世代エッジAI',
              },
              subtitle: {
                type: 'plain_text',
                text: '🌐 Cloudflare Blog · ⏱️ 5 min · ✍️ Systems Team',
              },
              body: {
                type: 'mrkdwn',
                text: '• ⚡ *コールドスタート 0ms*: V8メモリ状態の即時復元\n• 🌍 *超低遅延*: 330都市エッジでP99 < 18ms\n• 💰 *コスト60%削減*: オンデマンド並列化',
              },
              actions: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '📖 記事を読む (5分)' },
                  style: 'primary',
                  url: 'https://blog.cloudflare.com',
                  action_id: 'btn_card_col_1',
                },
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '🔖 保存' },
                  value: 'save_1',
                  action_id: 'btn_save_1',
                },
              ],
            },
          },
          {
            width: 'standard',
            block: {
              type: 'card',
              title: {
                type: 'plain_text',
                text: '2. TypeScript 7.0 主要新機能',
              },
              subtitle: {
                type: 'plain_text',
                text: '📘 Microsoft · ⏱️ 4 min · ✍️ Daniel R.',
              },
              body: {
                type: 'mrkdwn',
                text: '• 🚀 *Rust解析器*: 型チェックが3.2倍高速化\n• 🎯 *推論精度向上*: 非同期チェーン対応\n• 📦 *ゼロコンフィグ*: Bundler標準化',
              },
              actions: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '📖 記事を読む (4分)' },
                  style: 'primary',
                  url: 'https://devblogs.microsoft.com/typescript',
                  action_id: 'btn_card_col_2',
                },
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '🔖 保存' },
                  value: 'save_2',
                  action_id: 'btn_save_2',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'layout',
    label: 'Row 2: Database & Systems Updates',
    is_label_visible: false,
    rows: [
      {
        items: [
          {
            width: 'standard',
            block: {
              type: 'card',
              title: {
                type: 'plain_text',
                text: '3. PostgreSQL 18 ベクトル検索',
              },
              subtitle: {
                type: 'plain_text',
                text: '🐘 Postgres Weekly · ⏱️ 6 min · ✍️ Core Team',
              },
              body: {
                type: 'mrkdwn',
                text: '• 🧠 *HNSW統合*: コアエンジンで高速実行\n• ⚡ *SIMD加速*: AVX-512でQPS 2.1倍\n• 🛡️ *メモリ40%減*: 量子化キャッシュ改善',
              },
              actions: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '📖 記事を読む (6分)' },
                  style: 'primary',
                  url: 'https://www.postgresql.org',
                  action_id: 'btn_card_col_3',
                },
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '🔖 保存' },
                  value: 'save_3',
                  action_id: 'btn_save_3',
                },
              ],
            },
          },
          {
            width: 'standard',
            block: {
              type: 'card',
              title: {
                type: 'plain_text',
                text: '4. Rust 2026 Edition 安定化',
              },
              subtitle: {
                type: 'plain_text',
                text: '🦀 Rust Official · ⏱️ 5 min · ✍️ Core Devs',
              },
              body: {
                type: 'mrkdwn',
                text: '• 🛡️ *非同期クロージャ*: 構文の完全安定化\n• ⚡ *自動ベクトル化*: コンパイル時SIMD\n• 📦 *高速並列フェッチ*: Cargo最適化',
              },
              actions: [
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '📖 記事を読む (5分)' },
                  style: 'primary',
                  url: 'https://blog.rust-lang.org',
                  action_id: 'btn_card_col_4',
                },
                {
                  type: 'button',
                  text: { type: 'plain_text', text: '🔖 保存' },
                  value: 'save_4',
                  action_id: 'btn_save_4',
                },
              ],
            },
          },
        ],
      },
    ],
  },
  {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: '✨ `layout` ブロックのカラムに `card` ブロックを配置することで、角丸ボーダー枠の2列並びを実現しています。',
      },
    ],
  },
];

/**
 * 縦並び
 */
export const articlesVerticalBlocks: Block[] = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '📰 Tech Digest: 本日の重要エンジニアリングニュース (3選)',
      emoji: true,
    },
  },
  {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: '📅 *2026-11-10 配信* · AI Summarizer Bot · 厳選された3本の速報要約',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*1. <https://blog.cloudflare.com|Cloudflareが発表した次世代エッジAIランタイムの全貌とアーキテクチャ>*',
    },
  },
  {
    type: 'section',
    fields: [
      { type: 'mrkdwn', text: '*媒体:* 🌐 Cloudflare Blog' },
      { type: 'mrkdwn', text: '*著者:* ✍️ Systems Engineering Team' },
      { type: 'mrkdwn', text: '*読了目安:* ⏱️ 5 min read' },
      { type: 'mrkdwn', text: '*カテゴリ:* 🏷️ Edge AI / Cloud' },
    ],
    accessory: {
      type: 'image',
      image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&auto=format&fit=crop&q=60',
      alt_text: 'Cloudflare Edge AI',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*📝 3行要約:*\n' +
        '• ⚡ *コールドスタート 0ms*: V8メモリ状態の即時復元技術により推論初期化遅延を完全排除。\n' +
        '• 🌍 *330都市へのエッジ直収*: ユーザー最寄りでキャッシュ推論し、P99レイテンシ18ms未満を達成。\n' +
        '• 💰 *推論コスト60%削減*: アイドル時のGPU専有を廃止し、リクエスト駆動オンデマンド並列化。',
    },
  },
  {
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: { type: 'plain_text', text: '📖 記事を読む (5分)' },
        style: 'primary',
        url: 'https://blog.cloudflare.com',
        action_id: 'btn_read_1',
      },
      {
        type: 'button',
        text: { type: 'plain_text', text: '🔖 あとで読む' },
        value: 'bookmark_1',
        action_id: 'btn_bookmark_1',
      },
    ],
  },
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*2. <https://devblogs.microsoft.com/typescript|TypeScript 7.0 主要新機能：静的型推論の革新とビルド速度3倍向上>*',
    },
  },
  {
    type: 'section',
    fields: [
      { type: 'mrkdwn', text: '*媒体:* 📘 TypeScript Official Blog' },
      { type: 'mrkdwn', text: '*著者:* ✍️ Daniel Rosenwasser' },
      { type: 'mrkdwn', text: '*読了目安:* ⏱️ 4 min read' },
      { type: 'mrkdwn', text: '*カテゴリ:* 🏷️ TypeScript / Language' },
    ],
    accessory: {
      type: 'image',
      image_url: 'https://images.unsplash.com/photo-1516116211227-bbc679e000c2?w=400&auto=format&fit=crop&q=60',
      alt_text: 'TypeScript 7.0',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: '*📝 3行要約:*\n' +
        '• 🚀 *解析器のRust化*: コアコンパイラ刷新により、大規模プロジェクトの型チェック速度が3.2倍に高速化。\n' +
        '• 🎯 *スマート型絞り込み*: 非同期Promiseチェーンや再帰型定義における型推論の精度とメモリ効率が大幅向上。\n' +
        '• 📦 *モダンデフォルト設定*: ES2026/Bundlerに適合する設定プリセットが標準同梱され初期構築の手間が激減。',
    },
  },
  {
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: { type: 'plain_text', text: '📖 記事を読む (4分)' },
        style: 'primary',
        url: 'https://devblogs.microsoft.com/typescript',
        action_id: 'btn_read_2',
      },
      {
        type: 'button',
        text: { type: 'plain_text', text: '🔖 あとで読む' },
        value: 'bookmark_2',
        action_id: 'btn_bookmark_2',
      },
    ],
  },
];

/**
 * カルーセル
 */
export const articlesCarouselBlocks: Block[] = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '🎡 カルーセルカード形式: スワイプ・横スクロールで読む記事要約',
      emoji: true,
    },
  },
  {
    type: 'carousel',
    elements: [
      {
        type: 'card',
        title: {
          type: 'plain_text',
          text: '1. Cloudflare 次世代エッジAI',
        },
        subtitle: {
          type: 'plain_text',
          text: '🌐 Cloudflare · ⏱️ 5 min · 2026-11-09',
        },
        body: {
          type: 'mrkdwn',
          text: '• ⚡ *コールドスタート 0ms*: V8状態復元\n• 🌍 *超低遅延*: 330都市エッジでP99 < 18ms\n• 💰 *コスト60%削減*: オンデマンド並列化',
        },
        actions: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '📖 記事を読む' },
            style: 'primary',
            url: 'https://blog.cloudflare.com',
            action_id: 'btn_car_1',
          },
        ],
      },
      {
        type: 'card',
        title: {
          type: 'plain_text',
          text: '2. TypeScript 7.0 主要新機能',
        },
        subtitle: {
          type: 'plain_text',
          text: '📘 Microsoft · ⏱️ 4 min · 2026-11-08',
        },
        body: {
          type: 'mrkdwn',
          text: '• 🚀 *Rust解析器*: 型チェックが3.2倍速\n• 🎯 *推論精度向上*: 非同期チェーン対応\n• 📦 *ゼロコンフィグ*: Bundler標準化',
        },
        actions: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '📖 記事を読む' },
            style: 'primary',
            url: 'https://devblogs.microsoft.com/typescript',
            action_id: 'btn_car_2',
          },
        ],
      },
      {
        type: 'card',
        title: {
          type: 'plain_text',
          text: '3. PostgreSQL 18 ベクトル検索',
        },
        subtitle: {
          type: 'plain_text',
          text: '🐘 Postgres Weekly · ⏱️ 6 min · 2026-11-07',
        },
        body: {
          type: 'mrkdwn',
          text: '• 🧠 *HNSW統合*: コアエンジンで高速実行\n• ⚡ *SIMD加速*: AVX-512でQPS 2.1倍\n• 🛡️ *メモリ40%減*: 量子化キャッシュ改善',
        },
        actions: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '📖 記事を読む' },
            style: 'primary',
            url: 'https://www.postgresql.org',
            action_id: 'btn_car_3',
          },
        ],
      },
    ],
  },
  {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: '💡 各カードの下部に「記事を読む」ボタンを内蔵。スマホでも横スワイプで軽快に閲覧できます。',
      },
    ],
  },
];

/**
 * アコーディオン
 */
export const articlesAccordionBlocks: Block[] = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '📂 折りたたみアコーディオン形式: 気になる記事だけ展開して読む',
      emoji: true,
    },
  },
  {
    type: 'container',
    title: {
      type: 'plain_text',
      text: '1. 📰 Cloudflare次世代エッジAIランタイム発表の解説',
    },
    subtitle: {
      type: 'mrkdwn',
      text: '🌐 Cloudflare Blog · ⏱️ 5 min read · ✍️ Systems Team',
    },
    is_collapsible: true,
    default_collapsed: false,
    width: 'full',
    child_blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*【AI要約 3つの重要ポイント】*\n' +
            '1. **ゼロ・コールドスタート**: V8メモリ状態の即時復元により推論初期化ラグを完全排除。\n' +
            '2. **330都市エッジ分散**: 最寄りPOPでのキャッシュ推論によりP99レイテンシ18msを達成。\n' +
            '3. **推論コスト60%削減**: 常時稼働GPUを排しリクエスト駆動オンデマンド並列化。',
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '📖 元記事を開く' },
            style: 'primary',
            url: 'https://blog.cloudflare.com',
            action_id: 'btn_acc_1',
          },
        ],
      },
    ],
  },
  {
    type: 'container',
    title: {
      type: 'plain_text',
      text: '2. 📘 TypeScript 7.0 リリースまとめ：静的型推論の革新',
    },
    subtitle: {
      type: 'mrkdwn',
      text: '📘 TypeScript Blog · ⏱️ 4 min read · ✍️ Daniel R.',
    },
    is_collapsible: true,
    default_collapsed: true,
    width: 'full',
    child_blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '*【AI要約 3つの重要ポイント】*\n' +
            '1. **解析器のRust化**: コアコンパイラ刷新により型チェック速度が3.2倍に向上。\n' +
            '2. **スマート型絞り込み**: 非同期Promiseチェーンでの推論精度とメモリ効率が大幅改善。\n' +
            '3. **モダンデフォルト設定**: ES2026/Bundler適合プリセットが同梱され初期設定が不要に。',
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: '📖 元記事を開く' },
            style: 'primary',
            url: 'https://devblogs.microsoft.com/typescript',
            action_id: 'btn_acc_2',
          },
        ],
      },
    ],
  },
];

/**
 * =========================================================================
 * ⚖️ マークダウン vs Block Kit 比較 (Before / After) の完全詳細版
 * =========================================================================
 */
export const beforeMarkdownBlocks: Block[] = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: ':warning: *[INCIDENT ALERT] Database High Load Detected on Production* :warning:\n\n' +
        'Production PostgreSQL cluster `db-primary-tokyo` is experiencing severe resource degradation. Immediate triage is required.\n\n' +
        '*Incident Details:*\n' +
        '- Severity: P1 - Critical\n' +
        '- Service: Payment Gateway & User Checkout\n' +
        '- CPU Utilization: 94.8%\n' +
        '- Active DB Connections: 485 / 500\n' +
        '- Triggered At: 2026-11-10 00:20:10 JST\n' +
        '- On-call Engineer: @kenji.sato\n' +
        '- Datadog Dashboard: https://datadog.example.com/dash/123456\n' +
        '- Runbook: https://wiki.example.com/sre/runbooks/db-scaling\n' +
        '- Incident Room: #incident-20261110-db\n\n' +
        '*Recent Slow Queries (Top 3):*\n' +
        '1. SELECT * FROM transactions WHERE user_id = ? AND status = "pending" (avg 4,210 ms)\n' +
        '2. UPDATE accounts SET balance = balance - ? WHERE id = ? (avg 3,180 ms)\n' +
        '3. SELECT count(*) FROM audit_logs WHERE created_at > ? (avg 2,940 ms)\n\n' +
        'If you are the on-call responder, please run the scaling playbook or failover to replica immediately to prevent cascading service downtime.',
    },
  },
];

export const afterBlockKitBlocks: Block[] = [
  // 1. Alert バナーで一瞬で重大度を認知
  {
    type: 'alert',
    level: 'error',
    text: {
      type: 'mrkdwn',
      text: '*P1 Critical Incident*: Production Database High Load Detected (`db-primary-tokyo`)',
    },
  },
  // 2. 2列 fields でメタデータを整理 & 右側ボタン
  {
    type: 'section',
    fields: [
      { type: 'mrkdwn', text: '*Impacted Service:*\n💳 Payment Gateway' },
      { type: 'mrkdwn', text: '*On-Call Engineer:*\n<@U12345678> (Kenji Sato)' },
      { type: 'mrkdwn', text: '*CPU Utilization:*\n🔥 *94.8%* (Threshold: 85%)' },
      { type: 'mrkdwn', text: '*Active Connections:*\n⚠️ *485* / 500 max' },
    ],
    accessory: {
      type: 'button',
      text: { type: 'plain_text', text: '📊 Open Dashboard' },
      url: 'https://datadog.example.com',
      action_id: 'btn_datadog',
    },
  },
  {
    type: 'divider',
  },
  // 3. Data Visualization で推移を直感化
  {
    type: 'data_visualization',
    title: 'PostgreSQL Metric Trajectory (Last 30 Minutes)',
    chart: {
      type: 'line',
      series: [
        {
          name: 'CPU %',
          data: [
            { label: '23:50', value: 42 },
            { label: '23:55', value: 55 },
            { label: '00:00', value: 68 },
            { label: '00:05', value: 82 },
            { label: '00:10', value: 91 },
            { label: '00:15', value: 95 },
          ],
        },
        {
          name: 'Connections (x5)',
          data: [
            { label: '23:50', value: 38 },
            { label: '23:55', value: 46 },
            { label: '00:00', value: 60 },
            { label: '00:05', value: 75 },
            { label: '00:10', value: 89 },
            { label: '00:15', value: 97 },
          ],
        },
      ],
      axis_config: {
        categories: ['23:50', '23:55', '00:00', '00:05', '00:10', '00:15'],
        x_label: 'Time (JST)',
        y_label: 'Resource %',
      },
    },
  },
  // 4. Data Table で遅延クエリとアクションを構造化
  {
    type: 'data_table',
    caption: 'Top Bottleneck Slow Queries & Mitigation Actions',
    page_size: 3,
    row_header_column_index: 0,
    rows: [
      [
        { type: 'raw_text', text: 'Query Type' },
        { type: 'raw_text', text: 'Target Table' },
        { type: 'raw_text', text: 'Avg Latency' },
        { type: 'raw_text', text: 'Action' },
      ],
      [
        { type: 'raw_text', text: 'SELECT ... pending' },
        { type: 'raw_text', text: 'transactions' },
        { type: 'raw_text', text: '4,210 ms' },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Kill Queries' },
            style: 'danger',
            value: 'kill_transactions',
            action_id: 'btn_kill_1',
          },
        },
      ],
      [
        { type: 'raw_text', text: 'UPDATE balance ...' },
        { type: 'raw_text', text: 'accounts' },
        { type: 'raw_text', text: '3,180 ms' },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Throttle' },
            value: 'throttle_accounts',
            action_id: 'btn_throttle_2',
          },
        },
      ],
      [
        { type: 'raw_text', text: 'SELECT count(*) ...' },
        { type: 'raw_text', text: 'audit_logs' },
        { type: 'raw_text', text: '2,940 ms' },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Kill Queries' },
            style: 'danger',
            value: 'kill_audit',
            action_id: 'btn_kill_3',
          },
        },
      ],
    ],
  },
  // 5. Actions で明確な初動ボタンを提示
  {
    type: 'actions',
    elements: [
      {
        type: 'button',
        text: { type: 'plain_text', text: '🚀 Auto-Scale Read Replica' },
        style: 'primary',
        value: 'scale_replica',
        action_id: 'btn_scale',
      },
      {
        type: 'button',
        text: { type: 'plain_text', text: '🔄 Trigger Failover' },
        style: 'danger',
        value: 'failover_db',
        action_id: 'btn_failover',
      },
      {
        type: 'button',
        text: { type: 'plain_text', text: '📖 SRE Runbook' },
        url: 'https://wiki.example.com/sre/runbooks/db-scaling',
        action_id: 'btn_runbook',
      },
    ],
  },
  // 6. Context でフッター補足
  {
    type: 'context',
    elements: [
      {
        type: 'mrkdwn',
        text: '🔔 Triggered at `2026-11-10 00:20:10 JST` · Incident Channel: <#C12345678|incident-20261110-db>',
      },
    ],
  },
];

/**
 * =========================================================================
 * 🏛️ 全パーツ網羅カタログ (All Components) 完全版 (15種以上)
 * =========================================================================
 */
export const allComponentsBlocks: Block[] = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '🏛️ Block Kit Comprehensive Components Catalog',
      emoji: true,
    },
  },
  {
    type: 'alert',
    level: 'info',
    text: {
      type: 'mrkdwn',
      text: '*New Release 2026*: Slack native components showcase covering all Block Kit surfaces.',
    },
  },
  {
    type: 'alert',
    level: 'warning',
    text: {
      type: 'mrkdwn',
      text: '*Warning*: High memory consumption detected on cluster `eu-central-1` (89.2% utilized).',
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'The **Section Block** is the backbone of Slack messages. It supports rich text, 2-column fields, and accessory elements positioned on the right.',
    },
  },
  {
    type: 'section',
    fields: [
      { type: 'mrkdwn', text: '*Deployment ID:*\n`dep-9482710`' },
      { type: 'mrkdwn', text: '*Status:*\n:white_check_mark: Healthy' },
      { type: 'mrkdwn', text: '*Target Cluster:*\n`production-tokyo-01`' },
      { type: 'mrkdwn', text: '*Lead SRE:*\n<@U12345678> (Kenji)' },
    ],
    accessory: {
      type: 'button',
      text: { type: 'plain_text', text: 'Manage Cluster' },
      style: 'primary',
      value: 'manage_cluster_tokyo',
      action_id: 'btn_manage_cluster',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'data_visualization',
    title: '📊 Data Visualization Block: Real-Time API Throughput (req/s)',
    chart: {
      type: 'line',
      series: [
        {
          name: 'Public API',
          data: [
            { label: '10:00', value: 1250 },
            { label: '10:15', value: 1840 },
            { label: '10:30', value: 2420 },
            { label: '10:45', value: 2150 },
            { label: '11:00', value: 1980 },
          ],
        },
        {
          name: 'Internal RPC',
          data: [
            { label: '10:00', value: 3400 },
            { label: '10:15', value: 4100 },
            { label: '10:30', value: 5200 },
            { label: '10:45', value: 4900 },
            { label: '11:00', value: 4600 },
          ],
        },
      ],
      axis_config: {
        categories: ['10:00', '10:15', '10:30', '10:45', '11:00'],
        x_label: 'Timestamp (JST)',
        y_label: 'Requests / sec',
      },
    },
  },
  {
    type: 'data_table',
    caption: '📑 Data Table Block: Node Health & Incident Tracking',
    page_size: 3,
    row_header_column_index: 0,
    rows: [
      [
        { type: 'raw_text', text: 'Node Name' },
        { type: 'raw_text', text: 'Zone' },
        { type: 'raw_text', text: 'CPU %' },
        { type: 'raw_text', text: 'Action' },
      ],
      [
        { type: 'raw_text', text: 'worker-node-01' },
        { type: 'raw_text', text: 'ap-northeast-1a' },
        { type: 'raw_number', value: 45.2 },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Restart' },
            value: 'restart_node_01',
            action_id: 'act_node_01',
          },
        },
      ],
      [
        { type: 'raw_text', text: 'worker-node-02' },
        { type: 'raw_text', text: 'ap-northeast-1c' },
        { type: 'raw_number', value: 89.4 },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Drain Node' },
            style: 'danger',
            value: 'drain_node_02',
            action_id: 'act_node_02',
          },
        },
      ],
      [
        { type: 'raw_text', text: 'worker-node-03' },
        { type: 'raw_text', text: 'ap-northeast-1d' },
        { type: 'raw_number', value: 31.8 },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Restart' },
            value: 'restart_node_03',
            action_id: 'act_node_03',
          },
        },
      ],
    ],
  },
  {
    type: 'table',
    column_settings: [
      { align: 'left', is_wrapped: false },
      { align: 'center', is_wrapped: false },
      { align: 'right', is_wrapped: false },
    ],
    rows: [
      [
        { type: 'raw_text', text: '📋 Standard Table: Service' },
        { type: 'raw_text', text: 'Replication SLA' },
        { type: 'raw_text', text: 'Avg Latency' },
      ],
      [
        { type: 'raw_text', text: 'Cloudflare D1 Database' },
        { type: 'raw_text', text: '99.99%' },
        { type: 'raw_text', text: '< 15 ms' },
      ],
      [
        { type: 'raw_text', text: 'Cloudflare KV Store' },
        { type: 'raw_text', text: '99.999%' },
        { type: 'raw_text', text: '< 5 ms' },
      ],
    ],
  },
  {
    type: 'divider',
  },
  {
    type: 'carousel',
    elements: [
      {
        type: 'card',
        title: { type: 'plain_text', text: '🃏 Card Block 1: Sentry Alert' },
        subtitle: { type: 'plain_text', text: '35 unhandled exceptions' },
        body: {
          type: 'mrkdwn',
          text: 'Rate limiting threshold exceeded on `/api/v2/checkout`. Check database pool.',
        },
        actions: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'Acknowledge' },
            style: 'primary',
            value: 'ack_sentry',
            action_id: 'btn_ack_sentry',
          },
        ],
      },
      {
        type: 'card',
        title: { type: 'plain_text', text: '🃏 Card Block 2: Datadog Monitor' },
        subtitle: { type: 'plain_text', text: 'Disk IOPS High' },
        body: {
          type: 'mrkdwn',
          text: 'IOPS on RDS read-replica approaching 80% provisioned baseline.',
        },
        actions: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'View Monitor' },
            value: 'view_datadog',
            action_id: 'btn_view_datadog',
          },
        ],
      },
    ],
  },
  {
    type: 'container',
    title: { type: 'plain_text', text: '📦 Container Block (Collapsible Audit Trail)' },
    subtitle: { type: 'mrkdwn', text: 'Click to expand details' },
    is_collapsible: true,
    default_collapsed: false,
    child_blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '• `2026-11-10 00:00:00` Deploy job initiated by `@alice`\n• `2026-11-10 00:02:15` Integration tests passed (148/148)\n• `2026-11-10 00:03:00` Canary rollout: 10% traffic allocated',
        },
      },
    ],
  },
  {
    type: 'actions',
    elements: [
      {
        type: 'static_select',
        placeholder: { type: 'plain_text', text: 'Assign Assignee...' },
        action_id: 'select_assignee',
        options: [
          { text: { type: 'plain_text', text: 'Kenji Sato (SRE)' }, value: 'kenji' },
          { text: { type: 'plain_text', text: 'Sarah Connor (DevOps)' }, value: 'sarah' },
        ],
      },
      {
        type: 'datepicker',
        initial_date: '2026-11-10',
        placeholder: { type: 'plain_text', text: 'Select Due Date' },
        action_id: 'picker_due_date',
      },
      {
        type: 'button',
        text: { type: 'plain_text', text: '✅ Approve Release' },
        style: 'primary',
        value: 'approve_release',
        action_id: 'btn_approve',
      },
      {
        type: 'button',
        text: { type: 'plain_text', text: '❌ Abort Rollout' },
        style: 'danger',
        value: 'abort_rollout',
        action_id: 'btn_abort',
      },
    ],
  },
  {
    type: 'image',
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    alt_text: 'Analytics Architecture diagram',
    title: { type: 'plain_text', text: '🖼️ Image Block: Data Pipeline Topology' },
  },
  {
    type: 'context',
    elements: [
      {
        type: 'image',
        image_url: 'https://api.slack.com/img/blocks/bkb_template_images/placeholder.png',
        alt_text: 'bot avatar',
      },
      {
        type: 'mrkdwn',
        text: '📌 **Context Block**: Automated delivery via *Antigravity CI/CD Pipeline* · Bot v2.6.4',
      },
    ],
  },
];

/**
 * Data Visualization (4 Charts) 完全版
 */
export const dataVizBlocks: Block[] = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '📈 Slack Block Kit Data Visualization Gallery',
      emoji: true,
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'The `data_visualization` block natively renders interactive charts directly inside Slack messages without generating or hosting image files. It supports 4 chart styles:\n• *Bar*: Discrete comparison across categories\n• *Line*: Time-series trend analysis\n• *Area*: Cumulative / volumetric progression\n• *Pie*: Proportional segment distribution',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'data_visualization',
    title: '1. Line Chart: API Response Time (p95 & p50 in ms)',
    chart: {
      type: 'line',
      series: [
        {
          name: 'p95 Latency (ms)',
          data: [
            { label: '00:00', value: 120 },
            { label: '04:00', value: 98 },
            { label: '08:00', value: 185 },
            { label: '12:00', value: 240 },
            { label: '16:00', value: 210 },
            { label: '20:00', value: 145 },
          ],
        },
        {
          name: 'p50 Latency (ms)',
          data: [
            { label: '00:00', value: 45 },
            { label: '04:00', value: 38 },
            { label: '08:00', value: 72 },
            { label: '12:00', value: 95 },
            { label: '16:00', value: 84 },
            { label: '20:00', value: 55 },
          ],
        },
      ],
      axis_config: {
        categories: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        x_label: 'Time of Day (UTC)',
        y_label: 'Milliseconds',
      },
    },
  },
  {
    type: 'data_visualization',
    title: '2. Pie Chart: Infrastructure Cost by Cloud Provider',
    chart: {
      type: 'pie',
      segments: [
        { label: 'AWS Cloud', value: 4200 },
        { label: 'Cloudflare', value: 1850 },
        { label: 'Google Cloud', value: 1200 },
        { label: 'Azure', value: 750 },
      ],
    },
  },
  {
    type: 'data_visualization',
    title: '3. Area Chart: Active Users Over Time',
    chart: {
      type: 'area',
      series: [
        {
          name: 'Desktop Users',
          data: [
            { label: 'Mon', value: 3200 },
            { label: 'Tue', value: 4100 },
            { label: 'Wed', value: 4500 },
            { label: 'Thu', value: 4300 },
            { label: 'Fri', value: 3800 },
            { label: 'Sat', value: 1200 },
            { label: 'Sun', value: 1100 },
          ],
        },
        {
          name: 'Mobile Users',
          data: [
            { label: 'Mon', value: 1800 },
            { label: 'Tue', value: 2200 },
            { label: 'Wed', value: 2500 },
            { label: 'Thu', value: 2400 },
            { label: 'Fri', value: 2900 },
            { label: 'Sat', value: 3100 },
            { label: 'Sun', value: 2800 },
          ],
        },
      ],
      axis_config: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        x_label: 'Day of Week',
        y_label: 'Unique Logins',
      },
    },
  },
];

/**
 * Data Table & Standard Table 完全版
 */
export const dataTableBlocks: Block[] = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '📑 Data Table Block (`data_table`) Showcase',
      emoji: true,
    },
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'The `data_table` block is Slack\'s high-interactivity table component. Features include:\n• Built-in client-side **pagination** (configured with `page_size`)\n• Click-to-sort headers (**alphabetical** for text, **numeric** for `raw_number`)\n• Accessible caption & row header index for screen readers\n• Support for interactive **Action Cells** (Buttons)',
    },
  },
  {
    type: 'divider',
  },
  {
    type: 'data_table',
    caption: 'Production Incident Triage & Server Status',
    page_size: 4,
    row_header_column_index: 0,
    rows: [
      [
        { type: 'raw_text', text: 'Service / Cluster' },
        { type: 'raw_text', text: 'Environment' },
        { type: 'raw_text', text: 'Uptime %' },
        { type: 'raw_text', text: 'Action' },
      ],
      [
        { type: 'raw_text', text: 'auth-service-k8s' },
        { type: 'raw_text', text: 'Production' },
        { type: 'raw_number', value: 99.99 },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Health Check' },
            style: 'primary',
            value: 'ping_auth',
            action_id: 'action_auth',
          },
        },
      ],
      [
        { type: 'raw_text', text: 'billing-api-worker' },
        { type: 'raw_text', text: 'Production' },
        { type: 'raw_number', value: 99.85 },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Investigate' },
            style: 'danger',
            value: 'investigate_billing',
            action_id: 'action_billing',
          },
        },
      ],
      [
        { type: 'raw_text', text: 'websocket-gateway' },
        { type: 'raw_text', text: 'Production' },
        { type: 'raw_number', value: 99.95 },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Restart' },
            value: 'restart_ws',
            action_id: 'action_ws',
          },
        },
      ],
      [
        { type: 'raw_text', text: 'vector-search-db' },
        { type: 'raw_text', text: 'Production' },
        { type: 'raw_number', value: 99.99 },
        {
          type: 'action_cell',
          element: {
            type: 'button',
            text: { type: 'plain_text', text: 'Health Check' },
            style: 'primary',
            value: 'ping_vector',
            action_id: 'action_vector',
          },
        },
      ],
    ],
  },
  {
    type: 'divider',
  },
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: '📋 Standard Table Block (`table`) Showcase',
      emoji: true,
    },
  },
  {
    type: 'table',
    column_settings: [
      { align: 'left', is_wrapped: false },
      { align: 'center', is_wrapped: false },
      { align: 'right', is_wrapped: false },
    ],
    rows: [
      [
        { type: 'raw_text', text: 'Product SKU' },
        { type: 'raw_text', text: 'Category' },
        { type: 'raw_text', text: 'Unit Price' },
      ],
      [
        { type: 'raw_text', text: 'MacBook Pro 16" M4 Max' },
        { type: 'raw_text', text: 'Hardware' },
        { type: 'raw_number', value: 3499 },
      ],
      [
        { type: 'raw_text', text: 'Studio Display 27" 5K' },
        { type: 'raw_text', text: 'Peripherals' },
        { type: 'raw_number', value: 1599 },
      ],
      [
        { type: 'raw_text', text: 'Magic Keyboard w/ Touch ID' },
        { type: 'raw_text', text: 'Accessories' },
        { type: 'raw_number', value: 199 },
      ],
    ],
  },
];
