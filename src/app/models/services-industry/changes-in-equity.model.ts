export interface ServicesIndustryChangesInEquityListItem {
  id: string;
  isin: string;
  symbol: string;
  traceNo: number;
  uri: string;
  fiscalYear: number;
  reportMonth: number;
  isAuditedDescription: string;
  publishDate: string;
  title: string;
}

export interface ServicesIndustryChangesInEquityItem {
  rowCode: number;
  rowType: string | null;
  description: string | null;
  capital: number | null;
  capitalIncreaseInProgress: number | null;
  sharePremium: number | null;
  treasurySharePremium: number | null;
  legalReserve: number | null;
  otherReserves: number | null;
  revaluationSurplus: number | null;
  foreignCurrencyTranslationDifference: number | null;
  retainedEarnings: number | null;
  treasuryShares: number | null;
  total: number | null;
}

export interface ServicesIndustryChangesInEquityDetail {
  id: string;
  isin: string;
  symbol: string;
  uri: string;
  traceNo: number;
  fiscalYear: number;
  yearEndMonth: number;
  reportMonth: number;
  isAudited: boolean;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  items: ServicesIndustryChangesInEquityItem[];
}
