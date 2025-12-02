import { MiscellaneousExpenseCode } from './miscellaneous-expense-code.enum';
import { RowType } from './row-type.enum';

export interface MiscellaneousExpenseItem {
  rowCode: MiscellaneousExpenseCode | number;
  category: number;
  rowType: RowType;
  id: number;
  itemDescription: string;
  currentPeriodAmount: number;
  lastYearSamePeriodAmount: number;
  fromStartOfYearToEndOfPeriodAmount: number;
  previousPeriodAmount?: number; // Optional for template compatibility
  estimatedPeriodAmount?: number; // Optional for template compatibility
}
