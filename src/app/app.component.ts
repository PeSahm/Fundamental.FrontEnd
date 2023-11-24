import { Component, OnInit } from '@angular/core';
import { ScreenerService } from './services/screener.service';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[ScreenerService]
})
export class AppComponent implements OnInit {
  model: any;
	searching = false;
	searchFailed = false;
  title = 'screener';
  constructor(

    private service: ScreenerService
  ) {

  }

  ngOnInit(): void {

  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap((term) =>
        this.service.searchSymbol(term)  
        .pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }),
        ),
      ),
      tap(() => (this.searching = false)),
    );

}
