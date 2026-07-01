import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { CapitalSupplyComprehensiveIncomeDetail, CapitalSupplyComprehensiveIncomeListItem } from '../models/capital-supply/comprehensive-income.model';

@Injectable({
  providedIn: 'root'
})
export class CapitalSupplyComprehensiveIncomeService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<CapitalSupplyComprehensiveIncomeListItem[]>> {
    return this.apiService.get<Result<CapitalSupplyComprehensiveIncomeListItem[]>>(API_ENDPOINTS.CAPITAL_SUPPLY.COMPREHENSIVE_INCOME, params);
  }

  getById(id: string): Observable<DetailResult<CapitalSupplyComprehensiveIncomeDetail>> {
    return this.apiService.get<DetailResult<CapitalSupplyComprehensiveIncomeDetail>>(`${API_ENDPOINTS.CAPITAL_SUPPLY.COMPREHENSIVE_INCOME}/${id}`);
  }
}
