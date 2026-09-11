import React, { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TickerItem {
  tag: string;
  symbol: string;
  name: string;
  price: string;
  change: string;
  isPositive: boolean;
}

interface TickerBarProps {
  onSelectTicker?: (tag: string) => void;
}

const DEFAULT_TICKERS: TickerItem[] = [
  { tag: 'SPX', symbol: 'S&P 500', name: 'SPX', price: '7,677.28', change: '-0.19%', isPositive: false },
  { tag: 'NDX', symbol: 'NASDAQ 100', name: 'NDX', price: '26,151.30', change: '-0.53%', isPositive: false },
  { tag: 'DJI', symbol: 'DOW JONES', name: 'DJI', price: '53,577.40', change: '+0.44%', isPositive: true },
  { tag: 'DAX', symbol: 'DAX 40', name: 'DAX', price: '26,310.84', change: '+0.84%', isPositive: true },
  { tag: 'XAU', symbol: 'GOLD (XAU/USD)', name: 'XAU', price: '$4,678.60', change: '+1.18%', isPositive: true },
  { tag: 'XAG', symbol: 'SILVER (XAG/USD)', name: 'XAG', price: '$68.51', change: '-1.38%', isPositive: false },
  { tag: 'BRENT', symbol: 'BRENT CRUDE', name: 'BRENT', price: '$85.09', change: '-9.85%', isPositive: false },
  { tag: 'WTI', symbol: 'WTI CRUDE', name: 'WTI', price: '$80.34', change: '-7.72%', isPositive: false },
  { tag: 'BTC', symbol: 'BITCOIN', name: 'BTC', price: '$78,725', change: '+2.13%', isPositive: true },
  { tag: 'ETH', symbol: 'ETHEREUM', name: 'ETH', price: '$2,471.06', change: '+1.93%', isPositive: true },
  { tag: 'SOL', symbol: 'SOLANA', name: 'SOL', price: '$97.58', change: '+3.91%', isPositive: true },
  { tag: 'XRP', symbol: 'RIPPLE', name: 'XRP', price: '$1.4306', change: '-2.26%', isPositive: false },
  { tag: 'EUR/USD', symbol: 'EUR/USD', name: 'EUR', price: '1.1667', change: '-0.06%', isPositive: false },
  { tag: 'GBP/USD', symbol: 'GBP/USD', name: 'GBP', price: '1.3622', change: '+0.16%', isPositive: true },
  { tag: 'USD/JPY', symbol: 'USD/JPY', name: 'JPY', price: '159.07', change: '+0.50%', isPositive: true },
  { tag: 'USD/CHF', symbol: 'USD/CHF', name: 'CHF', price: '0.8040', change: '+0.78%', isPositive: true },
  { tag: 'AUD/USD', symbol: 'AUD/USD', name: 'AUD', price: '0.7183', change: '+0.81%', isPositive: true },
  { tag: 'NZD/USD', symbol: 'NZD/USD', name: 'NZD', price: '0.5956', change: '+0.34%', isPositive: true },
  { tag: 'USD/CAD', symbol: 'USD/CAD', name: 'CAD', price: '1.3868', change: '+0.42%', isPositive: true },
  { tag: 'DXY', symbol: 'DXY INDEX', name: 'DXY', price: '99.03', change: '+0.23%', isPositive: true },
  { tag: 'US 10Y', symbol: 'US 10Y', name: 'US 10Y', price: '4.639%', change: '-0.30%', isPositive: false },
  { tag: 'Bund 10Y', symbol: 'BUND 10Y', name: 'Bund 10Y', price: '2.455%', change: '-0.42%', isPositive: false },
  { tag: 'Gilt 10Y', symbol: 'GILT 10Y', name: 'Gilt 10Y', price: '4.352%', change: '+0.15%', isPositive: true },
  { tag: 'JGB 10Y', symbol: 'JGB 10Y', name: 'JGB 10Y', price: '1.145%', change: '+0.08%', isPositive: true },
];

export const TickerBar: React.FC<TickerBarProps> = ({ onSelectTicker }) => {
  const [tickers, setTickers] = useState<TickerItem[]>(DEFAULT_TICKERS);

  useEffect(() => {
    async function loadQuotes() {
      try {
        const res = await fetch('/api/live-quotes');
        if (!res.ok) return;
        const data = await res.json();
        
        const list: TickerItem[] = [];

        const addIf = (key: string, tag: string, symbol: string, name: string, isPercent = false, decimals = 2, isPriceSymbol = '$') => {
          const item = data[key];
          if (item && typeof item.price === 'number') {
            const formattedPrice = isPercent
              ? `${item.price.toFixed(3)}%`
              : decimals === 4
              ? item.price.toFixed(4)
              : isPriceSymbol === '$'
              ? `$${item.price.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
              : item.price.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });

            list.push({
              tag,
              symbol,
              name,
              price: formattedPrice,
              change: `${item.changePct >= 0 ? '+' : ''}${item.changePct.toFixed(2)}%`,
              isPositive: item.changePct >= 0,
            });
          }
        };

        // Stock Indices
        addIf('SPX', 'SPX', 'S&P 500', 'SPX', false, 2, '');
        addIf('NASDAQ', 'NDX', 'NASDAQ 100', 'NDX', false, 2, '');
        addIf('DOW', 'DJI', 'DOW JONES', 'DJI', false, 2, '');
        addIf('DAX', 'DAX', 'DAX 40', 'DAX', false, 2, '');

        // Commodities
        addIf('GOLD', 'XAU', 'GOLD (XAU/USD)', 'XAU', false, 2, '$');
        addIf('SILVER', 'XAG', 'SILVER (XAG/USD)', 'XAG', false, 2, '$');
        addIf('BRENT', 'BRENT', 'BRENT CRUDE', 'BRENT', false, 2, '$');
        addIf('WTI', 'WTI', 'WTI CRUDE', 'WTI', false, 2, '$');

        // Crypto
        addIf('BTC', 'BTC', 'BITCOIN', 'BTC', false, 0, '$');
        addIf('ETH', 'ETH', 'ETHEREUM', 'ETH', false, 2, '$');
        addIf('SOL', 'SOL', 'SOLANA', 'SOL', false, 2, '$');
        addIf('XRP', 'XRP', 'RIPPLE', 'XRP', false, 4, '$');

        // Forex Major 8
        addIf('EURUSD', 'EUR/USD', 'EUR/USD', 'EUR', false, 4, '');
        addIf('GBPUSD', 'GBP/USD', 'GBP/USD', 'GBP', false, 4, '');
        addIf('USDJPY', 'USD/JPY', 'USD/JPY', 'JPY', false, 2, '');
        addIf('USDCHF', 'USD/CHF', 'USD/CHF', 'CHF', false, 4, '');
        addIf('AUDUSD', 'AUD/USD', 'AUD/USD', 'AUD', false, 4, '');
        addIf('NZDUSD', 'NZD/USD', 'NZD/USD', 'NZD', false, 4, '');
        addIf('USDCAD', 'USD/CAD', 'USD/CAD', 'CAD', false, 4, '');
        addIf('DXY', 'DXY', 'DXY INDEX', 'DXY', false, 2, '');

        // Sovereign Bonds
        addIf('US10Y', 'US 10Y', 'US 10Y', 'US 10Y', true);
        addIf('BUND10Y', 'Bund 10Y', 'BUND 10Y', 'Bund 10Y', true);
        addIf('GILT10Y', 'Gilt 10Y', 'GILT 10Y', 'Gilt 10Y', true);
        addIf('JGB10Y', 'JGB 10Y', 'JGB 10Y', 'JGB 10Y', true);

        if (list.length > 0) {
          setTickers(list);
        }
      } catch (err) {
        console.error('Failed to load live quotes ticker', err);
      }
    }

    loadQuotes();
    const intervalId = setInterval(loadQuotes, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full bg-slate-950 text-slate-200 border-b border-slate-800 text-xs overflow-hidden select-none py-1.5 shadow-inner">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Double the list for seamless marquee loop */}
        {[...tickers, ...tickers].map((item, idx) => (
          <button
            key={idx}
            onClick={() => onSelectTicker?.(item.tag)}
            className="inline-flex items-center space-x-2 px-4 border-r border-slate-800/80 transition-colors hover:bg-slate-900 cursor-pointer"
            title={`Фильтровать по ${item.tag}`}
          >
            <span className="font-semibold text-slate-100">{item.symbol}</span>
            <span className="text-slate-300 font-mono font-medium">{item.price}</span>
            <span
              className={`inline-flex items-center font-medium font-mono text-[11px] ${
                item.isPositive ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {item.isPositive ? (
                <TrendingUp className="w-3 h-3 mr-0.5" />
              ) : (
                <TrendingDown className="w-3 h-3 mr-0.5" />
              )}
              {item.change}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
