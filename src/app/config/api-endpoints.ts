// API endpoint constants
export const API_ENDPOINTS = {
  // Manufacturing endpoints
  MANUFACTURING: {
    BALANCE_SHEET: 'Manufacturing/balance-sheet',
    BALANCE_SHEET_SORT: 'Manufacturing/balance-sheet-sort',
    INCOME_STATEMENT: 'Manufacturing/income-statement',
    INCOME_STATEMENT_SORT: 'Manufacturing/income-statement-sort',
    NON_OPERATION_INCOME: 'Manufacturing/non-operation-income',
    MONTHLY_ACTIVITY: 'Manufacturing/monthly-activity',
    STATUS_OF_VIABLE_COMPANIES: 'Manufacturing/status-of-viable-companies',
    INTERPRETATIVE_REPORT_SUMMARY_PAGE5: 'Manufacturing/interpretative-report-summary-page5',
    ANNUAL_ASSEMBLY: 'Manufacturing/annual-assembly',
    EXTRA_ANNUAL_ASSEMBLY: 'Manufacturing/extra-annual-assembly',
    EXTRA_ASSEMBLY: 'Manufacturing/extra-assembly'
  },

  // Agriculture endpoints
  AGRICULTURE: {
    MONTHLY_ACTIVITY: 'Agriculture/monthly-activity',
    BALANCE_SHEET: 'Agriculture/balance-sheet',
    INCOME_STATEMENT: 'Agriculture/income-statement',
    CASH_FLOW: 'Agriculture/cash-flow',
    COMPREHENSIVE_INCOME: 'Agriculture/comprehensive-income',
    CHANGES_IN_EQUITY: 'Agriculture/changes-in-equity'
  },

  // ServicesIndustry endpoints
  SERVICES_INDUSTRY: {
    MONTHLY_ACTIVITY: 'ServicesIndustry/monthly-activity',
    BALANCE_SHEET: 'ServicesIndustry/balance-sheet',
    INCOME_STATEMENT: 'ServicesIndustry/income-statement',
    CASH_FLOW: 'ServicesIndustry/cash-flow',
    COMPREHENSIVE_INCOME: 'ServicesIndustry/comprehensive-income',
    CHANGES_IN_EQUITY: 'ServicesIndustry/changes-in-equity'
  },

  // Structural endpoints
  STRUCTURAL: {
    MONTHLY_ACTIVITY: 'Structural/monthly-activity',
    BALANCE_SHEET: 'Structural/balance-sheet',
    INCOME_STATEMENT: 'Structural/income-statement',
    CASH_FLOW: 'Structural/cash-flow',
    COMPREHENSIVE_INCOME: 'Structural/comprehensive-income',
    CHANGES_IN_EQUITY: 'Structural/changes-in-equity'
  },

  // Investment endpoints
  INVESTMENT: {
    BALANCE_SHEET: 'Investment/balance-sheet',
    INCOME_STATEMENT: 'Investment/income-statement',
    CASH_FLOW: 'Investment/cash-flow',
    PORTFOLIO_STATEMENT: 'Investment/portfolio-statement'
  },

  // Bank endpoints
  BANK: {
    MONTHLY_ACTIVITY: 'Bank/monthly-activity',
    BALANCE_SHEET: 'Bank/balance-sheet',
    INCOME_STATEMENT: 'Bank/income-statement',
    CASH_FLOW: 'Bank/cash-flow',
    COMPREHENSIVE_INCOME: 'Bank/comprehensive-income',
    CHANGES_IN_EQUITY: 'Bank/changes-in-equity'
  },

  // Leasing endpoints
  LEASING: {
    MONTHLY_ACTIVITY: 'Leasing/monthly-activity',
    BALANCE_SHEET: 'Leasing/balance-sheet',
    INCOME_STATEMENT: 'Leasing/income-statement',
    CASH_FLOW: 'Leasing/cash-flow',
    COMPREHENSIVE_INCOME: 'Leasing/comprehensive-income',
    CHANGES_IN_EQUITY: 'Leasing/changes-in-equity'
  },

  // Insurance endpoints
  INSURANCE: {
    MONTHLY_ACTIVITY: 'Insurance/monthly-activity',
    BALANCE_SHEET: 'Insurance/balance-sheet',
    INCOME_STATEMENT: 'Insurance/income-statement',
    CASH_FLOW: 'Insurance/cash-flow',
    COMPREHENSIVE_INCOME: 'Insurance/comprehensive-income',
    CHANGES_IN_EQUITY: 'Insurance/changes-in-equity'
  },

  // CapitalSupply endpoints
  CAPITAL_SUPPLY: {
    MONTHLY_ACTIVITY: 'CapitalSupply/monthly-activity',
    BALANCE_SHEET: 'CapitalSupply/balance-sheet',
    INCOME_STATEMENT: 'CapitalSupply/income-statement',
    CASH_FLOW: 'CapitalSupply/cash-flow',
    COMPREHENSIVE_INCOME: 'CapitalSupply/comprehensive-income',
    CHANGES_IN_EQUITY: 'CapitalSupply/changes-in-equity'
  },

  // Statement endpoints
  STATEMENTS: 'statements',

  // Symbol endpoints
  SYMBOLS: 'symbols',
  SYMBOL_SHARE_HOLDERS: 'symbol-share-holders',

  // Error endpoints
  ERROR_MESSAGES: 'error-messages/admin'
} as const;

// API response types
export const CULTURE = {
  FA_IR: 'fa-ir'
} as const;
