import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class InvestmentBalanceSheetService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<any> {
    return this.apiService.get(API_ENDPOINTS.INVESTMENT.BALANCE_SHEET, params);
  }

  getById(id: string): Observable<any> {
    return this.apiService.get(`${API_ENDPOINTS.INVESTMENT.BALANCE_SHEET}/${id}`);
  }
}
