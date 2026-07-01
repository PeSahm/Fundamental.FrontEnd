import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { BankComprehensiveIncomeDetail, BankComprehensiveIncomeListItem } from '../models/bank/comprehensive-income.model';

@Injectable({
  providedIn: 'root'
})
export class BankComprehensiveIncomeService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<BankComprehensiveIncomeListItem[]>> {
    return this.apiService.get<Result<BankComprehensiveIncomeListItem[]>>(API_ENDPOINTS.BANK.COMPREHENSIVE_INCOME, params);
  }

  getById(id: string): Observable<DetailResult<BankComprehensiveIncomeDetail>> {
    return this.apiService.get<DetailResult<BankComprehensiveIncomeDetail>>(`${API_ENDPOINTS.BANK.COMPREHENSIVE_INCOME}/${id}`);
  }
}
