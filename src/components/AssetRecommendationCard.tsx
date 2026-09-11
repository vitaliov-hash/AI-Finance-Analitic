import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Zap, 
  ExternalLink, 
  Target, 
  ShieldAlert, 
  Lightbulb, 
  Flame, 
  Check, 
  Copy,
  Clock,
  History,
  Landmark,
  ShieldCheck
} from 'lucide-react';
import { AssetRecommendation } from '../types';

interface AssetRecommendationCardProps {
  rec: AssetRecommendation;
  onTagClick?: (tag: string) => void;
}

export const AssetRecommendationCard: React.FC<AssetRecommendationCardProps> = ({
  rec,
  onTagClick,
}) => {
  const [copied, setCopied] = useState(false);

  const getDirectionBadge = () => {
    switch (rec.direction) {
      case 'bullish':
        return {
          label: 'Бычий прогноз (Рост)',
          sub: 'Long / Покупки',
          badge: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          icon: <TrendingUp className="w-4 h-4 text-emerald-600 mr-1.5" />,
          accentBorder: 'border-emerald-200',
          indicatorColor: 'bg-emerald-500',
        };
      case 'bearish':
        return {
          label: 'Медвежий прогноз (Снижение)',
          sub: 'Short / Давление продаж',
          badge: 'bg-rose-50 text-rose-800 border-rose-300',
          icon: <TrendingDown className="w-4 h-4 text-rose-600 mr-1.5" />,
          accentBorder: 'border-rose-200',
          indicatorColor: 'bg-rose-500',
        };
      case 'volatile':
        return {
          label: 'Высокая волатильность (Импульс)',
          sub: 'Breakout / Расширение',
          badge: 'bg-amber-50 text-amber-800 border-amber-300',
          icon: <Zap className="w-4 h-4 text-amber-600 mr-1.5" />,
          accentBorder: 'border-amber-200',
          indicatorColor: 'bg-amber-500',
        };
      default:
        return {
          label: 'Нейтральный (Боковик)',
          sub: 'Range / Консолидация',
          badge: 'bg-slate-100 text-slate-800 border-slate-300',
          icon: <Minus className="w-4 h-4 text-slate-600 mr-1.5" />,
          accentBorder: 'border-slate-200',
          indicatorColor: 'bg-slate-400',
        };
    }
  };

  const dir = getDirectionBadge();

  const handleCopy = () => {
    const text = `📊 [Аналитический обзор актива ${rec.ticker} - ${rec.name}]\n` +
      `Прогноз: ${dir.label}\n` +
      `Уверенность: ${rec.confidence}%\n` +
      `Горизонт: ${rec.timeHorizonLabel}\n` +
      `Ключевой новостной драйвер: ${rec.keyDriver}\n` +
      `Исторический паттерн и реакция цен: ${rec.historicalPrecedent}\n` +
      (rec.centralBankContext ? `Центробанки и ставки: ${rec.centralBankContext}\n` : '') +
      (rec.bondYieldImpact ? `Доходности облигаций: ${rec.bondYieldImpact}\n` : '') +
      `Аналитическое обоснование: ${rec.rationale}\n` +
      `Тактика: ${rec.tacticalAdvice}\n` +
      `Риски: ${rec.riskFactors}`;
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border ${dir.accentBorder} shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between relative overflow-hidden`}>
      
      {/* Decorative top accent line */}
      <div className={`absolute top-0 left-0 right-0 h-1.5 ${dir.indicatorColor}`}></div>

      <div>
        {/* Header: Ticker, Name, Direction Badge & Copy */}
        <div className="flex flex-wrap items-start justify-between gap-3 mb-4 pt-1">
          <div>
            <div className="flex items-center space-x-2.5">
              <button
                onClick={() => onTagClick?.(rec.ticker)}
                title={`Оставить только рекомендации и новости по активу ${rec.ticker}`}
                className="px-3 py-1 rounded-xl text-sm font-mono font-bold bg-slate-900 text-white shadow-2xs hover:bg-blue-600 active:scale-95 transition-all cursor-pointer"
              >
                {rec.ticker}
              </button>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                {rec.name}
              </h3>
            </div>
            {rec.currentContext && (
              <p className="text-xs text-slate-600 mt-1 font-medium">
                {rec.currentContext}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {/* Direction Badge */}
            <div className={`inline-flex flex-col items-end px-3 py-1.5 rounded-2xl border text-xs font-bold ${dir.badge}`}>
              <div className="flex items-center">
                {dir.icon}
                <span>{dir.label}</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">{dir.sub}</span>
            </div>

            {/* Quick Copy Action */}
            <button
              onClick={handleCopy}
              title="Скопировать аналитический обзор актива"
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar: Confidence & Horizon & Outlook */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-50/90 rounded-2xl p-3 border border-slate-200/70 mb-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Уверенность оценки:</span>
            <div className="flex items-center space-x-2 mt-0.5">
              <span className="font-bold text-slate-800 font-mono text-xs">{rec.confidence}%</span>
              <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${dir.indicatorColor}`}
                  style={{ width: `${rec.confidence}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Временной горизонт:</span>
            <span className="font-semibold text-slate-800 flex items-center mt-0.5">
              <Clock className="w-3 h-3 text-slate-500 mr-1" />
              {rec.timeHorizonLabel}
            </span>
          </div>

          {rec.targetOutlook && (
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-semibold text-slate-400 block">Целевой диапазон:</span>
              <span className="font-semibold text-indigo-700 font-mono text-xs block truncate mt-0.5">
                {rec.targetOutlook}
              </span>
            </div>
          )}
        </div>

        {/* Structured Insights Grid */}
        <div className="space-y-3">
          {/* 1. Key News Trigger */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5 text-xs">
            <div className="flex items-center justify-between font-bold text-[11px] uppercase tracking-wider text-amber-900 mb-1">
              <div className="flex items-center">
                <Flame className="w-3.5 h-3.5 text-amber-600 mr-1.5" />
                Свежий новостной катализатор:
              </div>
              {rec.catalystPublishedTime && (
                <span className="text-[10px] bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full font-mono font-medium lowercase">
                  новость {rec.catalystPublishedTime}
                </span>
              )}
            </div>
            <p className="text-slate-800 leading-relaxed font-medium">
              {rec.keyDriver}
            </p>
          </div>

          {/* 2. Historical Precedent & Price Reaction (MANDATORY EXPERT SECTION) */}
          <div className="bg-purple-50/60 border border-purple-200/80 rounded-2xl p-3.5 text-xs">
            <div className="flex items-center font-bold text-[11px] uppercase tracking-wider text-purple-950 mb-1">
              <History className="w-3.5 h-3.5 text-purple-700 mr-1.5" />
              Исторический паттерн & Прецеденты реакции цен (Многолетние наблюдения):
            </div>
            <p className="text-slate-800 leading-relaxed font-normal">
              {rec.historicalPrecedent}
            </p>
          </div>

          {/* 3. Central Bank Policy & Protocols (If present) */}
          {rec.centralBankContext && (
            <div className="bg-indigo-50/60 border border-indigo-200/80 rounded-2xl p-3.5 text-xs">
              <div className="flex items-center font-bold text-[11px] uppercase tracking-wider text-indigo-950 mb-1">
                <Landmark className="w-3.5 h-3.5 text-indigo-700 mr-1.5" />
                Монетарная политика центробанков (Ставки, протоколы, заявления):
              </div>
              <p className="text-slate-800 leading-relaxed">
                {rec.centralBankContext}
              </p>
            </div>
          )}

          {/* 4. Sovereign Bond Yield Impact (If present) */}
          {rec.bondYieldImpact && (
            <div className="bg-cyan-50/60 border border-cyan-200/80 rounded-2xl p-3.5 text-xs">
              <div className="flex items-center font-bold text-[11px] uppercase tracking-wider text-cyan-950 mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-700 mr-1.5" />
                Влияние рынка гособлигаций (Доходности & Ставки дисконтирования):
              </div>
              <p className="text-slate-800 leading-relaxed">
                {rec.bondYieldImpact}
              </p>
            </div>
          )}

          {/* 5. Analytical Rationale */}
          <div className="bg-blue-50/60 border border-blue-200/80 rounded-2xl p-3.5 text-xs">
            <div className="flex items-center font-bold text-[11px] uppercase tracking-wider text-blue-900 mb-1">
              <Lightbulb className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
              Аналитическое обоснование опытного аналитика:
            </div>
            <p className="text-slate-800 leading-relaxed">
              {rec.rationale}
            </p>
          </div>

          {/* 6. Tactical Advice */}
          <div className="bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-3.5 text-xs">
            <div className="flex items-center font-bold text-[11px] uppercase tracking-wider text-emerald-900 mb-1">
              <Target className="w-3.5 h-3.5 text-emerald-600 mr-1.5" />
              Тактическая рекомендация (Позиция, точки входа и фиксации):
            </div>
            <p className="text-emerald-950 font-medium leading-relaxed">
              {rec.tacticalAdvice}
            </p>
          </div>

          {/* 7. Risk Factors */}
          <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl p-3.5 text-xs">
            <div className="flex items-center font-bold text-[11px] uppercase tracking-wider text-rose-900 mb-1">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-600 mr-1.5" />
              Факторы риска & Уровень слома торгового сценария:
            </div>
            <p className="text-slate-700 leading-relaxed">
              {rec.riskFactors}
            </p>
          </div>
        </div>
      </div>

      {/* Footer: Verified Sources for this asset */}
      {rec.relatedSources && rec.relatedSources.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[11px] font-medium text-slate-400">
            Подтверждающие первоисточники (язык оригинала):
          </span>
          <div className="flex flex-wrap items-center gap-2">
            {rec.relatedSources.map((src, i) => (
              <a
                key={i}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-[11px] font-semibold text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200/60 hover:bg-blue-100 transition-colors"
              >
                <span>{src.name || src.publisher}</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
