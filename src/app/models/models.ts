

// new interface implementation for the app.


export interface Result<T> {
  data: Data<T>,
  error: any,
  success: boolean
}

export interface DetailResult<T> {
  data: T,
  error: any,
  success: boolean
}

export interface Data<T> {
  items: T,
  meta?: Meta
}
export interface Meta {
  total: number
  from: number
  to: number
}

export interface ManufacturingBalanceSheetDetails {
  order: number;
  codalRow: number;
  description: string;
  category: number;
  categoryDescription: string;
  value: number;
}


export interface SortOption {
  column: string;
  sortOrder: string;
}

export interface SearchSymbol {
  success: boolean
  data: SymbolDetail[]
  error: any
}

export interface SymbolDetail {
  isin?: string
  tseInsCode?: string
  title?: string
  name?: string
  marketCap?: number
}


export interface SelectSymbol {
  item: SymbolDetail,
  preventDefault: () => void
}


export interface Statement {
  id: string
  isin: string;
  traceNo: number;
  uri: string;
  fiscalYear: number;
  yearEndMonth: number;
  reportMonth: number;
  operatingIncome: number;
  grossProfit: number;
  operatingProfit: number;
  bankInterestIncome: number;
  investmentIncome: number;
  netProfit: number;
  expense: number;
  asset: number;
  ownersEquity: number;
  receivables: number;
}

export interface MonthlyActivity {
  isin: string;
  traceNo: number;
  uri: string;
  fiscalYear: number;
  yearEndMonth: number;
  reportMonth: number;
  saleBeforeCurrentMonth: number;
  saleCurrentMonth: number;
  saleIncludeCurrentMonth: number;
  saleLastYear: number;
  hasSubCompanySale: boolean;
}

export interface ManufacturingBalanceSheet {
  isin?: string;
  symbol?: string;
  traceNo?: number;
  uri?: string;
  fiscalYear?: number;
  reportMonth?: number;
  title?: string;
}

export interface KeyName {
  name: string;
  hasLink?: boolean;
  hasView?: boolean;
}

export interface KeyNameChild {
  name?: string;
  pipe?: string;
}

export interface ColumnName {
  name?: string;
  title?: string;
  hasSort?:boolean;
  hasLink?:boolean;
  hasView?:boolean;
}

export interface DetailRow<T>{
  expand: boolean;
  rowData: T
}











