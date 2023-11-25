import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {  HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { FinancialReportComponent } from './pages/financial-report/financial-report.component';
import { SalesReportComponent } from './pages/sales-report/sales-report.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FinancialReportComponent,
    SalesReportComponent,
    NotFoundComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbTypeaheadModule, FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
