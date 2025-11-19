import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FinancialReportComponent } from './pages/manufacturing/financial-report/financial-report.component';
import { SalesReportComponent } from './pages/manufacturing/sales-report/sales-report.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GetFinancialReportComponent } from './pages/manufacturing/get-financial-report/get-financial-report.component';
import { GetSalesReportComponent } from './pages/manufacturing/get-sales-report/get-sales-report.component';
import { ManufacturingBalanceSheetComponent } from './pages/manufacturing/manufacturing-balance-sheet/manufacturing-balance-sheet.component';
import { GetManufacturingBalanceSheetComponent } from './pages/manufacturing/get-manufacturing-balance-sheet/get-manufacturing-balance-sheet.component';
import { ManufacturingIncomeStatementComponent } from './pages/manufacturing/manufacturing-income-statement/manufacturing-income-statement.component';
import { GetIncomeStatementComponent } from './pages/manufacturing/get-income-statement/get-income-statement.component';
import { SymbolShareHoldersComponent } from './pages/symbol-share-holders/symbol-share-holders.component';
import { NonOperationalIncomeComponent } from './pages/manufacturing/non-operational-income/non-operational-income.component';
import { StatusOfViableCompaniesComponent } from './pages/status-of-viable-companies/status-of-viable-companies.component';
import { MonthlyActivityDetailComponent } from './pages/manufacturing/monthly-activity-detail/monthly-activity-detail.component';
import { InterpretativeReportSummaryPage5ListComponent } from './pages/manufacturing/interpretative-report-summary-page5/list/interpretative-report-summary-page5-list.component';
import { InterpretativeReportSummaryPage5DetailComponent } from './pages/manufacturing/interpretative-report-summary-page5/detail/interpretative-report-summary-page5-detail.component';
import { AnnualAssemblyListComponent } from './pages/manufacturing/annual-assembly/list/annual-assembly-list.component';
import { AnnualAssemblyDetailComponent } from './pages/manufacturing/annual-assembly/detail/annual-assembly-detail.component';
import { ExtraAnnualAssemblyListComponent } from './pages/manufacturing/extra-annual-assembly/list/extra-annual-assembly-list.component';
import { ExtraAnnualAssemblyDetailComponent } from './pages/manufacturing/extra-annual-assembly/detail/extra-annual-assembly-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'خانه' } },
  // { path: 'financial-report', component: FinancialReportComponent, data: { title: ' ثبت صورت های مالی ' } },
  { path: 'sales-report', component: SalesReportComponent, data: { title: ' ثبت فروش های ماهانه ' } },
  // { path: 'get-financial-report', component: GetFinancialReportComponent, data: { title: ' گزارش صورت های مالی ' } },
  { path: 'get-sales-report', component: GetSalesReportComponent, data: { title: ' گزارش فروش های ماهانه ' } },
  {
    path: 'manufacturing/balance-sheet', component: ManufacturingBalanceSheetComponent, data: { title: '  ثبت صورت وضعیت مالی تولیدی ' }
  },
  {
    path: 'manufacturing/balance-sheet-report', component: GetManufacturingBalanceSheetComponent, data: { title: '  گزارش صورت وضعیت مالی تولیدی ' }
  },
  {
    path: 'manufacturing/income-statement', component: ManufacturingIncomeStatementComponent, data: { title: '  ثبت صورت   سود و زیان ' }
  },
  {
    path: 'manufacturing/get-income-statement', component: GetIncomeStatementComponent, data: { title: '  گزارش صورت   سود و زیان ' }
  },
  {
    path: 'manufacturing/non-operational-income', component: NonOperationalIncomeComponent, data: { title: 'گزارش درآمد غیرعملیاتی' }
  },
  {
    path: 'symbol-share-holders', component: SymbolShareHoldersComponent  , data: { title: 'گزارش سهامداری' }
  },
  {
    path: 'status-of-viable-companies', component: StatusOfViableCompaniesComponent  , data: { title: 'گزارش تفسیری صفحه 4 - شرکت های سرمایه پذیر' }
  },
  {
    path: 'monthly-activity-detail/:id', component: MonthlyActivityDetailComponent, data: { title: 'جزئیات فعالیت ماهانه' }
  },
  {
    path: 'interpretative-report-summary-page5', component: InterpretativeReportSummaryPage5ListComponent, data: { title: 'گزیده گزارش تفسیری صفحه 5' }
  },
  {
    path: 'interpretative-report-summary-page5/:id', component: InterpretativeReportSummaryPage5DetailComponent, data: { title: 'جزئیات گزیده گزارش تفسیری صفحه 5' }
  },
  {
    path: 'annual-assembly', component: AnnualAssemblyListComponent, data: { title: 'تصمیمات مجمع عمومی عادی سالیانه' }
  },
  {
    path: 'annual-assembly/:id', component: AnnualAssemblyDetailComponent, data: { title: 'جزئیات تصمیمات مجمع عمومی عادی سالیانه' }
  },
  {
    path: 'extra-annual-assembly', component: ExtraAnnualAssemblyListComponent, data: { title: 'تصمیمات مجمع عمومی فوق‌العاده سالیانه' }
  },
  {
    path: 'extra-annual-assembly/:id', component: ExtraAnnualAssemblyDetailComponent, data: { title: 'جزئیات تصمیمات مجمع عمومی فوق‌العاده سالیانه' }
  },
  {
    path: '**',
    component: NotFoundComponent,
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
