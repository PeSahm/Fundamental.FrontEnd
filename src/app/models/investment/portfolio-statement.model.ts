export interface InvestmentPortfolioAcceptedItem {
  companyName: string | null;
  companySymbol: string | null;
  industryGroupCode: number | null;
  capital: number | null;
  shareNominalValue: number | null;
  startShareCount: number | null;
  startCost: number | null;
  startMarketValue: number | null;
  shareCountChange: number | null;
  costChange: number | null;
  marketValueChange: number | null;
  endOwnershipPercent: number | null;
  endCost: number | null;
  endMarketValue: number | null;
  endCostPerShare: number | null;
  endValuePerShare: number | null;
  profitLoss: number | null;
  rowCode: number | null;
  rowType: string | null;
}

export interface InvestmentPortfolioNotAcceptedItem {
  companyName: string | null;
  companySymbol: string | null;
  industryGroupCode: number | null;
  corporationRef: number | null;
  capital: number | null;
  shareNominalValue: number | null;
  startShareCount: number | null;
  startCost: number | null;
  shareCountChange: number | null;
  costChange: number | null;
  endOwnershipPercent: number | null;
  endCost: number | null;
  endCostPerShare: number | null;
  statusDescription: string | null;
  rowCode: number | null;
  rowType: string | null;
}

export interface InvestmentIncomeBuyItem {
  companyName: string | null;
  companySymbol: string | null;
  industryGroupCode: number | null;
  shareCount: number | null;
  costPerShare: number | null;
  acceptedTotalCost: number | null;
  notAcceptedTotalCost: number | null;
  rowCode: number | null;
  rowType: string | null;
}

export interface InvestmentIncomeSaleItem {
  companyName: string | null;
  companySymbol: string | null;
  industryGroupCode: number | null;
  shareCount: number | null;
  costPerShare: number | null;
  totalCost: number | null;
  salePricePerShare: number | null;
  totalSaleAmount: number | null;
  profitLoss: number | null;
  rowCode: number | null;
  rowType: string | null;
}

export interface InvestmentPortfolioDividendItem {
  companyName: string | null;
  investeeCompanyFiscalYear: string | null;
  assemblyDate: string | null;
  shareCountAtAssemblyDate: number | null;
  capital: number | null;
  shareNominalValue: number | null;
  ownershipPercent: number | null;
  earningsPerShare: number | null;
  cashEarningsPerShare: number | null;
  currentYearDividendIncome: number | null;
  priorYearDividendIncome: number | null;
  rowCode: number | null;
  rowType: string | null;
}

export interface InvestmentIndustryGroupItem {
  industryCode: number | null;
  description: string | null;
  acceptedStartCompanyCount: number | null;
  acceptedStartCost: number | null;
  acceptedStartMarketValue: number | null;
  acceptedCostChange: number | null;
  acceptedMarketValueChange: number | null;
  acceptedEndCompanyCount: number | null;
  acceptedEndCost: number | null;
  acceptedEndMarketValue: number | null;
  notAcceptedStartCompanyCount: number | null;
  notAcceptedStartCost: number | null;
  notAcceptedCostChange: number | null;
  notAcceptedEndCompanyCount: number | null;
  notAcceptedEndCost: number | null;
  totalStartCompanyCount: number | null;
  totalStartCost: number | null;
  totalStartCostPercent: number | null;
  totalCostChange: number | null;
  totalCostChangePercent: number | null;
  totalEndCompanyCount: number | null;
  totalEndCost: number | null;
  totalEndCostPercent: number | null;
  rowCode: number | null;
  rowType: string | null;
}

export interface InvestmentPortfolioStatementDetail {
  id: string;
  isin: string;
  symbol: string;
  uri: string;
  traceNo: number;
  fiscalYear: number;
  yearEndMonth: number;
  reportMonth: number;
  isAudited: boolean;
  currency: string | null;
  publishDate: string;
  createdAt: string;
  updatedAt: string;
  reserveForInvestment: number | null;
  investmentDescription: string | null;
  dividendCurrentMonth: number | null;
  dividendLastMonth: number | null;
  dividendYearEndToDate: number | null;
  dividendPastYearEndToDate: number | null;
  dividendDescription: string | null;
  acceptedPortfolioItems: InvestmentPortfolioAcceptedItem[];
  notAcceptedPortfolioItems: InvestmentPortfolioNotAcceptedItem[];
  incomeBuyItems: InvestmentIncomeBuyItem[];
  incomeSaleItems: InvestmentIncomeSaleItem[];
  dividendItems: InvestmentPortfolioDividendItem[];
  industryGroupItems: InvestmentIndustryGroupItem[];
}
