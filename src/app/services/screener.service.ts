import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { SearchSymbol, Statement } from '../models/models';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {

  constructor(private apiService: ApiService) { }
  searchSymbol(term: string) {
    if (term === '' || term.length < 2) {
      return of([]);
    }
    return this.apiService
      .get<SearchSymbol>(`${API_ENDPOINTS.SYMBOLS}?Filter=${term}`)
      .pipe(map((response: SearchSymbol) => response.data));
  }

  registerStatement(command: Statement) {
    return this.apiService.post(API_ENDPOINTS.STATEMENTS, command);
  }






}
