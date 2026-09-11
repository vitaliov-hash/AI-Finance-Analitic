import React from 'react';
import { 
  Newspaper, 
  TrendingUp, 
  Clock, 
  Search, 
  RefreshCw, 
  SlidersHorizontal,
  Layers,
  Coins,
  DollarSign,
  Flame,
  LineChart,
  Landmark,
  ShieldCheck,
  X,
  Sparkles,
  Filter
} from 'lucide-react';
import { AnalysisMode, TimeInterval, AssetCategory } from '../types';
import { QUICK_TAGS } from '../utils/assetMatcher';

interface ControlDeckProps {
  mode: AnalysisMode;
  onModeChange: (mode: AnalysisMode) => void;
  interval: TimeInterval;
  onIntervalChange: (interval: TimeInterval) => void;
  category: AssetCategory;
  onCategoryChange: (category: AssetCategory) => void;
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onClearFilters: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  lastUpdated: string | null;
  activeMatchesCount?: number;
}

const INTERVALS: { id: TimeInterval; label: string; subtext: string; icon: string }[] = [
  { id: '10m', label: '10 минут', subtext: 'Свежие вспышки & импульсы', icon: '⏱️' },
  { id: '1h', label: '1 час', subtext: 'Внутридневная сессия', icon: '⏳' },
  { id: '1d', label: '1 день (24ч)', subtext: 'Суточные макро-релизы', icon: '📅' },
  { id: '1w', label: '1 неделя', subtext: 'Свинг & тренды недели', icon: '📆' },
];

const CATEGORIES: { id: AssetCategory; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'Все рынки', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'stocks', label: 'Индексы & Акции (SPX, NDX, DJI, DAX)', icon: <LineChart className="w-3.5 h-3.5" /> },
  { id: 'commodities', label: 'Сырье (XAU, XAG, BRENT, WTI)', icon: <Flame className="w-3.5 h-3.5" /> },
  { id: 'crypto', label: 'Крипто (BTC, ETH, SOL, XRP)', icon: <Coins className="w-3.5 h-3.5" /> },
  { id: 'forex', label: 'Forex 8 валют (EUR, GBP, JPY, CHF, AUD, NZD, CAD, DXY)', icon: <DollarSign className="w-3.5 h-3.5" /> },
  { id: 'central_banks', label: 'ЦБ, Протоколы & Ставки (ФРС, ЕЦБ, BoE, BoJ...)', icon: <Landmark className="w-3.5 h-3.5" /> },
  { id: 'bonds', label: 'Доходности гособлигаций (US, Bund, Gilt, JGB)', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
];

export const ControlDeck: React.FC<ControlDeckProps> = ({
  mode,
  onModeChange,
  interval,
  onIntervalChange,
  category,
  onCategoryChange,
  selectedTags,
  onToggleTag,
  onRemoveTag,
  searchQuery,
  onSearchQueryChange,
  onClearFilters,
  onRefresh,
  isLoading,
  lastUpdated,
  activeMatchesCount,
}) => {
  const hasActiveFilters = selectedTags.length > 0 || searchQuery.trim().length > 0 || category !== 'all';

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm transition-all">
      {/* 1. Top Section: Primary Mode Switcher & Refresh Button */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-5 border-b border-slate-100">
        
        {/* Mode Switcher Tabs */}
        <div className="inline-flex p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200 shadow-inner w-full sm:w-auto">
          <button
            id="mode-tab-digest"
            onClick={() => onModeChange('digest')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
              mode === 'digest'
                ? 'bg-white text-blue-700 shadow-xs ring-1 ring-black/5 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Newspaper className="w-4 h-4 text-blue-600" />
            <span>Дайджест новостей (Перевод на русский)</span>
          </button>

          <button
            id="mode-tab-recommendations"
            onClick={() => onModeChange('recommendations')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer ${
              mode === 'recommendations'
                ? 'bg-white text-emerald-700 shadow-xs ring-1 ring-black/5 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Рекомендации аналитика & Исторические паттерны</span>
          </button>
        </div>

        {/* Refresh & Timestamp */}
        <div className="flex items-center justify-between sm:justify-end space-x-3">
          {lastUpdated && (
            <div className="text-xs text-slate-500 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-slate-400" />
              <span>Обновлено: {new Date(lastUpdated).toLocaleTimeString('ru-RU')}</span>
            </div>
          )}

          <button
            id="btn-refresh-online"
            onClick={onRefresh}
            disabled={isLoading}
            className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 shadow-md shadow-blue-500/20 active:scale-97 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Анализируем рынки...' : 'Обновить онлайн'}</span>
          </button>
        </div>
      </div>

      {/* 2. Timing / Interval Selector */}
      <div className="pt-5">
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
            Временной интервал новостей (Строгая фильтрация по времени):
          </label>
          <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
            {mode === 'digest' ? 'Точный возраст публикации' : 'Оценка катализаторов за период'}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
          {INTERVALS.map((item) => {
            const isSelected = interval === item.id;
            return (
              <button
                key={item.id}
                id={`interval-btn-${item.id}`}
                onClick={() => onIntervalChange(item.id)}
                className={`relative flex flex-col items-start p-3 sm:p-3.5 rounded-2xl border text-left transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-400/80 shadow-xs ring-2 ring-blue-500/20 text-blue-950'
                    : 'bg-white/60 hover:bg-white border-slate-200/90 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-1.5 w-full">
                  <span className="text-base">{item.icon}</span>
                  <span className="font-bold text-sm tracking-tight">{item.label}</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1 leading-snug">
                  {item.subtext}
                </span>
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Category Filter Tabs */}
      <div className="pt-4 mt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 flex items-center">
            <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
            Категория активов и сегменты макроэкономики:
          </label>
        </div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                id={`category-btn-${cat.id}`}
                onClick={() => onCategoryChange(cat.id)}
                className={`inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100/90 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900 border border-slate-200/60'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Selected Assets & Search Box */}
      <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
        
        {/* Search & Active Assets Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          
          {/* Main search and chip input wrapper */}
          <div className="relative flex-1 flex flex-wrap items-center gap-1.5 min-h-[44px] p-1.5 pl-3 rounded-2xl bg-slate-50/90 border border-slate-200/90 focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 focus-within:bg-white transition-all">
            <Search className="w-4 h-4 text-slate-400 shrink-0 mr-1" />
            
            {/* Selected Asset Chips (prominent, 2-3 readable chips with individual close buttons) */}
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-xs animate-in fade-in zoom-in-95 duration-150"
              >
                <span>{tag}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveTag(tag);
                  }}
                  className="p-0.5 rounded-md hover:bg-blue-700 transition-colors cursor-pointer text-blue-100 hover:text-white"
                  title={`Удалить фильтр ${tag}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}

            {/* Live typed text input */}
            <input
              id="search-active-input"
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder={selectedTags.length > 0 ? "Добавьте ключевое слово или выберите еще актив..." : "Поиск по активу, регулятору или событию (например: WTI, JGB 10Y, AUD/USD)..."}
              className="flex-1 min-w-[140px] bg-transparent border-none outline-none text-xs text-slate-900 placeholder:text-slate-400 py-1"
            />

            {/* Clear All Button inside input */}
            {(selectedTags.length > 0 || searchQuery) && (
              <button
                id="btn-clear-search-tags"
                onClick={onClearFilters}
                className="shrink-0 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-200/60 transition-all cursor-pointer"
                title="Очистить все выбранные активы и поиск"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Reset button when filters are active */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="shrink-0 inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5 text-slate-500" />
              <span>Сбросить фильтр</span>
            </button>
          )}
        </div>

        {/* Filter status banner */}
        {selectedTags.length > 0 && (
          <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-800">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>
                Активный фокус: <strong className="font-semibold text-blue-900">{selectedTags.join(', ')}</strong> — отображаются <strong>только</strong> новости и рекомендации по выбранным активам
              </span>
            </div>
            {typeof activeMatchesCount === 'number' && (
              <span className="font-semibold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-md text-[11px]">
                Найдено: {activeMatchesCount}
              </span>
            )}
          </div>
        )}

        {/* 5. Short Abbreviation Quick Focus Buttons */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Быстрый фокус (краткие аббревиатуры — нажмите для фильтрации):
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {QUICK_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  id={`quick-focus-${tag.replace(/[^a-zA-Z0-9]/g, '_')}`}
                  onClick={() => onToggleTag(tag)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs ring-2 ring-blue-500/30'
                      : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200 hover:text-slate-900 border border-slate-200/70 active:scale-95'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
