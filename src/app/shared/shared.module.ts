import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Shared Components
import { TableComponent } from '../components/table/table.component';
import { SymbolSearchComponent } from '../components/symbol-search/symbol-search.component';
import { SearchFilterComponent } from '../components/search-filter/search-filter.component';

@NgModule({
  declarations: [
    TableComponent,
    SymbolSearchComponent,
    SearchFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    TableComponent,
    SymbolSearchComponent,
    SearchFilterComponent,
    // Re-export common modules so feature modules don't need to import them
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class SharedModule { }
