import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Shared Module
import { SharedModule } from '../../shared/shared.module';

// Components
import { SymbolShareHoldersComponent } from './symbol-share-holders.component';
import { ShareHoldersModalComponent } from './share-holders-modal/share-holders-modal.component';

const routes: Routes = [
  { path: '', component: SymbolShareHoldersComponent, data: { title: 'گزارش سهامداری' } }
];

@NgModule({
  declarations: [
    SymbolShareHoldersComponent,
    ShareHoldersModalComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SymbolShareHoldersModule { }
