import { Component } from '@angular/core';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ScreenerService } from 'src/app/services/screener.service';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class FinancialReportComponent {
   constructor(
    private service: ScreenerService,
   ){

   }
  selectedSymbol = '';
  searching = false;
  searchFailed = false;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        //this.http.get<SearchSymbol>(`https://endpoint.stockscreeners.ir/symbols?Filter=${term}`)
        this.service.searchSymbol(term)
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => of<SearchSymbol>({ success: false, data: [], error: null }))
          )
      ),
      switchMap(result => of(result)),
      tap(() => (this.searching = false)),
    );
  resultFormatter = (result: SymbolDetail) => result.name + ' - ' + result.title;
  inputFormatter = (result: SymbolDetail) => result.name;
  onSelect(event: NgbTypeaheadSelectItemEvent) {

  }

}
