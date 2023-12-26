import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbAccordionModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { FinancialReportComponent } from './pages/financial-report/financial-report.component';
import { SalesReportComponent } from './pages/manufacturing/sales-report/sales-report.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { GetFinancialReportComponent } from './pages/get-financial-report/get-financial-report.component';
import { IConfig, NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { GetSalesReportComponent } from './pages/manufacturing/get-sales-report/get-sales-report.component';
import { TableComponent } from './components/table/table.component';
import { ManufacturingBalanceSheetComponent } from './pages/manufacturing/manufacturing-balance-sheet/manufacturing-balance-sheet.component';

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
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
