import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { LeasingComprehensiveIncomeDetail, LeasingComprehensiveIncomeListItem } from '../models/leasing/comprehensive-income.model';

@Injectable({
  providedIn: 'root'
})
export class LeasingComprehensiveIncomeService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<LeasingComprehensiveIncomeListItem[]>> {
    return this.apiService.get<Result<LeasingComprehensiveIncomeListItem[]>>(API_ENDPOINTS.LEASING.COMPREHENSIVE_INCOME, params);
  }

  getById(id: string): Observable<DetailResult<LeasingComprehensiveIncomeDetail>> {
    return this.apiService.get<DetailResult<LeasingComprehensiveIncomeDetail>>(`${API_ENDPOINTS.LEASING.COMPREHENSIVE_INCOME}/${id}`);
  }
}
