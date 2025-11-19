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
    ANNUAL_ASSEMBLY: 'Manufacturing/annual-assembly'
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
