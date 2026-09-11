import React from 'react';
import { Compass, Gauge, AlertCircle, TrendingUp, TrendingDown, Zap, BarChart2 } from 'lucide-react';
import { MarketSentiment } from '../types';

interface MarketSentimentBannerProps {
  sentiment: MarketSentiment;
  macroDrivers: string[];
  intervalText: string;
}

export const MarketSentimentBanner: React.FC<MarketSentimentBannerProps> = ({
  sentiment,
  macroDrivers,
  intervalText,
}) => {
  const getToneBadge = () => {
    switch (sentiment.tone) {
      case 'bullish':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: <TrendingUp className="w-4 h-4 text-emerald-600 mr-1.5" />,
          progress: 'bg-emerald-500',
        };
      case 'bearish':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: <TrendingDown className="w-4 h-4 text-rose-600 mr-1.5" />,
          progress: 'bg-rose-500',
        };
      case 'volatile':
        return {
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: <Zap className="w-4 h-4 text-amber-600 mr-1.5" />,
          progress: 'bg-amber-500',
        };
      default:
        return {
          bg: 'bg-slate-50 text-slate-800 border-slate-200',
          icon: <Gauge className="w-4 h-4 text-slate-600 mr-1.5" />,
          progress: 'bg-blue-500',
        };
    }
  };

  const toneConfig = getToneBadge();

  return (
    <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm relative overflow-hidden">
      {/* Accent corner ambient light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center relative z-10">
        
        {/* Left Column: Sentiment Gauge & Score */}
        <div className="lg:col-span-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center">
              <Compass className="w-3.5 h-3.5 mr-1 text-blue-600" />
              Рыночный сентимент ({intervalText})
            </span>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
              {sentiment.score} / 100
            </span>
          </div>

          <div className="my-3">
            <div className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-bold border ${toneConfig.bg}`}>
              {toneConfig.icon}
              <span>{sentiment.label}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1 font-mono">
              <span>0 (Медвежий)</span>
              <span>50 (Нейтрально)</span>
              <span>100 (Бычий)</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/80">
              <div
                className={`h-full rounded-full transition-all duration-500 ${toneConfig.progress}`}
                style={{ width: `${Math.min(Math.max(sentiment.score, 5), 100)}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Center & Right Column: Market Mood Summary & Macro Drivers */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center mb-1.5">
              <BarChart2 className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              Краткий обзор конъюнктуры:
            </span>
            <p className="text-sm text-slate-700 leading-relaxed font-normal">
              {sentiment.summary}
            </p>
          </div>

          {/* Macro Drivers Chips */}
          {macroDrivers && macroDrivers.length > 0 && (
            <div className="mt-3.5 pt-3 border-t border-slate-100">
              <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center">
                <AlertCircle className="w-3 h-3 text-amber-500 mr-1" />
                Главные драйверы рынка:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {macroDrivers.map((driver, idx) => (
                  <div
                    key={idx}
                    className="flex items-start space-x-1.5 text-xs text-slate-600 bg-slate-50/80 px-2.5 py-1.5 rounded-xl border border-slate-200/60"
                  >
                    <span className="text-blue-500 font-bold text-[11px] leading-tight">•</span>
                    <span className="leading-tight text-[11px]">{driver}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
