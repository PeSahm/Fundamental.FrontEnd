import { OtherOperatingIncomeCode } from './other-operating-income-code.enum';
import { RowType } from './row-type.enum';

export interface OtherOperatingIncomeItem {
  rowCode: OtherOperatingIncomeCode | number; // -1 for data rows, positive for summary
  category: number; // Grouping category
  rowType: RowType; // Data = -1, Summary = other values
  id: number; // Row identifier
  itemDescription: string; // Persian description
  currentPeriodAmount: number; // مبالغ دوره جاری
  lastYearSamePeriodAmount: number; // مبالغ مدت مشابه سال قبل
  fromStartOfYearToEndOfPeriodAmount: number; // مبالغ از ابتدای سال تا پایان دوره
  previousPeriodAmount?: number; // Optional for template compatibility
  estimatedPeriodAmount?: number; // Optional for template compatibility
}
