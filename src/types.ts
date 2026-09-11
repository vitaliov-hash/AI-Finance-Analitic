export type TimeInterval = '10m' | '1h' | '1d' | '1w';

export type AnalysisMode = 'digest' | 'recommendations';

export type AssetCategory = 'all' | 'stocks' | 'forex' | 'commodities' | 'crypto' | 'bonds' | 'central_banks' | 'macro';

export type PriceDirection = 'bullish' | 'bearish' | 'neutral' | 'volatile';

export type ImpactLevel = 'high' | 'medium' | 'low';

export interface SourceLink {
  title: string;
  url: string;
  publisher: string;
}

export interface NewsDigestItem {
  id: string;
  title: string;
  summary: string;
  originalTitle?: string;
  category: 'stocks' | 'forex' | 'commodities' | 'crypto' | 'bonds' | 'central_banks' | 'macro';
  impactLevel: ImpactLevel;
  publishedTime: string;
  pubTimestamp?: number;
  ageMs?: number;
  source: SourceLink;
  relatedAssets: string[];
  keyTakeaway: string;
  centralBankReference?: string;
}

export interface AssetRecommendation {
  id: string;
  ticker: string;
  name: string;
  category: 'stocks' | 'forex' | 'commodities' | 'crypto' | 'bonds' | 'central_banks';
  direction: PriceDirection;
  impactLevel: ImpactLevel;
  confidence: number; // 0 - 100
  timeHorizon: 'intraday' | 'short_term' | 'medium_term';
  timeHorizonLabel: string;
  catalystAgeMinutes?: number; // Возраст новости-катализатора в минутах (например, 27)
  catalystPublishedTime?: string; // Человекочитаемое время новости-катализатора (например, "27 мин назад")
  currentContext: string;
  keyDriver: string;
  historicalPrecedent: string; // Исторический паттерн и прецеденты реакции цен
  centralBankContext?: string; // Ставки центробанков, протоколы и заявления
  bondYieldImpact?: string; // Влияние доходности гособлигаций
  rationale: string;
  tacticalAdvice: string;
  riskFactors: string;
  targetOutlook?: string;
  relatedSources: SourceLink[];
}

export interface MarketSentiment {
  score: number; // 0 - 100
  label: 'Бычий (Bullish)' | 'Медвежий (Bearish)' | 'Нейтральный (Neutral)' | 'Смешанный / Высокая волатильность';
  tone: 'bullish' | 'bearish' | 'neutral' | 'volatile';
  summary: string;
}

export interface AnalysisResult {
  mode: AnalysisMode;
  interval: TimeInterval;
  generatedAt: string;
  marketSentiment: MarketSentiment;
  macroDrivers: string[];
  digestItems: NewsDigestItem[];
  recommendations: AssetRecommendation[];
  sources: SourceLink[];
  searchQueryUsed?: string;
}
