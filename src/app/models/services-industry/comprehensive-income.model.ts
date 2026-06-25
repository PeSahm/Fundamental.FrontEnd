export interface ServicesIndustryComprehensiveIncomeListItem {
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

export interface ServicesIndustryComprehensiveIncomeDetailRow {
  id: string;
  row: number;
  codalRow: number;
  description: string | null;
  value: number;
}

export interface ServicesIndustryComprehensiveIncomeDetail {
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
  details: ServicesIndustryComprehensiveIncomeDetailRow[];
}
