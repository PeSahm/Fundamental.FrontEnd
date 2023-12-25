import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FinancialReportComponent } from './pages/financial-report/financial-report.component';
import { SalesReportComponent } from './pages/sales-report/sales-report.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GetFinancialReportComponent } from './pages/get-financial-report/get-financial-report.component';
import { GetSalesReportComponent } from './pages/get-sales-report/get-sales-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'خانه' } },
  { path: 'financial-report', component: FinancialReportComponent, data: { title: ' ثبت صورت های مالی ' } },
  { path: 'sales-report', component: SalesReportComponent, data: { title: ' ثبت فروش های ماهانه ' } },
  { path: 'get-financial-report', component: GetFinancialReportComponent, data: { title: ' گزارش صورت های مالی ' } },
  { path: 'get-sales-report', component: GetSalesReportComponent, data: { title: ' گزارش فروش های ماهانه ' } },
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
