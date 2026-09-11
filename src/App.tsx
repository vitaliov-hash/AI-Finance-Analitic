import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  TickerBar 
} from './components/TickerBar';
import { Header } from './components/Header';
import { ControlDeck } from './components/ControlDeck';
import { MarketSentimentBanner } from './components/MarketSentimentBanner';
import { NewsDigestCard } from './components/NewsDigestCard';
import { AssetRecommendationCard } from './components/AssetRecommendationCard';
import { SourcesPanel } from './components/SourcesPanel';
import { MethodologyModal } from './components/MethodologyModal';
import { ExportModal } from './components/ExportModal';
import { 
  AnalysisMode, 
  TimeInterval, 
  AssetCategory, 
  AnalysisResult 
} from './types';
import { 
  filterNewsItems, 
  filterRecommendations 
} from './utils/assetMatcher';
import { 
  AlertCircle, 
  SearchX, 
  TrendingUp, 
  Newspaper,
  Sparkles
} from 'lucide-react';

export default function App() {
  const [mode, setMode] = useState<AnalysisMode>('digest');
  const [interval, setInterval] = useState<TimeInterval>('1h');
  const [category, setCategory] = useState<AssetCategory>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [data, setData] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);
  const [isExportOpen, setIsExportOpen] = useState<boolean>(false);

  // Fetch real-time financial analysis from server
  const fetchAnalysis = useCallback(async (targetMode: AnalysisMode, targetInterval: TimeInterval) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/financial-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: targetMode,
          interval: targetInterval,
          category,
          customQuery: searchQuery.trim() || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка сервера (${response.status})`);
      }

      const result: AnalysisResult = await response.json();
      setData(result);
    } catch (err: any) {
      console.error('Ошибка загрузки данных:', err);
      setError('Не удалось загрузить данные в реальном времени. Проверьте соединение.');
    } finally {
      setIsLoading(false);
    }
  }, [category, searchQuery]);

  // Initial load and whenever mode or interval changes
  useEffect(() => {
    fetchAnalysis(mode, interval);
  }, [mode, interval, fetchAnalysis]);

  const handleModeChange = (newMode: AnalysisMode) => {
    setMode(newMode);
  };

  const handleIntervalChange = (newInterval: TimeInterval) => {
    setInterval(newInterval);
  };

  // Toggle quick focus tag in selection
  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      if (prev.includes(tag)) {
        return prev.filter((t) => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  // Remove tag chip
  const handleRemoveTag = (tag: string) => {
    setSelectedTags((prev) => prev.filter((t) => t !== tag));
  };

  // Single tag focus click (e.g. from cards or ticker bar)
  const handleTagClick = (tag: string) => {
    // Normalizes abbreviations if needed
    const cleanTag = tag.trim();
    setSelectedTags([cleanTag]);
  };

  // Clear all active filters
  const handleClearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
    setCategory('all');
  };

  // Impact level sorting weight: high (3) -> medium (2) -> low (1)
  const impactOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };

  // Filtered News Items (strictly matching selected asset(s) and query, sorted High -> Medium -> Low)
  const filteredDigestItems = useMemo(() => {
    let items = data?.digestItems || [];

    // Category filter
    if (category !== 'all') {
      items = items.filter((item) => item.category === category);
    }

    // Asset & Search Query matching
    items = filterNewsItems(items, selectedTags, searchQuery);

    // Strictly order High -> Medium -> Low
    return items.sort((a, b) => (impactOrder[b.impactLevel] || 0) - (impactOrder[a.impactLevel] || 0));
  }, [data?.digestItems, category, selectedTags, searchQuery]);

  // Filtered Recommendations (strictly matching selected asset(s), temporal interval, and query, sorted High -> Medium -> Low)
  const filteredRecommendations = useMemo(() => {
    let recs = data?.recommendations || [];

    // Category filter
    if (category !== 'all') {
      recs = recs.filter((rec) => rec.category === category);
    }

    // Asset, Search Query & Temporal Interval matching
    recs = filterRecommendations(recs, selectedTags, searchQuery, interval);

    // Strictly order High -> Medium -> Low
    return recs.sort((a, b) => (impactOrder[b.impactLevel] || 0) - (impactOrder[a.impactLevel] || 0));
  }, [data?.recommendations, category, selectedTags, searchQuery, interval]);

  const intervalLabelsRu: Record<TimeInterval, string> = {
    '10m': 'за последние 10 минут',
    '1h': 'за последний 1 час',
    '1d': 'за последние 24 часа',
    '1w': 'за последнюю неделю',
  };

  const activeMatchesCount = mode === 'digest' ? filteredDigestItems.length : filteredRecommendations.length;

  return (
    <div className="min-h-screen financial-backdrop financial-grid flex flex-col selection:bg-blue-200">
      
      {/* Live Market Ticker Marquee */}
      <TickerBar onSelectTicker={handleTagClick} />

      {/* Main Header & Identity */}
      <Header
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        isLoading={isLoading}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Control Deck (Mode Switcher, Timing Pills, Categories, Search, Refresh, Short Quick Focus tags) */}
        <ControlDeck
          mode={mode}
          onModeChange={handleModeChange}
          interval={interval}
          onIntervalChange={handleIntervalChange}
          category={category}
          onCategoryChange={setCategory}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          onRemoveTag={handleRemoveTag}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          onClearFilters={handleClearFilters}
          onRefresh={() => fetchAnalysis(mode, interval)}
          isLoading={isLoading}
          lastUpdated={data?.generatedAt || null}
          activeMatchesCount={activeMatchesCount}
        />

        {/* Global Market Sentiment & Macro Drivers Banner */}
        {data?.marketSentiment && (
          <MarketSentimentBanner
            sentiment={data.marketSentiment}
            macroDrivers={data.macroDrivers || []}
            intervalText={intervalLabelsRu[interval]}
          />
        )}

        {/* Content Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2">
          <div className="flex items-center space-x-2">
            {mode === 'digest' ? (
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                <Newspaper className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            )}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <span>
                  {mode === 'digest'
                    ? `Дайджест финансовых новостей (${intervalLabelsRu[interval]})`
                    : `Прогноз & Рекомендации по финансовым активам (${intervalLabelsRu[interval]})`}
                </span>
                {selectedTags.length > 0 && (
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-lg bg-blue-100 text-blue-800 border border-blue-200">
                    Фокус: {selectedTags.join(', ')}
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500">
                {mode === 'digest'
                  ? 'Сводка свежих новостей из открытых источников с ссылками на первоисточники'
                  : 'Оценка вероятного направления цен, тактики и рисков по классам активов'}
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500 font-mono flex items-center">
            <span className="font-semibold text-slate-700 mr-1">Найдено:</span>
            <span>
              {activeMatchesCount} позиций
            </span>
          </div>
        </div>

        {/* Error Alert if any */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-4 text-rose-800 text-xs flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={() => fetchAnalysis(mode, interval)}
              className="px-3 py-1 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors cursor-pointer"
            >
              Повторить
            </button>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="bg-white/80 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex justify-between items-center">
                  <div className="h-5 w-24 bg-slate-200 rounded-xl"></div>
                  <div className="h-4 w-16 bg-slate-200 rounded-lg"></div>
                </div>
                <div className="h-6 w-3/4 bg-slate-200 rounded-xl"></div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-200 rounded-md"></div>
                  <div className="h-3 w-5/6 bg-slate-200 rounded-md"></div>
                </div>
                <div className="h-16 w-full bg-slate-100 rounded-2xl"></div>
                <div className="flex justify-between pt-2">
                  <div className="h-4 w-32 bg-slate-200 rounded-lg"></div>
                  <div className="h-7 w-28 bg-slate-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Presentation (Inside Rounded Framed Cards) */}
        {!isLoading && (
          <>
            {/* Mode 1: News Digest Grid */}
            {mode === 'digest' && (
              <>
                {filteredDigestItems.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {filteredDigestItems.map((item) => (
                      <NewsDigestCard
                        key={item.id}
                        item={item}
                        onTagClick={handleTagClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/80 rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                    <SearchX className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800">
                      Новостей по данному активу не найдено
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      Попробуйте выбрать другой временной интервал (например, 1 день или 1 неделю) или сбросить фильтры.
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Сбросить фильтры
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Mode 2: Asset Price Impact & Recommendations */}
            {mode === 'recommendations' && (
              <>
                {filteredRecommendations.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {filteredRecommendations.map((rec) => (
                      <AssetRecommendationCard
                        key={rec.id}
                        rec={rec}
                        onTagClick={handleTagClick}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white/80 rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                    <SearchX className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-slate-800">
                      Рекомендаций по данному активу не найдено
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                      Сбросьте фильтр или выберите другой актив в панели быстрого фокуса.
                    </p>
                    <button
                      onClick={handleClearFilters}
                      className="mt-4 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      Показать все активы
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Verified Open Sources Panel at bottom */}
            {data?.sources && data.sources.length > 0 && (
              <SourcesPanel sources={data.sources} />
            )}
          </>
        )}

      </main>

      {/* Footer */}
      <footer className="w-full bg-white/70 border-t border-slate-200/80 py-6 mt-12 text-xs text-slate-500 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-800">Финансовый Аналитик</span>
            <span>•</span>
            <span>Мониторинг открытых рынков в реальном времени</span>
          </div>

          <div className="flex items-center space-x-4 text-[11px]">
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Методология
            </button>
            <span>•</span>
            <span className="text-slate-400">
              Источники: Reuters, CNBC, Yahoo Finance, Investing, TradingView
            </span>
          </div>
        </div>
      </footer>

      {/* Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      {/* Export Report Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        data={data}
      />

    </div>
  );
}
