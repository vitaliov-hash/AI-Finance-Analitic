import React from 'react';
import { Activity, ShieldCheck, Download, HelpCircle, Globe, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenMethodology: () => void;
  onOpenExport: () => void;
  isLoading: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenMethodology,
  onOpenExport,
  isLoading,
}) => {
  return (
    <header className="relative w-full overflow-hidden border-b border-slate-200/80 bg-white/75 backdrop-blur-md shadow-xs">
      {/* Background Graphic Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
        <svg
          className="absolute -right-12 -bottom-6 w-96 h-48 text-blue-100/60 chart-watermark"
          viewBox="0 0 400 150"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M0 120 Q 50 100, 100 110 T 200 60 T 300 75 T 400 20 L 400 150 L 0 150 Z" fill="currentColor" fillOpacity="0.3" />
          <path d="M0 120 Q 50 100, 100 110 T 200 60 T 300 75 T 400 20" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Main Title & Identity */}
          <div className="flex items-start space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 ring-4 ring-blue-50">
              <Activity className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-sans">
                  Финансовый Аналитик
                </h1>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-ping"></span>
                  Real-Time Wire
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                Мониторинг открытых мировых новостей и оценка их влияния на цены финансовых активов
              </p>
            </div>
          </div>

          {/* Action Tools & Verified Sources Info */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* Open Sources Tag */}
            <div className="hidden lg:flex items-center space-x-1.5 text-xs text-slate-500 bg-slate-100/90 px-3 py-1.5 rounded-xl border border-slate-200/80">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Reuters • CNBC • Yahoo Finance • Investing • TradingView</span>
            </div>

            {/* Methodology Modal Trigger */}
            <button
              onClick={onOpenMethodology}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-all active:scale-98 cursor-pointer"
              title="Методология аналитики и источники"
            >
              <HelpCircle className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Методология</span>
            </button>

            {/* Export Briefing */}
            <button
              onClick={onOpenExport}
              disabled={isLoading}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-2xs hover:shadow-xs transition-all active:scale-98 cursor-pointer disabled:opacity-50"
              title="Экспорт отчета"
            >
              <Download className="w-4 h-4 text-blue-600" />
              <span>Экспорт</span>
            </button>
          </div>
        </div>

        {/* Market Sessions Strip */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center space-x-4">
            <span className="font-medium text-slate-700 flex items-center">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
              Торговые сессии:
            </span>
            <div className="flex items-center space-x-3 text-[11px]">
              <span className="inline-flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                Лондон (LSE): <strong className="ml-1 text-slate-700">Активна</strong>
              </span>
              <span className="inline-flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                Нью-Йорк (NYSE): <strong className="ml-1 text-slate-700">Активна</strong>
              </span>
              <span className="inline-flex items-center">
                <span className="w-2 h-2 rounded-full bg-slate-300 mr-1"></span>
                Токио (TSE): <span className="ml-1 text-slate-400">Закрыта</span>
              </span>
            </div>
          </div>

          <div className="inline-flex items-center text-[11px] text-slate-500 bg-blue-50/70 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-100">
            <ShieldCheck className="w-3 h-3 mr-1 text-blue-600" />
            100% открытые финансовые источники без платных подписок
          </div>
        </div>

      </div>
    </header>
  );
};
