import { useState, useMemo } from 'react';
import { Message, type Block } from 'slack-blocks-to-jsx';
import {
  articlesThreeColumnBlocks,
  articlesTwoColumnBlocks,
  articlesCarouselBlocks,
  articlesVerticalBlocks,
  articlesAccordionBlocks,
  allComponentsBlocks,
  beforeMarkdownBlocks,
  afterBlockKitBlocks,
  dataVizBlocks,
  dataTableBlocks,
} from './samples';
import { blockCatalogByType } from './singleBlockSamples';

type TabKey =
  | 'articles'
  | 'singleblocks'
  | 'comparison'
  | 'all'
  | 'dataviz'
  | 'datatable'
  | 'playground';

type ArticlePattern = 'threecolumn' | 'twocolumn' | 'carousel' | 'vertical' | 'accordion';
type DeviceWidth = '100%' | '720px' | '390px';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('articles');
  const [articlePattern, setArticlePattern] = useState<ArticlePattern>('threecolumn');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // JSON パネルの開閉ステート（初期値: 閉じて Live Render を広く見せる）
  const [showJsonPanel, setShowJsonPanel] = useState<boolean>(false);

  // 画面幅シミュレータ用ステート
  const [deviceWidth, setDeviceWidth] = useState<DeviceWidth>('100%');

  // レスポンシブ（折り返し）の ON/OFF ステート
  const [isResponsiveEnabled, setIsResponsiveEnabled] = useState<boolean>(true);

  // Interactive Playground 用ステート
  const [playgroundJson, setPlaygroundJson] = useState<string>(() =>
    JSON.stringify(articlesThreeColumnBlocks, null, 2)
  );
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // 単体ブロックカタログ用ステート
  const [selectedBlockType, setSelectedBlockType] = useState<string>('all');
  const [catalogSearch, setCatalogSearch] = useState<string>('');
  const [expandedJsonIds, setExpandedJsonIds] = useState<Record<string, boolean>>({});
  const [singleCopiedId, setSingleCopiedId] = useState<string | null>(null);

  const toggleJsonExpand = (id: string) => {
    setExpandedJsonIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopySingleBlock = (id: string, block: Block) => {
    navigator.clipboard.writeText(JSON.stringify(block, null, 2));
    setSingleCopiedId(id);
    setTimeout(() => setSingleCopiedId(null), 2000);
  };

  const handleSendToPlayground = (block: Block) => {
    setPlaygroundJson(JSON.stringify([block], null, 2));
    setActiveTab('playground');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // 記事要約の現在のブロック
  const currentArticleBlocks: Block[] = useMemo(() => {
    switch (articlePattern) {
      case 'threecolumn':
        return articlesThreeColumnBlocks;
      case 'twocolumn':
        return articlesTwoColumnBlocks;
      case 'carousel':
        return articlesCarouselBlocks;
      case 'vertical':
        return articlesVerticalBlocks;
      case 'accordion':
        return articlesAccordionBlocks;
    }
  }, [articlePattern]);

  // タブに応じた現在のブロック
  const currentBlocks: Block[] = useMemo(() => {
    switch (activeTab) {
      case 'articles':
        return currentArticleBlocks;
      case 'comparison':
        return afterBlockKitBlocks;
      case 'all':
        return allComponentsBlocks;
      case 'singleblocks':
        return [];
      case 'dataviz':
        return dataVizBlocks;
      case 'datatable':
        return dataTableBlocks;
      case 'playground': {
        try {
          const parsed = JSON.parse(playgroundJson);
          return Array.isArray(parsed) ? parsed : (parsed.blocks ?? []);
        } catch {
          return [];
        }
      }
    }
  }, [activeTab, currentArticleBlocks, playgroundJson]);

  const handleJsonChange = (val: string) => {
    setPlaygroundJson(val);
    try {
      const parsed = JSON.parse(val);
      if (!Array.isArray(parsed) && !Array.isArray(parsed.blocks)) {
        setJsonError('JSON must be an array of blocks, or an object with a "blocks" array.');
      } else {
        setJsonError(null);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setJsonError(err.message);
      } else {
        setJsonError('Invalid JSON format');
      }
    }
  };

  const handleCopy = () => {
    const textToCopy =
      activeTab === 'playground'
        ? playgroundJson
        : JSON.stringify(currentBlocks, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const loadPreset = (preset: Block[]) => {
    setPlaygroundJson(JSON.stringify(preset, null, 2));
    setJsonError(null);
  };

  // カタログのフィルタリング
  const allBlockTypes = useMemo(() => {
    return ['all', ...blockCatalogByType.map((g) => g.type)];
  }, []);

  const totalCatalogSubTypesCount = useMemo(() => {
    return blockCatalogByType.reduce((acc, g) => acc + g.subTypes.length, 0);
  }, []);

  const filteredCatalog = useMemo(() => {
    const q = catalogSearch.trim().toLowerCase();
    return blockCatalogByType
      .filter((group) => {
        if (selectedBlockType === 'all') return true;
        return group.type === selectedBlockType;
      })
      .map((group) => {
        if (!q) return group;
        const matchingSubTypes = group.subTypes.filter(
          (sub) =>
            sub.name.toLowerCase().includes(q) ||
            sub.subTypeTag.toLowerCase().includes(q) ||
            sub.description.toLowerCase().includes(q) ||
            group.groupName.toLowerCase().includes(q)
        );
        return {
          ...group,
          subTypes: matchingSubTypes,
        };
      })
      .filter((group) => group.subTypes.length > 0);
  }, [selectedBlockType, catalogSearch]);

  return (
    <div className="app" data-theme={theme}>
      {/* Top Header */}
      <header className="app-header">
        <div className="app-title-group">
          <span style={{ fontSize: '1.4rem' }}>⚡</span>
          <div>
            <h1 className="app-title">Slack Block Kit Explorer</h1>
            <p style={{ fontSize: '0.75rem', opacity: 0.85 }}>
              Responsive Multi-Column & Layout Design Showcase
            </p>
          </div>
          <span className="app-badge">Slack Native 2026</span>
        </div>
        <div className="header-actions">
          <button
            className="btn-toggle-json"
            onClick={() => setShowJsonPanel(!showJsonPanel)}
            style={{ color: '#fff', background: 'rgba(255, 255, 255, 0.2)', borderColor: 'rgba(255, 255, 255, 0.3)' }}
          >
            {showJsonPanel ? '◀ JSON パネルを閉じる' : '▶ Payload JSON を開く'}
          </button>
          <button className="theme-toggle-btn" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="container">
        {/* LAN Preview Info Banner */}
        <div className="info-banner">
          <div>
            <strong>🌐 Local Network Preview: </strong>
            Local: <span className="lan-pill">http://localhost:5173</span>
            {'  '}·{'  '}
            Network: <span className="lan-pill">http://192.168.242.100:5173</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="btn-toggle-json"
              onClick={() => setShowJsonPanel(!showJsonPanel)}
            >
              {showJsonPanel ? '◀ JSON を隠して全幅表示' : '▶ Payload JSON を横に表示'}
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="tabs-nav">
          <button
            className={`tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
            onClick={() => setActiveTab('articles')}
          >
            📰 記事要約 複数配置 (3列・2列・カルーセル)
          </button>
          <button
            className={`tab-btn ${activeTab === 'singleblocks' ? 'active' : ''}`}
            onClick={() => setActiveTab('singleblocks')}
          >
            🔍 単体ブロック全パターン図鑑 (Type & SubType)
          </button>
          <button
            className={`tab-btn ${activeTab === 'comparison' ? 'active' : ''}`}
            onClick={() => setActiveTab('comparison')}
          >
            ⚖️ マークダウン vs Block Kit 比較 (Before / After)
          </button>
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            🏛️ 全パーツ網羅カタログ (All Components)
          </button>
          <button
            className={`tab-btn ${activeTab === 'dataviz' ? 'active' : ''}`}
            onClick={() => setActiveTab('dataviz')}
          >
            📈 Data Visualization (4 Charts)
          </button>
          <button
            className={`tab-btn ${activeTab === 'datatable' ? 'active' : ''}`}
            onClick={() => setActiveTab('datatable')}
          >
            📑 Data Table & Standard Table
          </button>
          <button
            className={`tab-btn ${activeTab === 'playground' ? 'active' : ''}`}
            onClick={() => setActiveTab('playground')}
          >
            🛠️ Interactive Playground (JSON Edit)
          </button>
        </div>

        {/* =========================================================================
            TAB: ARTICLES (複数の記事要約のレイアウトパターン)
            ========================================================================= */}
        {activeTab === 'articles' && (
          <div>
            {/* Pattern Selector & Device Simulator Banner */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--slack-border)',
                borderRadius: '10px',
                padding: '16px 20px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              {/* Row 1: Pattern Selector */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <strong style={{ fontSize: '0.95rem' }}>🎯 レイアウトパターンの選択:</strong>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '8px' }}>
                    Slack Block Kit は <strong>1行最大3列まで</strong> 対応！
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button
                    className={`btn-secondary ${articlePattern === 'threecolumn' ? 'active-pill' : ''}`}
                    onClick={() => setArticlePattern('threecolumn')}
                    style={{
                      backgroundColor: articlePattern === 'threecolumn' ? 'var(--slack-active)' : undefined,
                      color: articlePattern === 'threecolumn' ? '#fff' : undefined,
                      borderColor: articlePattern === 'threecolumn' ? 'var(--slack-active)' : undefined,
                      fontWeight: 700,
                    }}
                  >
                    🔥 3列レスポンシブ角丸カード型
                  </button>
                  <button
                    className={`btn-secondary ${articlePattern === 'twocolumn' ? 'active-pill' : ''}`}
                    onClick={() => setArticlePattern('twocolumn')}
                    style={{
                      backgroundColor: articlePattern === 'twocolumn' ? 'var(--slack-active)' : undefined,
                      color: articlePattern === 'twocolumn' ? '#fff' : undefined,
                      borderColor: articlePattern === 'twocolumn' ? 'var(--slack-active)' : undefined,
                    }}
                  >
                    ② 2列角丸カード型
                  </button>
                  <button
                    className={`btn-secondary ${articlePattern === 'carousel' ? 'active-pill' : ''}`}
                    onClick={() => setArticlePattern('carousel')}
                    style={{
                      backgroundColor: articlePattern === 'carousel' ? 'var(--slack-active)' : undefined,
                      color: articlePattern === 'carousel' ? '#fff' : undefined,
                      borderColor: articlePattern === 'carousel' ? 'var(--slack-active)' : undefined,
                    }}
                  >
                    ③ 横スクロール・カルーセル型
                  </button>
                  <button
                    className={`btn-secondary ${articlePattern === 'vertical' ? 'active-pill' : ''}`}
                    onClick={() => setArticlePattern('vertical')}
                    style={{
                      backgroundColor: articlePattern === 'vertical' ? 'var(--slack-active)' : undefined,
                      color: articlePattern === 'vertical' ? '#fff' : undefined,
                      borderColor: articlePattern === 'vertical' ? 'var(--slack-active)' : undefined,
                    }}
                  >
                    ① 縦並びスタック型
                  </button>
                  <button
                    className={`btn-secondary ${articlePattern === 'accordion' ? 'active-pill' : ''}`}
                    onClick={() => setArticlePattern('accordion')}
                    style={{
                      backgroundColor: articlePattern === 'accordion' ? 'var(--slack-active)' : undefined,
                      color: articlePattern === 'accordion' ? '#fff' : undefined,
                      borderColor: articlePattern === 'accordion' ? 'var(--slack-active)' : undefined,
                    }}
                  >
                    ④ アコーディオン型
                  </button>
                </div>
              </div>

              {/* Row 2: Device Width Simulator & Responsive Toggle */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid var(--slack-border)',
                  paddingTop: '12px',
                  flexWrap: 'wrap',
                  gap: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>📏 画面幅シミュレータ:</span>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      className="btn-secondary"
                      onClick={() => setDeviceWidth('100%')}
                      style={{
                        backgroundColor: deviceWidth === '100%' ? '#0f172a' : undefined,
                        color: deviceWidth === '100%' ? '#fff' : undefined,
                        fontSize: '0.75rem',
                        fontWeight: deviceWidth === '100%' ? 700 : 500,
                      }}
                    >
                      🖥️ 大画面 (100%幅 / 3列並び)
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => setDeviceWidth('720px')}
                      style={{
                        backgroundColor: deviceWidth === '720px' ? '#0f172a' : undefined,
                        color: deviceWidth === '720px' ? '#fff' : undefined,
                        fontSize: '0.75rem',
                        fontWeight: deviceWidth === '720px' ? 700 : 500,
                      }}
                    >
                      💻 中画面・タブレット (720px / 2列+1列折り返し)
                    </button>
                    <button
                      className="btn-secondary"
                      onClick={() => setDeviceWidth('390px')}
                      style={{
                        backgroundColor: deviceWidth === '390px' ? '#0f172a' : undefined,
                        color: deviceWidth === '390px' ? '#fff' : undefined,
                        fontSize: '0.75rem',
                        fontWeight: deviceWidth === '390px' ? 700 : 500,
                      }}
                    >
                      📱 スマホ (390px / 1列縦並び)
                    </button>
                  </div>
                </div>

                {/* Responsive ON/OFF Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>🔄 レスポンシブ折り返し:</span>
                  <button
                    className="btn-secondary"
                    onClick={() => setIsResponsiveEnabled(!isResponsiveEnabled)}
                    style={{
                      backgroundColor: isResponsiveEnabled ? 'var(--slack-active)' : '#e2e8f0',
                      color: isResponsiveEnabled ? '#fff' : '#475569',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                    }}
                  >
                    {isResponsiveEnabled ? '✅ ON (画面幅で自動折り返し)' : '⏸️ OFF (3列横並び固定 / 横スクロール)'}
                  </button>
                </div>
              </div>
            </div>

            {/* Layout Explanation Card */}
            <div
              style={{
                background: 'rgba(17, 100, 163, 0.05)',
                borderLeft: '4px solid var(--slack-active)',
                padding: '12px 18px',
                borderRadius: '0 8px 8px 0',
                marginBottom: '20px',
                fontSize: '0.875rem',
                lineHeight: 1.6,
              }}
            >
              {articlePattern === 'threecolumn' && (
                <div>
                  <strong>【🔥 3列並びレスポンシブ角丸カード型 (Responsive 3-Column Cards)】</strong><br />
                  • <strong>Slack Block Kit の仕様</strong>: <code>layout</code> ブロックは <strong>1行あたり最大 3 列 (Minimum 1, Maximum 3)</strong> まで配置可能！<br />
                  • <strong>画面幅に応じた自動可変挙動</strong>:<br />
                  &nbsp;&nbsp;1. <strong>🖥️ デスクトップ大画面</strong>: 3つの角丸カードが横に整然と **3列並び** で表示されます。<br />
                  &nbsp;&nbsp;2. <strong>💻 ノートPC・中画面</strong>: 幅が狭くなると自動で **2列 + 1列（下段）** に美しく折り返します。<br />
                  &nbsp;&nbsp;3. <strong>📱 スマートフォン</strong>: 狭小画面では自動的に **1列（縦並びスタック）** にフォールバックします！<br />
                  • 上の「📏 画面幅シミュレータ」ボタンで、この自動列数変化をワンクリックで体験できます。
                </div>
              )}
              {articlePattern === 'twocolumn' && (
                <div>
                  <strong>【② 角丸カード枠付き 2列並びグリッド型 (Two-Column Rounded Cards)】</strong><br />
                  • <code>layout</code> ブロックの各カラムに <code>card</code> ブロック（角丸ボーダー枠線）を配置。左右の各記事が独立したカードとして視覚的に際立ち、2つの技術やニュースを比較・対比するのに最適です。
                </div>
              )}
              {articlePattern === 'carousel' && (
                <div>
                  <strong>【③ 横スクロール・カルーセルカード型 (Horizontal Carousel Cards)】</strong><br />
                  • <code>carousel</code> ブロックの中に <code>card</code> を複数格納。チャンネルの縦スペースを一切占有せず、スマホでは横スワイプで閲覧可能。
                </div>
              )}
              {articlePattern === 'vertical' && (
                <div>
                  <strong>【① 縦並びスタック型 (Vertical Stacked Digest)】</strong><br />
                  • 各記事が「タイトルリンク」→「2列メタデータ (`section.fields`)」→「要約3行」→「ボタン」の順で並ぶ王道スタイル。
                </div>
              )}
              {articlePattern === 'accordion' && (
                <div>
                  <strong>【④ 折りたたみアコーディオン型 (Collapsible Containers)】</strong><br />
                  • 各記事を <code>container</code>（<code>is_collapsible: true</code>）でラップ。タイトルとメタデータだけを常時見せ、タップすると要約3行が展開。
                </div>
              )}
            </div>

            {/* Split Screen: JSON + Live Message Preview */}
            <div className={`editor-layout ${showJsonPanel ? 'with-json' : 'without-json'}`}>
              {/* Left: JSON Panel */}
              {showJsonPanel && (
                <div className="panel-card">
                  <div className="panel-header">
                    <span className="panel-title">📄 Payload JSON</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn-secondary" onClick={handleCopy}>
                        {copied ? '✅ Copied!' : '📋 Copy'}
                      </button>
                      <button className="btn-secondary" onClick={() => setShowJsonPanel(false)}>
                        ✕ 閉じる
                      </button>
                    </div>
                  </div>
                  <div className="panel-body">
                    <pre
                      style={{
                        maxHeight: '680px',
                        overflowY: 'auto',
                        fontSize: '0.8rem',
                        background: '#1e1e1e',
                        color: '#d4d4d4',
                        padding: '16px',
                        borderRadius: '6px',
                        lineHeight: 1.45,
                      }}
                    >
                      <code>{JSON.stringify(currentArticleBlocks, null, 2)}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Right: Slack Live Render (Responsive Container) */}
              <div className="panel-card">
                <div className="panel-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className="panel-title">💬 Slack Message Live Render</span>
                    {!showJsonPanel && (
                      <button
                        className="btn-toggle-json"
                        onClick={() => setShowJsonPanel(true)}
                        style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                      >
                        ▶ JSON を表示
                      </button>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                    Active Width: {deviceWidth}
                  </span>
                </div>
                <div
                  className="panel-body slack-message-container"
                  style={{
                    maxHeight: '840px',
                    overflowY: 'auto',
                    display: 'flex',
                    justifyContent: deviceWidth === '100%' ? 'flex-start' : 'center',
                    background: deviceWidth === '100%' ? 'transparent' : 'rgba(0,0,0,0.03)',
                    padding: deviceWidth === '100%' ? '20px' : '24px 12px',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {/* Simulated Frame */}
                  <div
                    className={isResponsiveEnabled ? '' : 'responsive-off'}
                    style={{
                      width: deviceWidth,
                      maxWidth: '100%',
                      background: 'var(--bg-card)',
                      borderRadius: deviceWidth === '100%' ? '0px' : '12px',
                      boxShadow: deviceWidth === '100%' ? 'none' : '0 4px 20px rgba(0,0,0,0.12)',
                      border: deviceWidth === '100%' ? 'none' : '1px solid var(--slack-border)',
                      padding: deviceWidth === '100%' ? '0px' : '16px',
                      transition: 'all 0.3s ease',
                      overflowX: isResponsiveEnabled ? 'visible' : 'auto',
                    }}
                  >
                    <Message
                      blocks={currentArticleBlocks}
                      name="Tech Digest Bot"
                      logo="https://api.slack.com/img/blocks/bkb_template_images/placeholder.png"
                      time={new Date()}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: SINGLE BLOCKS CATALOG (Type別・サブType別 単体ブロック全パターン図鑑)
            ========================================================================= */}
        {activeTab === 'singleblocks' && (
          <div>
            {/* Header & Filter Controls */}
            <div
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--slack-border)',
                borderRadius: '10px',
                padding: '18px 22px',
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--slack-heading)' }}>
                    🔍 Block Kit 単体ブロック全パターン図鑑 (Type別・サブType別 一覧表)
                  </h2>
                  <p style={{ margin: 0, fontSize: '0.82rem', color: '#64748b' }}>
                    Block Kit を<strong>「1つだけ」</strong>使った全16種類のトップレベル <code>type</code> と、その内側の各サブ <code>type</code> (全{totalCatalogSubTypesCount}パターン) の実機Live描画と最小JSONです。
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span
                    style={{
                      background: 'rgba(99, 102, 241, 0.12)',
                      color: '#4f46e5',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      border: '1px solid rgba(99, 102, 241, 0.25)',
                    }}
                  >
                    全 16 Block Types / {totalCatalogSubTypesCount} Patterns
                  </span>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ position: 'relative', flex: '1 1 240px', maxWidth: '400px' }}>
                  <input
                    type="text"
                    placeholder="🔎 サブTypeや機能名で検索 (例: datepicker, alert, line, card...)"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 12px 8px 32px',
                      borderRadius: '6px',
                      border: '1px solid var(--slack-border)',
                      background: 'var(--bg-main)',
                      color: 'inherit',
                      fontSize: '0.85rem',
                      outline: 'none',
                    }}
                  />
                  <span style={{ position: 'absolute', left: '10px', top: '8px', opacity: 0.5, fontSize: '0.85rem' }}>
                    🔍
                  </span>
                  {catalogSearch && (
                    <button
                      onClick={() => setCatalogSearch('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '7px',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        fontSize: '0.85rem',
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Type Filter Pills */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', flex: '1 1 500px' }}>
                  {allBlockTypes.map((t) => {
                    const isSelected = selectedBlockType === t;
                    return (
                      <button
                        key={t}
                        onClick={() => setSelectedBlockType(t)}
                        style={{
                          fontSize: '0.75rem',
                          padding: '4px 10px',
                          borderRadius: '14px',
                          border: isSelected ? '1px solid var(--slack-active)' : '1px solid var(--slack-border)',
                          background: isSelected ? 'var(--slack-active)' : 'transparent',
                          color: isSelected ? '#fff' : 'inherit',
                          fontWeight: isSelected ? 700 : 500,
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        {t === 'all' ? '✨ すべて (All)' : t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Catalog Group List */}
            {filteredCatalog.length === 0 ? (
              <div
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--slack-border)',
                  borderRadius: '10px',
                  padding: '40px',
                  textAlign: 'center',
                  color: '#94a3b8',
                }}
              >
                該当するブロック Type または サブ Type が見つかりませんでした。検索キーワードを変更してください。
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                {filteredCatalog.map((group) => (
                  <section
                    key={group.type}
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--slack-border)',
                      borderRadius: '12px',
                      padding: '20px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                  >
                    {/* Group Title */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '12px',
                        marginBottom: '8px',
                        borderBottom: '2px solid var(--slack-active)',
                        paddingBottom: '8px',
                      }}
                    >
                      <span
                        style={{
                          background: 'var(--slack-active)',
                          color: '#fff',
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          padding: '2px 8px',
                          borderRadius: '4px',
                        }}
                      >
                        type: "{group.type}"
                      </span>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--slack-heading)' }}>
                        {group.groupName}
                      </h3>
                      <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: 'auto' }}>
                        {group.subTypes.length} パターン
                      </span>
                    </div>

                    <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                      {group.description}
                    </p>

                    {/* SubType Items List */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {group.subTypes.map((item) => {
                        const isJsonExpanded = !!expandedJsonIds[item.id];
                        const isThisCopied = singleCopiedId === item.id;

                        return (
                          <div
                            key={item.id}
                            style={{
                              border: '1px solid var(--slack-border)',
                              borderRadius: '8px',
                              background: 'var(--bg-main)',
                              overflow: 'hidden',
                            }}
                          >
                            {/* Item Header */}
                            <div
                              style={{
                                padding: '10px 14px',
                                background: 'rgba(0,0,0,0.02)',
                                borderBottom: '1px solid var(--slack-border)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap',
                                gap: '8px',
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                                <strong style={{ fontSize: '0.9rem', color: 'var(--slack-heading)' }}>
                                  {item.name}
                                </strong>
                                <span
                                  style={{
                                    fontFamily: 'monospace',
                                    fontSize: '0.72rem',
                                    padding: '2px 8px',
                                    borderRadius: '4px',
                                    background: 'rgba(15, 23, 42, 0.08)',
                                    color: 'var(--slack-active)',
                                    fontWeight: 600,
                                  }}
                                >
                                  {item.subTypeTag}
                                </span>
                                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                  {item.description}
                                </span>
                              </div>

                              {/* Action buttons */}
                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <button
                                  className="btn-secondary"
                                  onClick={() => handleCopySingleBlock(item.id, item.block)}
                                  style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                                >
                                  {isThisCopied ? '✅ Copied!' : '📋 JSON コピー'}
                                </button>
                                <button
                                  className="btn-secondary"
                                  onClick={() => handleSendToPlayground(item.block)}
                                  style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                                  title="この単体ブロックを Interactive Playground に読み込んで編集"
                                >
                                  ✏️ Playground で編集
                                </button>
                                <button
                                  className="btn-secondary"
                                  onClick={() => toggleJsonExpand(item.id)}
                                  style={{
                                    padding: '3px 8px',
                                    fontSize: '0.75rem',
                                    background: isJsonExpanded ? 'rgba(99, 102, 241, 0.15)' : undefined,
                                    color: isJsonExpanded ? '#4f46e5' : undefined,
                                    borderColor: isJsonExpanded ? '#4f46e5' : undefined,
                                  }}
                                >
                                  {isJsonExpanded ? '▲ JSON を閉じる' : '▼ JSON を見る'}
                                </button>
                              </div>
                            </div>

                            {/* Item Body: Slack Live Render */}
                            <div style={{ padding: '16px', background: 'var(--bg-card)' }}>
                              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>
                                💬 SLACK LIVE RENDER (単体描画)
                              </div>
                              <div className="slack-message-container" style={{ padding: '10px 14px', borderRadius: '6px' }}>
                                <Message
                                  blocks={[item.block]}
                                  name="Block Demo"
                                  logo="https://api.slack.com/img/blocks/bkb_template_images/placeholder.png"
                                  time={new Date()}
                                />
                              </div>
                            </div>

                            {/* JSON Expand Section */}
                            {isJsonExpanded && (
                              <div
                                style={{
                                  borderTop: '1px solid var(--slack-border)',
                                  background: '#1e1e1e',
                                  padding: '12px 16px',
                                }}
                              >
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '6px',
                                  }}
                                >
                                  <span style={{ fontSize: '0.72rem', color: '#9ca3af', fontFamily: 'monospace' }}>
                                    単体 Block Payload JSON
                                  </span>
                                  <button
                                    onClick={() => handleCopySingleBlock(item.id, item.block)}
                                    style={{
                                      background: 'rgba(255,255,255,0.15)',
                                      color: '#fff',
                                      border: 'none',
                                      padding: '2px 8px',
                                      borderRadius: '4px',
                                      fontSize: '0.7rem',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {isThisCopied ? '✅ Copied!' : 'Copy'}
                                  </button>
                                </div>
                                <pre
                                  style={{
                                    margin: 0,
                                    fontSize: '0.78rem',
                                    color: '#d4d4d4',
                                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                                    overflowX: 'auto',
                                    lineHeight: 1.45,
                                  }}
                                >
                                  {JSON.stringify(item.block, null, 2)}
                                </pre>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </section>
                ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================================
            TAB: COMPARISON (BEFORE VS AFTER)
            ========================================================================= */}
        {activeTab === 'comparison' && (
          <div>
            {/* Principles Box */}
            <section className="principles-box">
              <h2 className="principles-title">
                💡 単純なマークダウンより劇的に見やすくする「6つの黄金原則」
              </h2>
              <div className="principles-grid">
                <div className="principle-item">
                  <div className="principle-head">1. Alert バナーによる緊急度の即時伝達</div>
                  <div className="principle-desc">
                    マークダウンの絵文字（:warning:）は埋もれがちです。<code>alert</code> ブロック（error / warning / info）で枠線と背景色を付けることで、重大度が一瞬で脳に届きます。
                  </div>
                </div>
                <div className="principle-item">
                  <div className="principle-head">2. 2列フィールドによる縦スクロールの削減</div>
                  <div className="principle-desc">
                    担当者・ステータス・リソース等のメタデータを箇条書きにすると縦長になります。<code>section.fields</code> で左右2列に整列させると、縦幅を半減しつつ視認性が向上します。
                  </div>
                </div>
                <div className="principle-item">
                  <div className="principle-head">3. チャートで時系列変化を直感化</div>
                  <div className="principle-desc">
                    「CPU 94.8%」という数値だけでは急上昇なのか定常高負荷なのか分かりません。<code>data_visualization</code>（Line）で推移を添えることで文脈が即座に共有されます。
                  </div>
                </div>
                <div className="principle-item">
                  <div className="principle-head">4. 行内アクション付きテーブル</div>
                  <div className="principle-desc">
                    スロークエリ一覧をテキストで並べる代わりに、<code>data_table</code> を使用。行ごとの <code>action_cell</code>（Killボタン等）で迷わず即座に対処可能になります。
                  </div>
                </div>
                <div className="principle-item">
                  <div className="principle-head">5. プライマリアクションの強調</div>
                  <div className="principle-desc">
                    URLリンクを本文に貼ると見落とされます。<code>actions</code> ブロックで「最も押すべきボタン」を <code>style: "primary"</code>、危険な操作を <code>style: "danger"</code> で明確に差別化します。
                  </div>
                </div>
                <div className="principle-item">
                  <div className="principle-head">6. フッター情報の控えめな配置</div>
                  <div className="principle-desc">
                    発生日時やチャンネルIDなどの補足情報は、<code>context</code> ブロックで小さくグレーアウトして配置し、メインコンテンツの認知負荷を下げます。
                  </div>
                </div>
              </div>
            </section>

            {/* Side-by-Side Comparison */}
            <div className="comparison-grid">
              <div className="comparison-card bad">
                <div className="comparison-header bad">
                  <span>❌ Before: 単純なマークダウンだけの通知</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                    テキストの壁 · 視線誘導なし
                  </span>
                </div>
                <div className="panel-body slack-message-container" style={{ maxHeight: '780px', overflowY: 'auto' }}>
                  <Message
                    blocks={beforeMarkdownBlocks}
                    name="Alertmanager Bot"
                    logo="https://api.slack.com/img/blocks/bkb_template_images/placeholder.png"
                    time={new Date()}
                  />
                </div>
              </div>

              <div className="comparison-card good">
                <div className="comparison-header good">
                  <span>✅ After: Block Kit ベストプラクティス適用</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>
                    構造化 · グラフ · アクション直結
                  </span>
                </div>
                <div className="panel-body slack-message-container" style={{ maxHeight: '780px', overflowY: 'auto' }}>
                  <Message
                    blocks={afterBlockKitBlocks}
                    name="Incident Response Bot"
                    logo="https://api.slack.com/img/blocks/bkb_template_images/placeholder.png"
                    time={new Date()}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: ALL COMPONENTS CATALOG
            ========================================================================= */}
        {activeTab === 'all' && (
          <div className={`editor-layout ${showJsonPanel ? 'with-json' : 'without-json'}`}>
            {showJsonPanel && (
              <div className="panel-card">
                <div className="panel-header">
                  <span className="panel-title">📚 全パーツ網羅一覧 & JSON</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-secondary" onClick={handleCopy}>
                      {copied ? '✅ Copied!' : '📋 Copy'}
                    </button>
                    <button className="btn-secondary" onClick={() => setShowJsonPanel(false)}>
                      ✕ 閉じる
                    </button>
                  </div>
                </div>
                <div className="panel-body" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
                  <ol style={{ paddingLeft: '18px', marginBottom: '12px' }}>
                    <li><strong>Header</strong>: 大見出し</li>
                    <li><strong>Alert</strong> (info/warning): カラーバナー枠</li>
                    <li><strong>Section Text & 2列 Fields</strong></li>
                    <li><strong>Section Accessory</strong>: 右側ボタン</li>
                    <li><strong>Divider</strong>: 水平境界線</li>
                    <li><strong>Data Visualization</strong>: 折れ線チャート</li>
                    <li><strong>Data Table</strong>: ソート・ページ送り・ActionCell</li>
                    <li><strong>Standard Table</strong>: 列配置指定グリッド</li>
                    <li><strong>Carousel & Card</strong>: カルーセルカード</li>
                    <li><strong>Container</strong>: 折りたたみ枠</li>
                    <li><strong>Actions</strong>: セレクト、日付ピッカー、ボタン</li>
                    <li><strong>Image & Context</strong>: 図表とフッター</li>
                  </ol>
                  <pre
                    style={{
                      maxHeight: '400px',
                      overflowY: 'auto',
                      fontSize: '0.75rem',
                      background: '#1e1e1e',
                      color: '#d4d4d4',
                      padding: '12px',
                      borderRadius: '6px',
                    }}
                  >
                    <code>{JSON.stringify(allComponentsBlocks, null, 2)}</code>
                  </pre>
                </div>
              </div>
            )}

            <div className="panel-card">
              <div className="panel-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="panel-title">💬 Full Components Live Preview</span>
                  {!showJsonPanel && (
                    <button
                      className="btn-toggle-json"
                      onClick={() => setShowJsonPanel(true)}
                      style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                    >
                      ▶ JSON を表示
                    </button>
                  )}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                  ● 15+ Components Active
                </span>
              </div>
              <div className="panel-body slack-message-container" style={{ maxHeight: '820px', overflowY: 'auto' }}>
                <Message
                  blocks={allComponentsBlocks}
                  name="Master Component Bot"
                  logo="https://api.slack.com/img/blocks/bkb_template_images/placeholder.png"
                  time={new Date()}
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: DATA VISUALIZATION
            ========================================================================= */}
        {activeTab === 'dataviz' && (
          <div className={`editor-layout ${showJsonPanel ? 'with-json' : 'without-json'}`}>
            {showJsonPanel && (
              <div className="panel-card">
                <div className="panel-header">
                  <span className="panel-title">📈 Chart Types & JSON</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-secondary" onClick={handleCopy}>
                      {copied ? '✅ Copied!' : '📋 Copy'}
                    </button>
                    <button className="btn-secondary" onClick={() => setShowJsonPanel(false)}>
                      ✕ 閉じる
                    </button>
                  </div>
                </div>
                <div className="panel-body">
                  <div style={{ marginBottom: '12px', fontSize: '0.825rem', color: '#64748b' }}>
                    • <strong>Line Chart</strong>: 時系列の推移・レイテンシ<br />
                    • <strong>Pie Chart</strong>: クラウドインフラ費の比率構成<br />
                    • <strong>Area Chart</strong>: アクティブユーザーの累積推移
                  </div>
                  <pre
                    style={{
                      maxHeight: '520px',
                      overflowY: 'auto',
                      fontSize: '0.8rem',
                      background: '#1e1e1e',
                      color: '#d4d4d4',
                      padding: '16px',
                      borderRadius: '6px',
                    }}
                  >
                    <code>{JSON.stringify(dataVizBlocks, null, 2)}</code>
                  </pre>
                </div>
              </div>
            )}
            <div className="panel-card">
              <div className="panel-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="panel-title">💬 Live Chart Preview</span>
                  {!showJsonPanel && (
                    <button
                      className="btn-toggle-json"
                      onClick={() => setShowJsonPanel(true)}
                      style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                    >
                      ▶ JSON を表示
                    </button>
                  )}
                </div>
              </div>
              <div className="panel-body slack-message-container" style={{ maxHeight: '820px', overflowY: 'auto' }}>
                <Message
                  blocks={dataVizBlocks}
                  name="Metrics Bot"
                  logo="https://api.slack.com/img/blocks/bkb_template_images/placeholder.png"
                  time={new Date()}
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: DATA TABLE & STANDARD TABLE
            ========================================================================= */}
        {activeTab === 'datatable' && (
          <div className={`editor-layout ${showJsonPanel ? 'with-json' : 'without-json'}`}>
            {showJsonPanel && (
              <div className="panel-card">
                <div className="panel-header">
                  <span className="panel-title">📑 Data Table vs Standard Table</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn-secondary" onClick={handleCopy}>
                      {copied ? '✅ Copied!' : '📋 Copy'}
                    </button>
                    <button className="btn-secondary" onClick={() => setShowJsonPanel(false)}>
                      ✕ 閉じる
                    </button>
                  </div>
                </div>
                <div className="panel-body">
                  <div style={{ marginBottom: '14px', fontSize: '0.825rem', color: '#64748b' }}>
                    • <code>data_table</code>: ページ送り・ソート・Action Cell付きの運用データ<br />
                    • <code>table</code>: カラムアライメント指定の軽量グリッド
                  </div>
                  <pre
                    style={{
                      maxHeight: '500px',
                      overflowY: 'auto',
                      fontSize: '0.8rem',
                      background: '#1e1e1e',
                      color: '#d4d4d4',
                      padding: '16px',
                      borderRadius: '6px',
                    }}
                  >
                    <code>{JSON.stringify(dataTableBlocks, null, 2)}</code>
                  </pre>
                </div>
              </div>
            )}
            <div className="panel-card">
              <div className="panel-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className="panel-title">💬 Table Blocks Live Preview</span>
                  {!showJsonPanel && (
                    <button
                      className="btn-toggle-json"
                      onClick={() => setShowJsonPanel(true)}
                      style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                    >
                      ▶ JSON を表示
                    </button>
                  )}
                </div>
              </div>
              <div className="panel-body slack-message-container" style={{ maxHeight: '820px', overflowY: 'auto' }}>
                <Message
                  blocks={dataTableBlocks}
                  name="Ops Bot"
                  logo="https://api.slack.com/img/blocks/bkb_template_images/placeholder.png"
                  time={new Date()}
                />
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
            TAB: INTERACTIVE PLAYGROUND
            ========================================================================= */}
        {activeTab === 'playground' && (
          <div className="editor-layout with-json">
            <div className="panel-card">
              <div className="panel-header">
                <span className="panel-title">✏️ Block Kit JSON Editor</span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    className="btn-secondary"
                    onClick={() => loadPreset(articlesThreeColumnBlocks)}
                  >
                    3列レスポンシブ
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => loadPreset(articlesTwoColumnBlocks)}
                  >
                    2列角丸カード
                  </button>
                  <button
                    className="btn-secondary"
                    onClick={() => loadPreset(articlesCarouselBlocks)}
                  >
                    カルーセル
                  </button>
                </div>
              </div>
              <div className="panel-body">
                <textarea
                  className="json-editor"
                  value={playgroundJson}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  spellCheck={false}
                />
                {jsonError && <div className="error-badge">⚠️ {jsonError}</div>}
              </div>
            </div>
            <div className="panel-card">
              <div className="panel-header">
                <span className="panel-title">💬 Live Render Output</span>
              </div>
              <div
                className="panel-body slack-message-container"
                style={{ minHeight: '520px' }}
              >
                {currentBlocks.length > 0 ? (
                  <Message
                    blocks={currentBlocks}
                    name="Playground Bot"
                    logo="https://api.slack.com/img/blocks/bkb_template_images/placeholder.png"
                    time={new Date()}
                  />
                ) : (
                  <div style={{ color: '#ef4444', padding: '20px' }}>
                    JSON にエラーがあるか、ブロック配列が空です。
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
