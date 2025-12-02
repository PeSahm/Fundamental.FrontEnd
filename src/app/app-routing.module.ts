import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { title: 'خانه' } },
  // Lazy-loaded Manufacturing Module
  { 
    path: 'manufacturing', 
    loadChildren: () => import('./pages/manufacturing/manufacturing.module').then(m => m.ManufacturingModule)
  },
  // Manufacturing routes that don't have the 'manufacturing/' prefix
  { path: 'sales-report', redirectTo: '/manufacturing/sales-report' },
  { path: 'get-sales-report', redirectTo: '/manufacturing/get-sales-report' },
  { path: 'monthly-activity-detail/:id', redirectTo: '/manufacturing/monthly-activity-detail/:id' },
  { path: 'interpretative-report-summary-page5', redirectTo: '/manufacturing/interpretative-report-summary-page5' },
  { path: 'interpretative-report-summary-page5/:id', redirectTo: '/manufacturing/interpretative-report-summary-page5/:id' },
  { path: 'annual-assembly', redirectTo: '/manufacturing/annual-assembly' },
  { path: 'annual-assembly/:id', redirectTo: '/manufacturing/annual-assembly/:id' },
  { path: 'extra-annual-assembly', redirectTo: '/manufacturing/extra-annual-assembly' },
  { path: 'extra-annual-assembly/:id', redirectTo: '/manufacturing/extra-annual-assembly/:id' },
  { path: 'extra-assembly', redirectTo: '/manufacturing/extra-assembly' },
  { path: 'extra-assembly/:id', redirectTo: '/manufacturing/extra-assembly/:id' },
  // Lazy-loaded Symbol Share Holders Module
  {
    path: 'symbol-share-holders',
    loadChildren: () => import('./pages/symbol-share-holders/symbol-share-holders.module').then(m => m.SymbolShareHoldersModule)
  },
  // Lazy-loaded Status of Viable Companies Module
  {
    path: 'status-of-viable-companies',
    loadChildren: () => import('./pages/status-of-viable-companies/status-of-viable-companies.module').then(m => m.StatusOfViableCompaniesModule)
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

