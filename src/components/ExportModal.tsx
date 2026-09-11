import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: AnalysisResult | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, data }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !data) return null;

  const intervalRu: Record<string, string> = {
    '10m': 'за последние 10 минут',
    '1h': 'за последний 1 час',
    '1d': 'за последние 24 часа (1 день)',
    '1w': 'за последнюю 1 неделю',
  };

  const currentIntervalText = intervalRu[data.interval] || data.interval;

  // Generate formatted markdown / telegram brief
  const generateReportText = () => {
    let report = `📊 **ФИНАНСОВЫЙ ДАЙДЖЕСТ & РЕКОМЕНДАЦИИ ПО АКТИВАМ**\n`;
    report += `⏱️ Тайминг новостей: ${currentIntervalText}\n`;
    report += `📅 Дата формирования: ${new Date(data.generatedAt).toLocaleString('ru-RU')}\n`;
    report += `🧭 Сентимент рынка: ${data.marketSentiment.label} (${data.marketSentiment.score}/100)\n`;
    report += `💡 Обзор: ${data.marketSentiment.summary}\n\n`;

    if (data.macroDrivers && data.macroDrivers.length > 0) {
      report += `🔥 **Главные макроэкономические драйверы & Центробанки:**\n`;
      data.macroDrivers.forEach((d) => {
        report += `• ${d}\n`;
      });
      report += `\n`;
    }

    if (data.mode === 'digest' && data.digestItems.length > 0) {
      report += `📰 **КЛЮЧЕВЫЕ НОВОСТИ ПЕРИОДА (ПЕРЕВОД СУТИ НА РУССКИЙ ЯЗЫК):**\n\n`;
      data.digestItems.forEach((item, idx) => {
        report += `${idx + 1}. **${item.title}** (${item.publishedTime})\n`;
        report += `   📝 ${item.summary}\n`;
        if (item.centralBankReference) {
          report += `   🏛️ ${item.centralBankReference}\n`;
        }
        report += `   🎯 Суть и вывод: ${item.keyTakeaway}\n`;
        report += `   🏷️ Активы: ${item.relatedAssets.join(', ')}\n`;
        report += `   🔗 Первоисточник (оригинал): ${item.source.publisher || item.source.name} (${item.source.url})\n\n`;
      });
    }

    if (data.mode === 'recommendations' && data.recommendations.length > 0) {
      report += `📈 **АНАЛИТИКА & РЕКОМЕНДАЦИИ ПО ФИНАНСОВЫМ АКТИВАМ:**\n\n`;
      data.recommendations.forEach((rec, idx) => {
        report += `${idx + 1}. **[${rec.ticker}] ${rec.name}**\n`;
        report += `   📌 Прогноз: ${rec.direction.toUpperCase()} | Уверенность: ${rec.confidence}% | Горизонт: ${rec.timeHorizonLabel}\n`;
        report += `   ⚡ Свежий драйвер: ${rec.keyDriver}\n`;
        report += `   📜 Исторический паттерн: ${rec.historicalPrecedent}\n`;
        if (rec.centralBankContext) {
          report += `   🏛️ Центробанки: ${rec.centralBankContext}\n`;
        }
        if (rec.bondYieldImpact) {
          report += `   📉 Гособлигации: ${rec.bondYieldImpact}\n`;
        }
        report += `   💡 Обоснование: ${rec.rationale}\n`;
        report += `   🎯 Тактика: ${rec.tacticalAdvice}\n`;
        report += `   ⚠️ Риски: ${rec.riskFactors}\n\n`;
      });
    }

    report += `\nℹ️ Первоисточники: Reuters, CNBC, Yahoo Finance, Investing.com, TradingView, MarketWatch (100% открытые данные без paywall).`;
    return report;
  };

  const reportContent = generateReportText();

  const handleCopy = () => {
    navigator.clipboard.writeText(reportContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `financial_digest_${data.interval}_${Date.now()}.md`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-3xl bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] flex flex-col">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Экспорт аналитической сводки
            </h3>
            <p className="text-xs text-slate-500">
              Форматированный отчет для Telegram, трейдинг-каналов или личного архива
            </p>
          </div>
        </div>

        {/* Textarea preview */}
        <div className="flex-1 min-h-[260px] max-h-[380px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3 my-2">
          <textarea
            readOnly
            value={reportContent}
            className="w-full h-full bg-transparent text-xs font-mono text-slate-800 resize-none focus:outline-none leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-slate-400">
            Готово к публикации в Markdown / Telegram
          </span>

          <div className="flex items-center space-x-2.5">
            <button
              onClick={handleDownload}
              className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-all cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Скачать .MD файл</span>
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all active:scale-97 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>Скопировано в буфер!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Скопировать текст</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
