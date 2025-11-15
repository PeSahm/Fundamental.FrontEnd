import { InvestmentIncomeCode } from './investment-income-code.enum';
import { RowType } from './row-type.enum';

export interface InvestmentIncomeItem {
  rowCode: InvestmentIncomeCode | number;
  category: number;
  rowType: RowType;
  id: number;
  itemDescription: string;
  currentPeriodAmount: number;
  lastYearSamePeriodAmount: number;
  fromStartOfYearToEndOfPeriodAmount: number;
}
