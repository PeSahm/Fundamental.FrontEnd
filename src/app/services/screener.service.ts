import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, OperatorFunction } from 'rxjs';
import { MonthlyActivity, SearchSymbol, Statement } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {

  constructor(private http: HttpClient) {

  }
  searchSymbol(term: string) {
    if (term === '' || term.length < 2) {
      return of([]);
    }
    return this.http
      .get<SearchSymbol>(`https://api.stockscreeners.ir/symbols?Filter=${term}`)
      .pipe(map((response: SearchSymbol) => response.data));
  }

  registerStatement(command: Statement) {
    return this.http.post('https://api.stockscreeners.ir/statements', command)
  }






}
