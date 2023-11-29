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


  export interface Statement {
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
  
  