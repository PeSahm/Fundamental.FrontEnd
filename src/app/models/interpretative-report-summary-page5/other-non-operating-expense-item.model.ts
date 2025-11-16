import { OtherNonOperatingExpenseCode } from './other-non-operating-expense-code.enum';
import { RowType } from './row-type.enum';

export interface OtherNonOperatingExpenseItem {
  rowCode: OtherNonOperatingExpenseCode | number; // -1 for data rows
  category: number;
  rowType: RowType;
  id: number;
  itemDescription: string;
  currentPeriodAmount: number;
  lastYearSamePeriodAmount: number;
  fromStartOfYearToEndOfPeriodAmount: number;
}
