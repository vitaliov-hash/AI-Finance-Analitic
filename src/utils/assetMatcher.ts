import { NewsDigestItem, AssetRecommendation } from '../types';

export interface AssetDefinition {
  tag: string;
  label: string;
  category: 'stocks' | 'forex' | 'commodities' | 'crypto' | 'bonds' | 'central_banks';
  tickers: string[];
  keywords: string[];
}

export const ASSET_DEFINITIONS: AssetDefinition[] = [
  // Stock Indices
  {
    tag: 'SPX',
    label: 'S&P 500',
    category: 'stocks',
    tickers: ['spx', 's&p 500', '^gspc', 's&p'],
    keywords: ['s&p 500', 'spx', 's&p', 'индекс s&p', 'standard & poor'],
  },
  {
    tag: 'NDX',
    label: 'NASDAQ 100',
    category: 'stocks',
    tickers: ['ndx', 'nasdaq', '^ixic', 'nasdaq 100'],
    keywords: ['nasdaq', 'ndx', 'насдак', 'индекс nasdaq', 'технологический сектор'],
  },
  {
    tag: 'DJI',
    label: 'Dow Jones (DJI)',
    category: 'stocks',
    tickers: ['dji', 'dow', '^dji', 'dow jones'],
    keywords: ['dow jones', 'dji', 'доу джонс', 'доу-джонс', 'промышленный индекс доу', 'индекс dji'],
  },
  {
    tag: 'DAX',
    label: 'DAX 40',
    category: 'stocks',
    tickers: ['dax', '^gdaxi', 'dax 40'],
    keywords: ['dax', 'дакс', 'dax 40', 'немецкий индекс dax', 'фондовый рынок германии'],
  },

  // Commodities
  {
    tag: 'XAU',
    label: 'Gold (XAU/USD)',
    category: 'commodities',
    tickers: ['xau', 'gold', 'gc=f', 'xau/usd', 'золото'],
    keywords: ['xau', 'золот', 'spot gold', 'тройскую унцию', 'золота', 'золоту'],
  },
  {
    tag: 'XAG',
    label: 'Silver (XAG/USD)',
    category: 'commodities',
    tickers: ['xag', 'silver', 'si=f', 'xag/usd', 'серебро'],
    keywords: ['xag', 'серебр', 'spot silver', 'серебра', 'серебру'],
  },
  {
    tag: 'BRENT',
    label: 'Brent Crude',
    category: 'commodities',
    tickers: ['brent', 'bz=f', 'brent crude'],
    keywords: ['brent', 'брент', 'нефть brent', 'нефти brent'],
  },
  {
    tag: 'WTI',
    label: 'WTI Crude',
    category: 'commodities',
    tickers: ['wti', 'cl=f', 'wti crude'],
    keywords: ['wti', 'вти', 'техасск', 'нефть wti', 'нефти wti', 'crude wti', 'кушинг'],
  },

  // Crypto
  {
    tag: 'BTC',
    label: 'Bitcoin (BTC)',
    category: 'crypto',
    tickers: ['btc', 'bitcoin', 'btc-usd', 'btc/usd'],
    keywords: ['btc', 'bitcoin', 'биткоин', 'биткойн', 'биткоина', 'btc-etf'],
  },
  {
    tag: 'ETH',
    label: 'Ethereum (ETH)',
    category: 'crypto',
    tickers: ['eth', 'ethereum', 'eth-usd', 'eth/usd'],
    keywords: ['eth', 'ethereum', 'эфириум', 'эфир', 'эфира'],
  },
  {
    tag: 'SOL',
    label: 'Solana (SOL)',
    category: 'crypto',
    tickers: ['sol', 'solana', 'sol-usd', 'sol/usd'],
    keywords: ['solana', 'солана', 'соланы', 'солану', 'соланой', 'токен sol', 'sol/usd'],
  },
  {
    tag: 'XRP',
    label: 'Ripple (XRP)',
    category: 'crypto',
    tickers: ['xrp', 'ripple', 'xrp-usd', 'xrp/usd'],
    keywords: ['xrp', 'ripple', 'риппл', 'рипл', 'риппла', 'токен xrp', 'xrp/usd'],
  },

  // Forex Major 8
  {
    tag: 'EUR/USD',
    label: 'EUR/USD',
    category: 'forex',
    tickers: ['eur/usd', 'eurusd', 'eurusd=x', 'eur'],
    keywords: ['eur/usd', 'eurusd', 'евро/доллар', 'евро против доллара', 'курс евро'],
  },
  {
    tag: 'GBP/USD',
    label: 'GBP/USD',
    category: 'forex',
    tickers: ['gbp/usd', 'gbpusd', 'gbpusd=x', 'gbp'],
    keywords: ['gbp/usd', 'gbpusd', 'фунт/доллар', 'фунт стерлингов', 'кабель'],
  },
  {
    tag: 'USD/JPY',
    label: 'USD/JPY',
    category: 'forex',
    tickers: ['usd/jpy', 'usdjpy', 'usdjpy=x', 'jpy'],
    keywords: ['usd/jpy', 'usdjpy', 'доллар/иена', 'доллар к иене', 'курс иены', 'японская иена'],
  },
  {
    tag: 'USD/CHF',
    label: 'USD/CHF',
    category: 'forex',
    tickers: ['usd/chf', 'usdchf', 'usdchf=x', 'chf'],
    keywords: ['usd/chf', 'usdchf', 'доллар/франк', 'доллар к франку', 'швейцарский франк'],
  },
  {
    tag: 'AUD/USD',
    label: 'AUD/USD',
    category: 'forex',
    tickers: ['aud/usd', 'audusd', 'audusd=x', 'aud'],
    keywords: ['aud/usd', 'audusd', 'австралийский доллар', 'осси', 'курс aud'],
  },
  {
    tag: 'NZD/USD',
    label: 'NZD/USD',
    category: 'forex',
    tickers: ['nzd/usd', 'nzdusd', 'nzdusd=x', 'nzd'],
    keywords: ['nzd/usd', 'nzdusd', 'новозеландский доллар', 'киви', 'курс nzd'],
  },
  {
    tag: 'USD/CAD',
    label: 'USD/CAD',
    category: 'forex',
    tickers: ['usd/cad', 'usdcad', 'usdcad=x', 'cad'],
    keywords: ['usd/cad', 'usdcad', 'канадский доллар', 'луни', 'курс cad'],
  },
  {
    tag: 'DXY',
    label: 'DXY (Dollar)',
    category: 'forex',
    tickers: ['dxy', 'dx-y.nyb', 'dx-y', 'dollar index'],
    keywords: ['dxy', 'индекс доллара', 'dollar index', 'корзина доллара', 'курс доллара dxy'],
  },

  // Central Banks
  {
    tag: 'ФРС',
    label: 'ФРС (Fed)',
    category: 'central_banks',
    tickers: ['fed', 'фрс', 'fomc'],
    keywords: ['фрс', 'fed', 'fomc', 'пауэлл', 'powell', 'федеральн', 'федрезерв'],
  },
  {
    tag: 'ЕЦБ',
    label: 'ЕЦБ (ECB)',
    category: 'central_banks',
    tickers: ['ecb', 'ецб'],
    keywords: ['ецб', 'ecb', 'лагард', 'lagarde', 'европейский центральный банк'],
  },
  {
    tag: 'BoE',
    label: 'Банк Англии (BoE)',
    category: 'central_banks',
    tickers: ['boe', 'банк англии'],
    keywords: ['boe', 'банк англии', 'бейли', 'bailey', 'bank of england', 'mpc'],
  },
  {
    tag: 'BoJ',
    label: 'Банк Японии (BoJ)',
    category: 'central_banks',
    tickers: ['boj', 'банк японии'],
    keywords: ['boj', 'банк японии', 'уэда', 'ueda', 'bank of japan'],
  },
  {
    tag: 'SNB',
    label: 'ШНБ (SNB)',
    category: 'central_banks',
    tickers: ['snb', 'шнб'],
    keywords: ['snb', 'шнб', 'шлегель', 'schlegel', 'швейцарский нацбанк', 'swiss national bank'],
  },
  {
    tag: 'RBA',
    label: 'РБА (RBA)',
    category: 'central_banks',
    tickers: ['rba', 'рба'],
    keywords: ['rba', 'рба', 'буллок', 'bullock', 'резервный банк австралии', 'reserve bank of australia'],
  },
  {
    tag: 'RBNZ',
    label: 'РБНЗ (RBNZ)',
    category: 'central_banks',
    tickers: ['rbnz', 'рбнз'],
    keywords: ['rbnz', 'рбнз', 'орр', 'orr', 'резервный банк новой зеландии', 'reserve bank of new zealand'],
  },
  {
    tag: 'BoC',
    label: 'Банк Канады (BoC)',
    category: 'central_banks',
    tickers: ['boc', 'банк канады'],
    keywords: ['boc', 'банк канады', 'маклем', 'macklem', 'bank of canada'],
  },

  // Sovereign Bonds
  {
    tag: 'US 10Y',
    label: 'US 10Y Treasuries',
    category: 'bonds',
    tickers: ['us10y', 'us 10y', '^tnx', 'treasuries'],
    keywords: ['us 10y', 'us10y', 'treasuries', '10-летние гособлигации сша', 'treasury yields', 'казначейск'],
  },
  {
    tag: 'Bund 10Y',
    label: 'Bunds 10Y',
    category: 'bonds',
    tickers: ['bund10y', 'bund 10y', 'bunds'],
    keywords: ['bund', 'бунды', 'гособлигации германии', 'bunds 10y', '10-летние бунды'],
  },
  {
    tag: 'Gilt 10Y',
    label: 'Gilts 10Y',
    category: 'bonds',
    tickers: ['gilt10y', 'gilt 10y', 'gilts'],
    keywords: ['gilt', 'гилтс', 'гособлигации великобритании', 'gilts 10y', '10-летние гилтс'],
  },
  {
    tag: 'JGB 10Y',
    label: 'JGB 10Y',
    category: 'bonds',
    tickers: ['jgb10y', 'jgb 10y', 'jcb 10y', 'jgb', 'jcb'],
    keywords: ['jgb', 'jcb', 'японские облигации', 'гособлигации японии', 'японские 10-летние', '10y jgb', '10-летние jgb', 'облигации японии'],
  },
];

// Quick lookup map by tag
const ASSET_BY_TAG = new Map<string, AssetDefinition>();
ASSET_DEFINITIONS.forEach((a) => {
  ASSET_BY_TAG.set(a.tag.toLowerCase(), a);
  // Also register common aliases
  if (a.tag === 'JGB 10Y') {
    ASSET_BY_TAG.set('jcb 10y', a);
    ASSET_BY_TAG.set('jgb', a);
    ASSET_BY_TAG.set('jcb', a);
    ASSET_BY_TAG.set('облигации японии', a);
    ASSET_BY_TAG.set('японские облигации', a);
  }
  if (a.tag === 'XAU') ASSET_BY_TAG.set('gold', a);
  if (a.tag === 'XAG') ASSET_BY_TAG.set('silver', a);
  if (a.tag === 'DJI') {
    ASSET_BY_TAG.set('dow', a);
    ASSET_BY_TAG.set('dow jones', a);
  }
  if (a.tag === 'WTI') {
    ASSET_BY_TAG.set('wti crude', a);
    ASSET_BY_TAG.set('нефть wti', a);
  }
  if (a.tag === 'SOL') {
    ASSET_BY_TAG.set('solana', a);
    ASSET_BY_TAG.set('солана', a);
  }
  if (a.tag === 'XRP') {
    ASSET_BY_TAG.set('ripple', a);
    ASSET_BY_TAG.set('риппл', a);
    ASSET_BY_TAG.set('рипл', a);
  }
});

export const QUICK_TAGS = ASSET_DEFINITIONS.map((a) => a.tag);

export const INTERVAL_MAX_MINUTES: Record<string, number> = {
  '10m': 10,
  '1h': 60,
  '1d': 1440,
  '1w': 10080,
};

/**
 * Checks if a news item matches a specific asset tag
 */
export function doesNewsMatchTag(item: NewsDigestItem, tag: string): boolean {
  const normalizedTag = tag.trim().toLowerCase();
  const def = ASSET_BY_TAG.get(normalizedTag);

  // Direct search in relatedAssets array
  const relatedText = item.relatedAssets.join(' ').toLowerCase();
  if (relatedText.includes(normalizedTag)) return true;

  if (def) {
    // Check tickers in relatedAssets
    if (def.tickers.some((t) => relatedText.includes(t.toLowerCase()))) return true;

    // Check keywords across title, summary, keyTakeaway, centralBankReference
    const fullText = [
      item.title,
      item.summary,
      item.keyTakeaway,
      item.centralBankReference || '',
    ].join(' ').toLowerCase();

    if (def.keywords.some((kw) => fullText.includes(kw.toLowerCase()))) return true;
    if (def.tickers.some((t) => fullText.includes(t.toLowerCase()))) return true;
  } else {
    // Generic fallback for custom tags
    const fullText = [
      item.title,
      item.summary,
      item.keyTakeaway,
      relatedText,
    ].join(' ').toLowerCase();
    return fullText.includes(normalizedTag);
  }

  return false;
}

/**
 * Checks if a recommendation matches a specific asset tag
 */
export function doesRecMatchTag(rec: AssetRecommendation, tag: string): boolean {
  const normalizedTag = tag.trim().toLowerCase();
  const def = ASSET_BY_TAG.get(normalizedTag);

  const recTicker = rec.ticker.toLowerCase();
  const recName = rec.name.toLowerCase();
  const recId = rec.id.toLowerCase();

  if (recTicker.includes(normalizedTag) || recName.includes(normalizedTag) || recId.includes(normalizedTag)) {
    return true;
  }

  if (def) {
    if (def.tickers.some((t) => recTicker.includes(t.toLowerCase()) || recName.includes(t.toLowerCase()) || recId.includes(t.toLowerCase()))) {
      return true;
    }
    if (def.keywords.some((kw) => recTicker.includes(kw.toLowerCase()) || recName.includes(kw.toLowerCase()) || recId.includes(kw.toLowerCase()))) {
      return true;
    }
    // Specific match for central banks
    if (def.category === 'central_banks' && rec.centralBankContext) {
      const cbText = rec.centralBankContext.toLowerCase();
      if (def.keywords.some((kw) => cbText.includes(kw.toLowerCase()))) return true;
    }
    // Specific match for bonds
    if (def.category === 'bonds' && rec.bondYieldImpact) {
      const bText = rec.bondYieldImpact.toLowerCase();
      if (def.keywords.some((kw) => bText.includes(kw.toLowerCase()))) return true;
    }
  }

  return false;
}

/**
 * Filter news items by selected tags AND search query
 */
export function filterNewsItems(
  items: NewsDigestItem[],
  selectedTags: string[],
  searchQuery: string
): NewsDigestItem[] {
  return items.filter((item) => {
    // 1. If tags are selected, item MUST match at least one selected tag
    if (selectedTags.length > 0) {
      const matchesAnyTag = selectedTags.some((tag) => doesNewsMatchTag(item, tag));
      if (!matchesAnyTag) return false;
    }

    // 2. If user typed a search query, verify query match
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const text = [
        item.title,
        item.summary,
        item.keyTakeaway,
        item.centralBankReference || '',
        ...item.relatedAssets,
      ].join(' ').toLowerCase();

      // Check if text includes query or tokens
      const tokens = q.split(/\s+/).filter(Boolean);
      const matchesTokens = tokens.every((token) => text.includes(token));
      if (!matchesTokens) return false;
    }

    return true;
  });
}

/**
 * Filter recommendations by selected tags, search query, AND temporal interval
 */
export function filterRecommendations(
  recs: AssetRecommendation[],
  selectedTags: string[],
  searchQuery: string,
  interval?: string
): AssetRecommendation[] {
  return recs.filter((rec) => {
    // 0. Filter by temporal interval if catalystAgeMinutes is present
    if (interval && rec.catalystAgeMinutes !== undefined) {
      const maxMins = INTERVAL_MAX_MINUTES[interval] ?? 60;
      if (rec.catalystAgeMinutes > maxMins) {
        return false;
      }
    }

    // 1. If tags are selected, rec MUST match at least one selected tag
    if (selectedTags.length > 0) {
      const matchesAnyTag = selectedTags.some((tag) => doesRecMatchTag(rec, tag));
      if (!matchesAnyTag) return false;
    }

    // 2. If user typed a search query, verify query match
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      const text = [
        rec.ticker,
        rec.name,
        rec.keyDriver,
        rec.historicalPrecedent,
        rec.centralBankContext || '',
        rec.bondYieldImpact || '',
        rec.rationale,
        rec.tacticalAdvice,
        rec.riskFactors,
        rec.targetOutlook || '',
      ].join(' ').toLowerCase();

      const tokens = q.split(/\s+/).filter(Boolean);
      const matchesTokens = tokens.every((token) => text.includes(token));
      if (!matchesTokens) return false;
    }

    return true;
  });
}
