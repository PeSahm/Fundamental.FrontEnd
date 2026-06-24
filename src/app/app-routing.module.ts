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
import { ExtraAssemblyListComponent } from './pages/manufacturing/extra-assembly/list/extra-assembly-list.component';
import { ExtraAssemblyDetailComponent } from './pages/manufacturing/extra-assembly/detail/extra-assembly-detail.component';

// Agriculture
import { AgricultureMonthlyActivityListComponent } from './pages/agriculture/monthly-activity-list/agriculture-monthly-activity-list.component';
import { AgricultureMonthlyActivityDetailComponent } from './pages/agriculture/monthly-activity-detail/agriculture-monthly-activity-detail.component';
import { AgricultureBalanceSheetListComponent } from './pages/agriculture/balance-sheet-list/agriculture-balance-sheet-list.component';
import { AgricultureIncomeStatementListComponent } from './pages/agriculture/income-statement-list/agriculture-income-statement-list.component';
import { AgricultureCashFlowListComponent } from './pages/agriculture/cash-flow-list/agriculture-cash-flow-list.component';
import { AgricultureComprehensiveIncomeListComponent } from './pages/agriculture/comprehensive-income-list/agriculture-comprehensive-income-list.component';
import { AgricultureChangesInEquityListComponent } from './pages/agriculture/changes-in-equity-list/agriculture-changes-in-equity-list.component';
import { AgricultureChangesInEquityDetailComponent } from './pages/agriculture/changes-in-equity-detail/agriculture-changes-in-equity-detail.component';

// ServicesIndustry
import { ServicesIndustryMonthlyActivityListComponent } from './pages/services-industry/monthly-activity-list/services-industry-monthly-activity-list.component';
import { ServicesIndustryMonthlyActivityDetailComponent } from './pages/services-industry/monthly-activity-detail/services-industry-monthly-activity-detail.component';
import { ServicesIndustryBalanceSheetListComponent } from './pages/services-industry/balance-sheet-list/services-industry-balance-sheet-list.component';
import { ServicesIndustryIncomeStatementListComponent } from './pages/services-industry/income-statement-list/services-industry-income-statement-list.component';
import { ServicesIndustryCashFlowListComponent } from './pages/services-industry/cash-flow-list/services-industry-cash-flow-list.component';
import { ServicesIndustryComprehensiveIncomeListComponent } from './pages/services-industry/comprehensive-income-list/services-industry-comprehensive-income-list.component';
import { ServicesIndustryChangesInEquityListComponent } from './pages/services-industry/changes-in-equity-list/services-industry-changes-in-equity-list.component';
import { ServicesIndustryChangesInEquityDetailComponent } from './pages/services-industry/changes-in-equity-detail/services-industry-changes-in-equity-detail.component';

// Structural
import { StructuralMonthlyActivityListComponent } from './pages/structural/monthly-activity-list/structural-monthly-activity-list.component';
import { StructuralMonthlyActivityDetailComponent } from './pages/structural/monthly-activity-detail/structural-monthly-activity-detail.component';
import { StructuralBalanceSheetListComponent } from './pages/structural/balance-sheet-list/structural-balance-sheet-list.component';
import { StructuralIncomeStatementListComponent } from './pages/structural/income-statement-list/structural-income-statement-list.component';
import { StructuralCashFlowListComponent } from './pages/structural/cash-flow-list/structural-cash-flow-list.component';
import { StructuralComprehensiveIncomeListComponent } from './pages/structural/comprehensive-income-list/structural-comprehensive-income-list.component';
import { StructuralChangesInEquityListComponent } from './pages/structural/changes-in-equity-list/structural-changes-in-equity-list.component';
import { StructuralChangesInEquityDetailComponent } from './pages/structural/changes-in-equity-detail/structural-changes-in-equity-detail.component';

// Investment
import { InvestmentBalanceSheetListComponent } from './pages/investment/balance-sheet-list/investment-balance-sheet-list.component';
import { InvestmentBalanceSheetDetailComponent } from './pages/investment/balance-sheet-detail/investment-balance-sheet-detail.component';
import { InvestmentIncomeStatementListComponent } from './pages/investment/income-statement-list/investment-income-statement-list.component';
import { InvestmentIncomeStatementDetailComponent } from './pages/investment/income-statement-detail/investment-income-statement-detail.component';
import { InvestmentCashFlowListComponent } from './pages/investment/cash-flow-list/investment-cash-flow-list.component';
import { InvestmentCashFlowDetailComponent } from './pages/investment/cash-flow-detail/investment-cash-flow-detail.component';
import { InvestmentPortfolioStatementListComponent } from './pages/investment/portfolio-statement-list/investment-portfolio-statement-list.component';
import { InvestmentPortfolioStatementDetailComponent } from './pages/investment/portfolio-statement-detail/investment-portfolio-statement-detail.component';

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
    path: 'extra-assembly', component: ExtraAssemblyListComponent, data: { title: 'تصمیمات مجمع عمومی فوق‌العاده' }
  },
  {
    path: 'extra-assembly/:id', component: ExtraAssemblyDetailComponent, data: { title: 'جزئیات تصمیمات مجمع عمومی فوق‌العاده' }
  },

  // Agriculture routes
  { path: 'agriculture/monthly-activity', component: AgricultureMonthlyActivityListComponent, data: { title: 'فعالیت ماهانه کشاورزی' } },
  { path: 'agriculture/monthly-activity/:id', component: AgricultureMonthlyActivityDetailComponent, data: { title: 'جزئیات فعالیت ماهانه کشاورزی' } },
  { path: 'agriculture/balance-sheet', component: AgricultureBalanceSheetListComponent, data: { title: 'صورت وضعیت مالی کشاورزی' } },
  { path: 'agriculture/income-statement', component: AgricultureIncomeStatementListComponent, data: { title: 'صورت سود و زیان کشاورزی' } },
  { path: 'agriculture/cash-flow', component: AgricultureCashFlowListComponent, data: { title: 'جریان وجوه نقد کشاورزی' } },
  { path: 'agriculture/comprehensive-income', component: AgricultureComprehensiveIncomeListComponent, data: { title: 'صورت سود و زیان جامع کشاورزی' } },
  { path: 'agriculture/changes-in-equity', component: AgricultureChangesInEquityListComponent, data: { title: 'صورت تغییرات در حقوق مالکانه کشاورزی' } },
  { path: 'agriculture/changes-in-equity/:id', component: AgricultureChangesInEquityDetailComponent, data: { title: 'جزئیات صورت تغییرات در حقوق مالکانه کشاورزی' } },

  // ServicesIndustry routes
  { path: 'services-industry/monthly-activity', component: ServicesIndustryMonthlyActivityListComponent, data: { title: 'فعالیت ماهانه خدمات' } },
  { path: 'services-industry/monthly-activity/:id', component: ServicesIndustryMonthlyActivityDetailComponent, data: { title: 'جزئیات فعالیت ماهانه خدمات' } },
  { path: 'services-industry/balance-sheet', component: ServicesIndustryBalanceSheetListComponent, data: { title: 'صورت وضعیت مالی خدمات' } },
  { path: 'services-industry/income-statement', component: ServicesIndustryIncomeStatementListComponent, data: { title: 'صورت سود و زیان خدمات' } },
  { path: 'services-industry/cash-flow', component: ServicesIndustryCashFlowListComponent, data: { title: 'جریان وجوه نقد خدمات' } },
  { path: 'services-industry/comprehensive-income', component: ServicesIndustryComprehensiveIncomeListComponent, data: { title: 'صورت سود و زیان جامع خدماتی' } },
  { path: 'services-industry/changes-in-equity', component: ServicesIndustryChangesInEquityListComponent, data: { title: 'صورت تغییرات در حقوق مالکانه خدماتی' } },
  { path: 'services-industry/changes-in-equity/:id', component: ServicesIndustryChangesInEquityDetailComponent, data: { title: 'جزئیات صورت تغییرات در حقوق مالکانه خدماتی' } },

  // Structural routes
  { path: 'structural/monthly-activity', component: StructuralMonthlyActivityListComponent, data: { title: 'فعالیت ماهانه ساختاری' } },
  { path: 'structural/monthly-activity/:id', component: StructuralMonthlyActivityDetailComponent, data: { title: 'جزئیات فعالیت ماهانه ساختاری' } },
  { path: 'structural/balance-sheet', component: StructuralBalanceSheetListComponent, data: { title: 'صورت وضعیت مالی ساختاری' } },
  { path: 'structural/income-statement', component: StructuralIncomeStatementListComponent, data: { title: 'صورت سود و زیان ساختاری' } },
  { path: 'structural/cash-flow', component: StructuralCashFlowListComponent, data: { title: 'جریان وجوه نقد ساختاری' } },
  { path: 'structural/comprehensive-income', component: StructuralComprehensiveIncomeListComponent, data: { title: 'صورت سود و زیان جامع ساختاری' } },
  { path: 'structural/changes-in-equity', component: StructuralChangesInEquityListComponent, data: { title: 'صورت تغییرات در حقوق مالکانه ساختاری' } },
  { path: 'structural/changes-in-equity/:id', component: StructuralChangesInEquityDetailComponent, data: { title: 'جزئیات صورت تغییرات در حقوق مالکانه ساختاری' } },

  // Investment routes (no monthly-activity)
  { path: 'investment/balance-sheet', component: InvestmentBalanceSheetListComponent, data: { title: 'صورت وضعیت مالی سرمایه‌گذاری' } },
  { path: 'investment/balance-sheet/:id', component: InvestmentBalanceSheetDetailComponent, data: { title: 'جزئیات صورت وضعیت مالی سرمایه‌گذاری' } },
  { path: 'investment/income-statement', component: InvestmentIncomeStatementListComponent, data: { title: 'صورت سود و زیان سرمایه‌گذاری' } },
  { path: 'investment/income-statement/:id', component: InvestmentIncomeStatementDetailComponent, data: { title: 'جزئیات صورت سود و زیان سرمایه‌گذاری' } },
  { path: 'investment/cash-flow', component: InvestmentCashFlowListComponent, data: { title: 'جریان وجوه نقد سرمایه‌گذاری' } },
  { path: 'investment/cash-flow/:id', component: InvestmentCashFlowDetailComponent, data: { title: 'جزئیات جریان وجوه نقد سرمایه‌گذاری' } },
  { path: 'investment/portfolio-statement', component: InvestmentPortfolioStatementListComponent, data: { title: 'صورت سبد سهام سرمایه‌گذاری' } },
  { path: 'investment/portfolio-statement/:id', component: InvestmentPortfolioStatementDetailComponent, data: { title: 'جزئیات صورت سبد سهام سرمایه‌گذاری' } },

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
