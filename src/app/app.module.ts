import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAccordionModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import * as Sentry from '@sentry/angular-ivy';
import { HomeComponent } from './pages/home/home.component';
import { FinancialReportComponent } from './pages/manufacturing/financial-report/financial-report.component';
import { SalesReportComponent } from './pages/manufacturing/sales-report/sales-report.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GetFinancialReportComponent } from './pages/manufacturing/get-financial-report/get-financial-report.component';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { GetSalesReportComponent } from './pages/manufacturing/get-sales-report/get-sales-report.component';
import { TableComponent } from './components/table/table.component';
import { ManufacturingBalanceSheetComponent } from './pages/manufacturing/manufacturing-balance-sheet/manufacturing-balance-sheet.component';
import { GetManufacturingBalanceSheetComponent } from './pages/manufacturing/get-manufacturing-balance-sheet/get-manufacturing-balance-sheet.component';
import { ManufacturingIncomeStatementComponent } from './pages/manufacturing/manufacturing-income-statement/manufacturing-income-statement.component';
import { GetIncomeStatementComponent } from './pages/manufacturing/get-income-statement/get-income-statement.component';
import { SymbolSearchComponent } from './components/symbol-search/symbol-search.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { SymbolShareHoldersComponent } from './pages/symbol-share-holders/symbol-share-holders.component';
import { ShareHoldersModalComponent } from './pages/symbol-share-holders/share-holders-modal/share-holders-modal.component';
import { NonOperationalIncomeComponent } from './pages/manufacturing/non-operational-income/non-operational-income.component';
import { StatusOfViableCompaniesComponent } from './pages/status-of-viable-companies/status-of-viable-companies.component';
import { ViableCompanyReviewModalComponent } from './pages/status-of-viable-companies/viable-company-review-modal/viable-company-review-modal.component';
import { NonOperationalIncomeTagModalComponent } from './pages/manufacturing/non-operational-income/non-operational-income-tag-modal/non-operational-income-tag-modal.component';
import { MonthlyActivityDetailComponent } from './pages/manufacturing/monthly-activity-detail/monthly-activity-detail.component';
import { InterpretativeReportSummaryPage5ListComponent } from './pages/manufacturing/interpretative-report-summary-page5/list/interpretative-report-summary-page5-list.component';
import { InterpretativeReportSummaryPage5DetailComponent } from './pages/manufacturing/interpretative-report-summary-page5/detail/interpretative-report-summary-page5-detail.component';
import { AnnualAssemblyListComponent } from './pages/manufacturing/annual-assembly/list/annual-assembly-list.component';
import { AnnualAssemblyDetailComponent } from './pages/manufacturing/annual-assembly/detail/annual-assembly-detail.component';
import { ExtraAnnualAssemblyListComponent } from './pages/manufacturing/extra-annual-assembly/list/extra-annual-assembly-list.component';
import { ExtraAnnualAssemblyDetailComponent } from './pages/manufacturing/extra-annual-assembly/detail/extra-annual-assembly-detail.component';
import { ExtraAssemblyListComponent } from './pages/manufacturing/extra-assembly/list/extra-assembly-list.component';
import { ExtraAssemblyDetailComponent } from './pages/manufacturing/extra-assembly/detail/extra-assembly-detail.component';

// Agriculture components
import { AgricultureMonthlyActivityListComponent } from './pages/agriculture/monthly-activity-list/agriculture-monthly-activity-list.component';
import { AgricultureMonthlyActivityDetailComponent } from './pages/agriculture/monthly-activity-detail/agriculture-monthly-activity-detail.component';
import { AgricultureBalanceSheetListComponent } from './pages/agriculture/balance-sheet-list/agriculture-balance-sheet-list.component';
import { AgricultureIncomeStatementListComponent } from './pages/agriculture/income-statement-list/agriculture-income-statement-list.component';
import { AgricultureCashFlowListComponent } from './pages/agriculture/cash-flow-list/agriculture-cash-flow-list.component';
import { AgricultureComprehensiveIncomeListComponent } from './pages/agriculture/comprehensive-income-list/agriculture-comprehensive-income-list.component';
import { AgricultureChangesInEquityListComponent } from './pages/agriculture/changes-in-equity-list/agriculture-changes-in-equity-list.component';
import { AgricultureChangesInEquityDetailComponent } from './pages/agriculture/changes-in-equity-detail/agriculture-changes-in-equity-detail.component';

// ServicesIndustry components
import { ServicesIndustryMonthlyActivityListComponent } from './pages/services-industry/monthly-activity-list/services-industry-monthly-activity-list.component';
import { ServicesIndustryMonthlyActivityDetailComponent } from './pages/services-industry/monthly-activity-detail/services-industry-monthly-activity-detail.component';
import { ServicesIndustryBalanceSheetListComponent } from './pages/services-industry/balance-sheet-list/services-industry-balance-sheet-list.component';
import { ServicesIndustryIncomeStatementListComponent } from './pages/services-industry/income-statement-list/services-industry-income-statement-list.component';
import { ServicesIndustryCashFlowListComponent } from './pages/services-industry/cash-flow-list/services-industry-cash-flow-list.component';
import { ServicesIndustryComprehensiveIncomeListComponent } from './pages/services-industry/comprehensive-income-list/services-industry-comprehensive-income-list.component';
import { ServicesIndustryChangesInEquityListComponent } from './pages/services-industry/changes-in-equity-list/services-industry-changes-in-equity-list.component';
import { ServicesIndustryChangesInEquityDetailComponent } from './pages/services-industry/changes-in-equity-detail/services-industry-changes-in-equity-detail.component';

// Structural components
import { StructuralMonthlyActivityListComponent } from './pages/structural/monthly-activity-list/structural-monthly-activity-list.component';
import { StructuralMonthlyActivityDetailComponent } from './pages/structural/monthly-activity-detail/structural-monthly-activity-detail.component';
import { StructuralBalanceSheetListComponent } from './pages/structural/balance-sheet-list/structural-balance-sheet-list.component';
import { StructuralIncomeStatementListComponent } from './pages/structural/income-statement-list/structural-income-statement-list.component';
import { StructuralCashFlowListComponent } from './pages/structural/cash-flow-list/structural-cash-flow-list.component';
import { StructuralComprehensiveIncomeListComponent } from './pages/structural/comprehensive-income-list/structural-comprehensive-income-list.component';
import { StructuralChangesInEquityListComponent } from './pages/structural/changes-in-equity-list/structural-changes-in-equity-list.component';
import { StructuralChangesInEquityDetailComponent } from './pages/structural/changes-in-equity-detail/structural-changes-in-equity-detail.component';

// Investment components
import { InvestmentBalanceSheetListComponent } from './pages/investment/balance-sheet-list/investment-balance-sheet-list.component';
import { InvestmentIncomeStatementListComponent } from './pages/investment/income-statement-list/investment-income-statement-list.component';
import { InvestmentCashFlowListComponent } from './pages/investment/cash-flow-list/investment-cash-flow-list.component';
import { InvestmentPortfolioStatementListComponent } from './pages/investment/portfolio-statement-list/investment-portfolio-statement-list.component';
import { InvestmentPortfolioStatementDetailComponent } from './pages/investment/portfolio-statement-detail/investment-portfolio-statement-detail.component';

// Bank components
import { BankMonthlyActivityListComponent } from './pages/bank/monthly-activity-list/bank-monthly-activity-list.component';
import { BankMonthlyActivityDetailComponent } from './pages/bank/monthly-activity-detail/bank-monthly-activity-detail.component';
import { BankBalanceSheetListComponent } from './pages/bank/balance-sheet-list/bank-balance-sheet-list.component';
import { BankIncomeStatementListComponent } from './pages/bank/income-statement-list/bank-income-statement-list.component';
import { BankCashFlowListComponent } from './pages/bank/cash-flow-list/bank-cash-flow-list.component';
import { BankComprehensiveIncomeListComponent } from './pages/bank/comprehensive-income-list/bank-comprehensive-income-list.component';
import { BankChangesInEquityListComponent } from './pages/bank/changes-in-equity-list/bank-changes-in-equity-list.component';
import { BankChangesInEquityDetailComponent } from './pages/bank/changes-in-equity-detail/bank-changes-in-equity-detail.component';

// Leasing components
import { LeasingMonthlyActivityListComponent } from './pages/leasing/monthly-activity-list/leasing-monthly-activity-list.component';
import { LeasingMonthlyActivityDetailComponent } from './pages/leasing/monthly-activity-detail/leasing-monthly-activity-detail.component';
import { LeasingBalanceSheetListComponent } from './pages/leasing/balance-sheet-list/leasing-balance-sheet-list.component';
import { LeasingIncomeStatementListComponent } from './pages/leasing/income-statement-list/leasing-income-statement-list.component';
import { LeasingCashFlowListComponent } from './pages/leasing/cash-flow-list/leasing-cash-flow-list.component';
import { LeasingComprehensiveIncomeListComponent } from './pages/leasing/comprehensive-income-list/leasing-comprehensive-income-list.component';
import { LeasingChangesInEquityListComponent } from './pages/leasing/changes-in-equity-list/leasing-changes-in-equity-list.component';
import { LeasingChangesInEquityDetailComponent } from './pages/leasing/changes-in-equity-detail/leasing-changes-in-equity-detail.component';

// Insurance components
import { InsuranceMonthlyActivityListComponent } from './pages/insurance/monthly-activity-list/insurance-monthly-activity-list.component';
import { InsuranceMonthlyActivityDetailComponent } from './pages/insurance/monthly-activity-detail/insurance-monthly-activity-detail.component';
import { InsuranceBalanceSheetListComponent } from './pages/insurance/balance-sheet-list/insurance-balance-sheet-list.component';
import { InsuranceIncomeStatementListComponent } from './pages/insurance/income-statement-list/insurance-income-statement-list.component';
import { InsuranceCashFlowListComponent } from './pages/insurance/cash-flow-list/insurance-cash-flow-list.component';
import { InsuranceComprehensiveIncomeListComponent } from './pages/insurance/comprehensive-income-list/insurance-comprehensive-income-list.component';
import { InsuranceChangesInEquityListComponent } from './pages/insurance/changes-in-equity-list/insurance-changes-in-equity-list.component';
import { InsuranceChangesInEquityDetailComponent } from './pages/insurance/changes-in-equity-detail/insurance-changes-in-equity-detail.component';

// CapitalSupply components
import { CapitalSupplyMonthlyActivityListComponent } from './pages/capital-supply/monthly-activity-list/capital-supply-monthly-activity-list.component';
import { CapitalSupplyMonthlyActivityDetailComponent } from './pages/capital-supply/monthly-activity-detail/capital-supply-monthly-activity-detail.component';
import { CapitalSupplyBalanceSheetListComponent } from './pages/capital-supply/balance-sheet-list/capital-supply-balance-sheet-list.component';
import { CapitalSupplyIncomeStatementListComponent } from './pages/capital-supply/income-statement-list/capital-supply-income-statement-list.component';
import { CapitalSupplyCashFlowListComponent } from './pages/capital-supply/cash-flow-list/capital-supply-cash-flow-list.component';
import { CapitalSupplyComprehensiveIncomeListComponent } from './pages/capital-supply/comprehensive-income-list/capital-supply-comprehensive-income-list.component';
import { CapitalSupplyChangesInEquityListComponent } from './pages/capital-supply/changes-in-equity-list/capital-supply-changes-in-equity-list.component';
import { CapitalSupplyChangesInEquityDetailComponent } from './pages/capital-supply/changes-in-equity-detail/capital-supply-changes-in-equity-detail.component';

// Shared pipes
import { PersianNumberPipe } from './pipes/persian-number.pipe';
import { JalaliDatePipe } from './pipes/jalali-date.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FinancialReportComponent,
    SalesReportComponent,
    NotFoundComponent,
    SidebarComponent,
    GetFinancialReportComponent,
    GetSalesReportComponent,
    TableComponent,
    ManufacturingBalanceSheetComponent,
    GetManufacturingBalanceSheetComponent,
    ManufacturingIncomeStatementComponent,
    GetIncomeStatementComponent,
    SymbolSearchComponent,
    SearchFilterComponent,
    SymbolShareHoldersComponent,
    ShareHoldersModalComponent,
    NonOperationalIncomeComponent,
    StatusOfViableCompaniesComponent,
    ViableCompanyReviewModalComponent,
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

    // Agriculture components
    AgricultureMonthlyActivityListComponent,
    AgricultureMonthlyActivityDetailComponent,
    AgricultureBalanceSheetListComponent,
    AgricultureIncomeStatementListComponent,
    AgricultureCashFlowListComponent,
    AgricultureComprehensiveIncomeListComponent,
    AgricultureChangesInEquityListComponent,
    AgricultureChangesInEquityDetailComponent,

    // ServicesIndustry components
    ServicesIndustryMonthlyActivityListComponent,
    ServicesIndustryMonthlyActivityDetailComponent,
    ServicesIndustryBalanceSheetListComponent,
    ServicesIndustryIncomeStatementListComponent,
    ServicesIndustryCashFlowListComponent,
    ServicesIndustryComprehensiveIncomeListComponent,
    ServicesIndustryChangesInEquityListComponent,
    ServicesIndustryChangesInEquityDetailComponent,

    // Structural components
    StructuralMonthlyActivityListComponent,
    StructuralMonthlyActivityDetailComponent,
    StructuralBalanceSheetListComponent,
    StructuralIncomeStatementListComponent,
    StructuralCashFlowListComponent,
    StructuralComprehensiveIncomeListComponent,
    StructuralChangesInEquityListComponent,
    StructuralChangesInEquityDetailComponent,

    // Investment components
    InvestmentBalanceSheetListComponent,
    InvestmentIncomeStatementListComponent,
    InvestmentCashFlowListComponent,
    InvestmentPortfolioStatementListComponent,
    InvestmentPortfolioStatementDetailComponent,

    // Bank components
    BankMonthlyActivityListComponent,
    BankMonthlyActivityDetailComponent,
    BankBalanceSheetListComponent,
    BankIncomeStatementListComponent,
    BankCashFlowListComponent,
    BankComprehensiveIncomeListComponent,
    BankChangesInEquityListComponent,
    BankChangesInEquityDetailComponent,

    // Leasing components
    LeasingMonthlyActivityListComponent,
    LeasingMonthlyActivityDetailComponent,
    LeasingBalanceSheetListComponent,
    LeasingIncomeStatementListComponent,
    LeasingCashFlowListComponent,
    LeasingComprehensiveIncomeListComponent,
    LeasingChangesInEquityListComponent,
    LeasingChangesInEquityDetailComponent,

    // Insurance components
    InsuranceMonthlyActivityListComponent,
    InsuranceMonthlyActivityDetailComponent,
    InsuranceBalanceSheetListComponent,
    InsuranceIncomeStatementListComponent,
    InsuranceCashFlowListComponent,
    InsuranceComprehensiveIncomeListComponent,
    InsuranceChangesInEquityListComponent,
    InsuranceChangesInEquityDetailComponent,

    // CapitalSupply components
    CapitalSupplyMonthlyActivityListComponent,
    CapitalSupplyMonthlyActivityDetailComponent,
    CapitalSupplyBalanceSheetListComponent,
    CapitalSupplyIncomeStatementListComponent,
    CapitalSupplyCashFlowListComponent,
    CapitalSupplyComprehensiveIncomeListComponent,
    CapitalSupplyChangesInEquityListComponent,
    CapitalSupplyChangesInEquityDetailComponent,

    // Shared pipes
    PersianNumberPipe,
    JalaliDatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbTypeaheadModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      positionClass:'toast-top-left',
      timeOut:5000,
      closeButton:true
    }), // ToastrModule added,
    NgbAccordionModule,
    NgbPaginationModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  providers: [
    provideNgxMask(),
    // Sentry Error Handler - captures Angular errors
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false, // Don't show dialog on errors
        logErrors: true, // Also log to console
      }),
    },
    // Sentry Tracing - captures route changes for performance monitoring
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
