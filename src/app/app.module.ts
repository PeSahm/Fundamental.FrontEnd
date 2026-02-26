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
import { AgricultureBalanceSheetDetailComponent } from './pages/agriculture/balance-sheet-detail/agriculture-balance-sheet-detail.component';
import { AgricultureIncomeStatementListComponent } from './pages/agriculture/income-statement-list/agriculture-income-statement-list.component';
import { AgricultureIncomeStatementDetailComponent } from './pages/agriculture/income-statement-detail/agriculture-income-statement-detail.component';
import { AgricultureCashFlowListComponent } from './pages/agriculture/cash-flow-list/agriculture-cash-flow-list.component';
import { AgricultureCashFlowDetailComponent } from './pages/agriculture/cash-flow-detail/agriculture-cash-flow-detail.component';

// ServicesIndustry components
import { ServicesIndustryMonthlyActivityListComponent } from './pages/services-industry/monthly-activity-list/services-industry-monthly-activity-list.component';
import { ServicesIndustryMonthlyActivityDetailComponent } from './pages/services-industry/monthly-activity-detail/services-industry-monthly-activity-detail.component';
import { ServicesIndustryBalanceSheetListComponent } from './pages/services-industry/balance-sheet-list/services-industry-balance-sheet-list.component';
import { ServicesIndustryBalanceSheetDetailComponent } from './pages/services-industry/balance-sheet-detail/services-industry-balance-sheet-detail.component';
import { ServicesIndustryIncomeStatementListComponent } from './pages/services-industry/income-statement-list/services-industry-income-statement-list.component';
import { ServicesIndustryIncomeStatementDetailComponent } from './pages/services-industry/income-statement-detail/services-industry-income-statement-detail.component';
import { ServicesIndustryCashFlowListComponent } from './pages/services-industry/cash-flow-list/services-industry-cash-flow-list.component';
import { ServicesIndustryCashFlowDetailComponent } from './pages/services-industry/cash-flow-detail/services-industry-cash-flow-detail.component';

// Structural components
import { StructuralMonthlyActivityListComponent } from './pages/structural/monthly-activity-list/structural-monthly-activity-list.component';
import { StructuralMonthlyActivityDetailComponent } from './pages/structural/monthly-activity-detail/structural-monthly-activity-detail.component';
import { StructuralBalanceSheetListComponent } from './pages/structural/balance-sheet-list/structural-balance-sheet-list.component';
import { StructuralBalanceSheetDetailComponent } from './pages/structural/balance-sheet-detail/structural-balance-sheet-detail.component';
import { StructuralIncomeStatementListComponent } from './pages/structural/income-statement-list/structural-income-statement-list.component';
import { StructuralIncomeStatementDetailComponent } from './pages/structural/income-statement-detail/structural-income-statement-detail.component';
import { StructuralCashFlowListComponent } from './pages/structural/cash-flow-list/structural-cash-flow-list.component';
import { StructuralCashFlowDetailComponent } from './pages/structural/cash-flow-detail/structural-cash-flow-detail.component';

// Investment components
import { InvestmentBalanceSheetListComponent } from './pages/investment/balance-sheet-list/investment-balance-sheet-list.component';
import { InvestmentBalanceSheetDetailComponent } from './pages/investment/balance-sheet-detail/investment-balance-sheet-detail.component';
import { InvestmentIncomeStatementListComponent } from './pages/investment/income-statement-list/investment-income-statement-list.component';
import { InvestmentIncomeStatementDetailComponent } from './pages/investment/income-statement-detail/investment-income-statement-detail.component';
import { InvestmentCashFlowListComponent } from './pages/investment/cash-flow-list/investment-cash-flow-list.component';
import { InvestmentCashFlowDetailComponent } from './pages/investment/cash-flow-detail/investment-cash-flow-detail.component';
import { InvestmentPortfolioStatementListComponent } from './pages/investment/portfolio-statement-list/investment-portfolio-statement-list.component';
import { InvestmentPortfolioStatementDetailComponent } from './pages/investment/portfolio-statement-detail/investment-portfolio-statement-detail.component';

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
    AgricultureBalanceSheetDetailComponent,
    AgricultureIncomeStatementListComponent,
    AgricultureIncomeStatementDetailComponent,
    AgricultureCashFlowListComponent,
    AgricultureCashFlowDetailComponent,

    // ServicesIndustry components
    ServicesIndustryMonthlyActivityListComponent,
    ServicesIndustryMonthlyActivityDetailComponent,
    ServicesIndustryBalanceSheetListComponent,
    ServicesIndustryBalanceSheetDetailComponent,
    ServicesIndustryIncomeStatementListComponent,
    ServicesIndustryIncomeStatementDetailComponent,
    ServicesIndustryCashFlowListComponent,
    ServicesIndustryCashFlowDetailComponent,

    // Structural components
    StructuralMonthlyActivityListComponent,
    StructuralMonthlyActivityDetailComponent,
    StructuralBalanceSheetListComponent,
    StructuralBalanceSheetDetailComponent,
    StructuralIncomeStatementListComponent,
    StructuralIncomeStatementDetailComponent,
    StructuralCashFlowListComponent,
    StructuralCashFlowDetailComponent,

    // Investment components
    InvestmentBalanceSheetListComponent,
    InvestmentBalanceSheetDetailComponent,
    InvestmentIncomeStatementListComponent,
    InvestmentIncomeStatementDetailComponent,
    InvestmentCashFlowListComponent,
    InvestmentCashFlowDetailComponent,
    InvestmentPortfolioStatementListComponent,
    InvestmentPortfolioStatementDetailComponent,
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
