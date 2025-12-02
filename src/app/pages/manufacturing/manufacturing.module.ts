import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

// Components
import { FinancialReportComponent } from './financial-report/financial-report.component';
import { SalesReportComponent } from './sales-report/sales-report.component';
import { GetFinancialReportComponent } from './get-financial-report/get-financial-report.component';
import { GetSalesReportComponent } from './get-sales-report/get-sales-report.component';
import { ManufacturingBalanceSheetComponent } from './manufacturing-balance-sheet/manufacturing-balance-sheet.component';
import { GetManufacturingBalanceSheetComponent } from './get-manufacturing-balance-sheet/get-manufacturing-balance-sheet.component';
import { ManufacturingIncomeStatementComponent } from './manufacturing-income-statement/manufacturing-income-statement.component';
import { GetIncomeStatementComponent } from './get-income-statement/get-income-statement.component';
import { NonOperationalIncomeComponent } from './non-operational-income/non-operational-income.component';
import { NonOperationalIncomeTagModalComponent } from './non-operational-income/non-operational-income-tag-modal/non-operational-income-tag-modal.component';
import { MonthlyActivityDetailComponent } from './monthly-activity-detail/monthly-activity-detail.component';
import { InterpretativeReportSummaryPage5ListComponent } from './interpretative-report-summary-page5/list/interpretative-report-summary-page5-list.component';
import { InterpretativeReportSummaryPage5DetailComponent } from './interpretative-report-summary-page5/detail/interpretative-report-summary-page5-detail.component';
import { AnnualAssemblyListComponent } from './annual-assembly/list/annual-assembly-list.component';
import { AnnualAssemblyDetailComponent } from './annual-assembly/detail/annual-assembly-detail.component';
import { ExtraAnnualAssemblyListComponent } from './extra-annual-assembly/list/extra-annual-assembly-list.component';
import { ExtraAnnualAssemblyDetailComponent } from './extra-annual-assembly/detail/extra-annual-assembly-detail.component';
import { ExtraAssemblyListComponent } from './extra-assembly/list/extra-assembly-list.component';
import { ExtraAssemblyDetailComponent } from './extra-assembly/detail/extra-assembly-detail.component';

const routes: Routes = [
  { path: 'sales-report', component: SalesReportComponent, data: { title: ' ثبت فروش های ماهانه ' } },
  { path: 'get-sales-report', component: GetSalesReportComponent, data: { title: ' گزارش فروش های ماهانه ' } },
  { path: 'balance-sheet', component: ManufacturingBalanceSheetComponent, data: { title: '  ثبت صورت وضعیت مالی تولیدی ' } },
  { path: 'balance-sheet-report', component: GetManufacturingBalanceSheetComponent, data: { title: '  گزارش صورت وضعیت مالی تولیدی ' } },
  { path: 'income-statement', component: ManufacturingIncomeStatementComponent, data: { title: '  ثبت صورت   سود و زیان ' } },
  { path: 'get-income-statement', component: GetIncomeStatementComponent, data: { title: '  گزارش صورت   سود و زیان ' } },
  { path: 'non-operational-income', component: NonOperationalIncomeComponent, data: { title: 'گزارش درآمد غیرعملیاتی' } },
  { path: 'monthly-activity-detail/:id', component: MonthlyActivityDetailComponent, data: { title: 'جزئیات فعالیت ماهانه' } },
  { path: 'interpretative-report-summary-page5', component: InterpretativeReportSummaryPage5ListComponent, data: { title: 'گزیده گزارش تفسیری صفحه 5' } },
  { path: 'interpretative-report-summary-page5/:id', component: InterpretativeReportSummaryPage5DetailComponent, data: { title: 'جزئیات گزیده گزارش تفسیری صفحه 5' } },
  { path: 'annual-assembly', component: AnnualAssemblyListComponent, data: { title: 'تصمیمات مجمع عمومی عادی سالیانه' } },
  { path: 'annual-assembly/:id', component: AnnualAssemblyDetailComponent, data: { title: 'جزئیات تصمیمات مجمع عمومی عادی سالیانه' } },
  { path: 'extra-annual-assembly', component: ExtraAnnualAssemblyListComponent, data: { title: 'تصمیمات مجمع عمومی فوق‌العاده سالیانه' } },
  { path: 'extra-annual-assembly/:id', component: ExtraAnnualAssemblyDetailComponent, data: { title: 'جزئیات تصمیمات مجمع عمومی فوق‌العاده سالیانه' } },
  { path: 'extra-assembly', component: ExtraAssemblyListComponent, data: { title: 'تصمیمات مجمع عمومی فوق‌العاده' } },
  { path: 'extra-assembly/:id', component: ExtraAssemblyDetailComponent, data: { title: 'جزئیات تصمیمات مجمع عمومی فوق‌العاده' } },
];

@NgModule({
  declarations: [
    FinancialReportComponent,
    SalesReportComponent,
    GetFinancialReportComponent,
    GetSalesReportComponent,
    ManufacturingBalanceSheetComponent,
    GetManufacturingBalanceSheetComponent,
    ManufacturingIncomeStatementComponent,
    GetIncomeStatementComponent,
    NonOperationalIncomeComponent,
    NonOperationalIncomeTagModalComponent,
    MonthlyActivityDetailComponent,
    InterpretativeReportSummaryPage5ListComponent,
    InterpretativeReportSummaryPage5DetailComponent,
    AnnualAssemblyListComponent,
    AnnualAssemblyDetailComponent,
    ExtraAnnualAssemblyListComponent,
    ExtraAnnualAssemblyDetailComponent,
    ExtraAssemblyListComponent,
    ExtraAssemblyDetailComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    NgxMaskDirective,
    NgxMaskPipe
  ]
})
export class ManufacturingModule { }
