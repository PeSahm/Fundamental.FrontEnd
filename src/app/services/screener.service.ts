import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, OperatorFunction } from 'rxjs';
import { SearchSymbol } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {

  constructor(private http: HttpClient) {

  }
  searchSymbol(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
    .get(`https://endpoint.stockscreeners.ir/symbols?Filter=${term}`)
    .pipe(map((response: any) => response.data));
  }
}
