import { OtherOperatingIncomeItem } from './other-operating-income-item.model';
import { OtherNonOperatingExpenseItem } from './other-non-operating-expense-item.model';
import { FinancingDetailItem } from './financing-detail-item.model';
import { InvestmentIncomeItem } from './investment-income-item.model';
import { MiscellaneousExpenseItem } from './miscellaneous-expense-item.model';
import { InterpretativeReportDescription } from './interpretative-report-description.model';

export interface InterpretativeReportSummaryPage5Detail {
  // Header Information
  id: string;
  isin: string;
  symbol: string;
  title: string;
  uri: string;
  version: number;
  fiscalYear: number;
  yearEndMonth: number;
  reportMonth: number;
  traceNo: number;
  publishDate: string;

  // Financial Data Collections (6 grids)
  otherOperatingIncomes?: OtherOperatingIncomeItem[];
  otherNonOperatingExpenses?: OtherNonOperatingExpenseItem[];
  financingDetails?: FinancingDetailItem[];
  financingDetailsEstimated?: FinancingDetailItem[];
  investmentIncomes?: InvestmentIncomeItem[];
  miscellaneousExpenses?: MiscellaneousExpenseItem[];
  descriptions?: InterpretativeReportDescription[];
}
