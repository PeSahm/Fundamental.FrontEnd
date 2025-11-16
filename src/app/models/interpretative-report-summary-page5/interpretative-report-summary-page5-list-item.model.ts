export interface InterpretativeReportSummaryPage5ListItem {
  id: string; // GUID
  isin: string; // Symbol ISIN code (e.g., "IRO1MSMI0001")
  symbol: string; // Symbol code (e.g., "خودرو")
  title: string; // Report title
  uri: string; // CODAL report URI
  version: number; // JSON version (2-5)
  fiscalYear: number; // e.g., 1404
  yearEndMonth: number; // 1-12
  reportMonth: number; // 1-12
  traceNo: number; // CODAL trace number
  publishDate: string; // ISO 8601 date-time
}
