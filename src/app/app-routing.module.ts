import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FinancialReportComponent } from './pages/financial-report/financial-report.component';
import { SalesReportComponent } from './pages/sales-report/sales-report.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { GetFinancialReportComponent } from './pages/get-financial-report/get-financial-report.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'financial-report', component: FinancialReportComponent },
  { path: 'sales-report', component: SalesReportComponent },
  { path: 'get-financial-report', component: GetFinancialReportComponent },
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
