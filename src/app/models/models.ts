export interface SearchSymbol {
  success: boolean
  data: SymbolDetail[]
  error: any
}

export interface SymbolDetail {
  isin: string
  tseInsCode: string
  title: string
  name: string
  marketCap: number
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

export interface ResponseStatementRoot {
  success: boolean
  data: Data
  error: any
}

export interface Data {
  items: Statement[]
  meta: Meta
}



export interface Meta {
  total: number
  from: number
  to: number
}

export interface ManufacturingBalanceSheetDataFrom {
  data: {
    items: ManufacturingBalanceSheet[];
    meta: Meta;
  };
  error?: any;
  success?: boolean;
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
export interface ManufacturingBalanceSheetDetailsRow {
  success: boolean;
  data: ManufacturingBalanceSheetDetails[];
  error?: any;
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

export interface KeyName{
  // { name: 'uri', hasLink: true, hasView: true }
  name : string;
  hasLink?:boolean;
  hasView?:boolean;
}

