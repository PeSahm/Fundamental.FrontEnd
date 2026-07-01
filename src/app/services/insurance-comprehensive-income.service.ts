import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { InsuranceComprehensiveIncomeDetail, InsuranceComprehensiveIncomeListItem } from '../models/insurance/comprehensive-income.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceComprehensiveIncomeService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<InsuranceComprehensiveIncomeListItem[]>> {
    return this.apiService.get<Result<InsuranceComprehensiveIncomeListItem[]>>(API_ENDPOINTS.INSURANCE.COMPREHENSIVE_INCOME, params);
  }

  getById(id: string): Observable<DetailResult<InsuranceComprehensiveIncomeDetail>> {
    return this.apiService.get<DetailResult<InsuranceComprehensiveIncomeDetail>>(`${API_ENDPOINTS.INSURANCE.COMPREHENSIVE_INCOME}/${id}`);
  }
}
