import React from 'react';
import { Globe, ExternalLink, ShieldCheck } from 'lucide-react';
import { SourceLink } from '../types';

interface SourcesPanelProps {
  sources: SourceLink[];
}

export const SourcesPanel: React.FC<SourcesPanelProps> = ({ sources }) => {
  return (
    <div className="w-full bg-white/80 backdrop-blur-md rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-blue-600" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Использованные открытые новостные источники (Без платных подписок)
          </h4>
        </div>
        <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center w-fit">
          <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" />
          Проверено в реальном времени
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/80 hover:bg-blue-50/70 border border-slate-200/70 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition-all duration-150 group"
          >
            <div className="flex items-center space-x-2 truncate">
              <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
              <span className="text-xs font-medium truncate group-hover:underline">
                {source.title}
              </span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 ml-2" />
          </a>
        ))}
      </div>
    </div>
  );
};
