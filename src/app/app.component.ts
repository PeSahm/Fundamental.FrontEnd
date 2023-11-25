import { Component, OnInit } from '@angular/core';
import { ScreenerService } from './services/screener.service';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';
import { SearchSymbol, SymbolDetail } from './models/models';
import { HttpClient } from '@angular/common/http';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ScreenerService]
})
export class AppComponent implements OnInit {
  selectedSymbol = '';
  searching = false;
  searchFailed = false;
  title = 'screener';
  constructor(

    private service: ScreenerService,
    private http: HttpClient
  ) {

  }

  ngOnInit(): void {

  }





}
