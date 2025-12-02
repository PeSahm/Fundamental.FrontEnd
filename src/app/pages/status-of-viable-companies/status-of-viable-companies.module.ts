import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

// Components
import { StatusOfViableCompaniesComponent } from './status-of-viable-companies.component';
import { ViableCompanyReviewModalComponent } from './viable-company-review-modal/viable-company-review-modal.component';

const routes: Routes = [
  { path: '', component: StatusOfViableCompaniesComponent, data: { title: 'گزارش تفسیری صفحه 4 - شرکت های سرمایه پذیر' } }
];

@NgModule({
  declarations: [
    StatusOfViableCompaniesComponent,
    ViableCompanyReviewModalComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class StatusOfViableCompaniesModule { }
