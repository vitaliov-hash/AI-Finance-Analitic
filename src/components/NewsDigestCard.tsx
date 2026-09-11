import React from 'react';
import { ExternalLink, Clock, AlertTriangle, ArrowRight, Tag, Landmark } from 'lucide-react';
import { NewsDigestItem } from '../types';
import { ensureRussianText } from '../utils/russianTranslator';

interface NewsDigestCardProps {
  item: NewsDigestItem;
  onTagClick?: (tag: string) => void;
}

export const NewsDigestCard: React.FC<NewsDigestCardProps> = ({ item, onTagClick }) => {
  const displayTitle = ensureRussianText(item.title, item.relatedAssets?.[0]);
  const displaySummary = ensureRussianText(item.summary, item.relatedAssets?.[0]);

  const getImpactBadge = () => {
    switch (item.impactLevel) {
      case 'high':
        return {
          label: 'Высокое влияние (High)',
          badge: 'bg-rose-50 text-rose-700 border-rose-200',
        };
      case 'medium':
        return {
          label: 'Среднее влияние (Medium)',
          badge: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case 'low':
        return {
          label: 'Умеренное влияние (Low)',
          badge: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  const impact = getImpactBadge();

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case 'stocks': return 'Индексы & Акции';
      case 'forex': return 'Forex / 8 валют';
      case 'commodities': return 'Сырье & Металлы';
      case 'crypto': return 'Криптовалюты';
      case 'central_banks': return 'Центробанки & Ставки';
      case 'bonds': return 'Доходности облигаций';
      default: return 'Макроэкономика';
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Meta Header: Source, Time, Impact */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center space-x-2">
            {/* Publisher Badge */}
            <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-900 text-white shadow-2xs">
              {item.source.publisher || item.source.name}
            </span>

            {/* Category */}
            <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/60">
              {getCategoryLabel(item.category)}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Time */}
            <span className="inline-flex items-center text-xs text-slate-500 font-mono font-medium">
              <Clock className="w-3 h-3 mr-1 text-slate-400" />
              {item.publishedTime}
            </span>

            {/* Impact */}
            <span className={`inline-flex items-center text-[11px] font-semibold px-2 py-0.5 rounded-full border ${impact.badge}`}>
              {item.impactLevel === 'high' && <AlertTriangle className="w-3 h-3 mr-1 text-rose-600" />}
              {impact.label}
            </span>
          </div>
        </div>

        {/* Headline (in Russian) */}
        <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2.5">
          {displayTitle}
        </h3>

        {/* Summary Essence (in Russian) */}
        <p className="text-sm text-slate-700 leading-relaxed mb-4">
          {displaySummary}
        </p>

        {/* Central Bank Reference badge if present */}
        {item.centralBankReference && (
          <div className="bg-indigo-50/70 border border-indigo-100/90 rounded-2xl p-2.5 mb-3 text-xs text-indigo-950 flex items-center space-x-2">
            <Landmark className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
            <span className="font-medium">{item.centralBankReference}</span>
          </div>
        )}

        {/* Key Takeaway Box */}
        {item.keyTakeaway && (
          <div className="bg-blue-50/70 border border-blue-100/90 rounded-2xl p-3.5 mb-4 text-xs text-blue-950">
            <div className="font-bold text-[11px] uppercase tracking-wider text-blue-800 mb-1 flex items-center">
              <ArrowRight className="w-3 h-3 mr-1 text-blue-600" />
              Суть и значение для трейдера:
            </div>
            <p className="leading-relaxed text-slate-800">
              {item.keyTakeaway}
            </p>
          </div>
        )}
      </div>

      {/* Footer: Related Asset Tags & Outbound Link */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        {/* Related Assets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <Tag className="w-3 h-3 text-slate-400" />
          {item.relatedAssets.map((asset, i) => (
            <button
              key={i}
              onClick={() => onTagClick?.(asset)}
              className="text-[11px] font-medium bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
            >
              {asset}
            </button>
          ))}
        </div>

        {/* Outbound Link Button to original source (original language) */}
        {item.source.url && (
          <a
            href={item.source.url}
            target="_blank"
            rel="noopener noreferrer"
            title="Открыть полную статью на сайте первоисточника на языке оригинала"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100/80 transition-all active:scale-97 cursor-pointer"
          >
            <span>Первоисточник ({item.source.publisher || item.source.name})</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};
