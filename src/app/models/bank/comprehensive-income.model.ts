export interface BankComprehensiveIncomeListItem {
  id: string;
  isin: string;
  symbol: string;
  traceNo: number;
  uri: string;
  fiscalYear: number;
  yearEndMonth: number;
  reportMonth: number;
  isAudited: boolean;
  isAuditedDescription: string;
  publishDate: string;
  title: string;
}

export interface BankComprehensiveIncomeDetailRow {
  id: string;
  row: number;
  codalRow: number;
  description: string | null;
  value: number;
}

export interface BankComprehensiveIncomeDetail {
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
  details: BankComprehensiveIncomeDetailRow[];
}
