import { FinancingDetailCode } from './financing-detail-code.enum';
import { RowType } from './row-type.enum';

export interface FinancingDetailItem {
  rowCode: FinancingDetailCode | number; // -1 for data rows
  category: number;
  rowType: RowType;
  id: number;
  financingSource: string; // منبع تأمین مالی
  interestRate: number; // نرخ سود (%)
  loanBalanceAtStartOfYear: number; // مانده وام ابتدای سال
  loanAmountReceivedDuringPeriod: number; // مبلغ وام دریافتی در طول دوره
  repaidAmountDuringPeriod: number; // مبلغ بازپرداختی در طول دوره
  loanBalanceAtEndOfPeriod: number; // مانده وام پایان دوره
  currencyTypeAtStartOfYear: string; // نوع ارز ابتدای سال
  currencyTypeReceived: string; // نوع ارز دریافتی
  currencyTypeRepaid: string; // نوع ارز بازپرداختی
  currencyTypeAtEndOfPeriod: string; // نوع ارز پایان دوره
  loanRepaymentTerm: string; // مدت بازپرداخت وام
  financialExpense: number; // هزینه مالی
}
