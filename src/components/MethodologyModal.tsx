import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertTriangle, Layers, BookOpen, History, Landmark } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Методология финансового анализа & Моделирования
            </h3>
            <p className="text-xs text-slate-500">
              Принципы сбора данных, перевода на русский язык и анализа исторических прецедентов
            </p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
          
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mr-1.5" />
              1. 100% Открытые источники и перевод сути на русский язык
            </h4>
            <p>
              Аналитическая система агрегирует новости исключительно из свободных открытых каналов: 
              <strong> Reuters</strong>, <strong>CNBC</strong>, <strong>Yahoo Finance</strong>, 
              <strong> MarketWatch</strong>, <strong>CoinDesk</strong>, <strong>TradingView</strong>, 
              а также официальных коммюнике регуляторов. Суть новости и выводы для трейдера автоматически 
              переводятся на русский язык с сохранением оригинальных ссылок на первоисточники на языке оригинала.
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center">
              <History className="w-4 h-4 text-purple-600 mr-1.5" />
              2. Анализ исторических прецедентов (10–30+ лет наблюдений)
            </h4>
            <p>
              В разделе рекомендаций опытный финансовый аналитик сопоставляет текущее событие со статистической 
              историей рынков за максимально возможный период наблюдений (реакция активов на циклы пауз и снижений ставок ФРС, 
              поведение золота при падении реальных доходностей, сырьевые шоки, технологические тренды).
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center">
              <Landmark className="w-4 h-4 text-indigo-600 mr-1.5" />
              3. Полный охват 8 валют, центробанков и суверенных бондов
            </h4>
            <ul className="space-y-1 pl-1">
              <li>• <strong>Индексы:</strong> S&P 500, NASDAQ, DOW JONES, DAX 40</li>
              <li>• <strong>Сырье:</strong> Золото (XAU/USD), Серебро (XAG/USD), Нефть Brent & WTI</li>
              <li>• <strong>Криптовалюты:</strong> Bitcoin (BTC), Ethereum (ETH), Solana (SOL), Ripple (XRP)</li>
              <li>• <strong>Forex (8 валют):</strong> EUR/USD, GBP/USD, USD/JPY, USD/CHF, AUD/USD, NZD/USD, USD/CAD, Индекс DXY</li>
              <li>• <strong>Центробанки:</strong> ФРС (Fed), ЕЦБ, Банк Англии (BoE), Банк Японии (BoJ), ШНБ (SNB), РБА (RBA), РБНЗ (RBNZ), Банк Канады (BoC) — ставки, протоколы заседаний и выступления глав</li>
              <li>• <strong>Гособлигации:</strong> Доходности 10Y/2Y US Treasuries, German Bunds, UK Gilts, Japan JGB</li>
            </ul>
          </div>

          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center">
              <CheckCircle2 className="w-4 h-4 text-blue-600 mr-1.5" />
              4. Строгие тайминг-интервалы (10 минут, 1 час, 1 день, 1 неделя)
            </h4>
            <p>
              Каждая новость и рекомендация фильтруется по точному времени появления от текущего момента 
              с приоритетом влияния: сначала Высокое (High), затем Среднее (Medium) и Умеренное (Low).
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-amber-900">
            <h4 className="font-bold text-amber-950 text-sm mb-1 flex items-center">
              <AlertTriangle className="w-4 h-4 text-amber-600 mr-1.5" />
              Предупреждение о рисках (Дисклеймер):
            </h4>
            <p className="text-[11px] leading-relaxed text-amber-800">
              Представленная аналитика и рекомендации носят исключительно информационно-образовательный 
              характер и не являются индивидуальной инвестиционной рекомендацией. Торговля на финансовых рынках 
              сопряжена с высоким риском потери капитала.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-2xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Понятно, закрыть
          </button>
        </div>
      </div>
    </div>
  );
};
