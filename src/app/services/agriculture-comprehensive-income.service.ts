import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { AgricultureComprehensiveIncomeDetail, AgricultureComprehensiveIncomeListItem } from '../models/agriculture/comprehensive-income.model';

@Injectable({
  providedIn: 'root'
})
export class AgricultureComprehensiveIncomeService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<AgricultureComprehensiveIncomeListItem[]>> {
    return this.apiService.get<Result<AgricultureComprehensiveIncomeListItem[]>>(API_ENDPOINTS.AGRICULTURE.COMPREHENSIVE_INCOME, params);
  }

  getById(id: string): Observable<DetailResult<AgricultureComprehensiveIncomeDetail>> {
    return this.apiService.get<DetailResult<AgricultureComprehensiveIncomeDetail>>(`${API_ENDPOINTS.AGRICULTURE.COMPREHENSIVE_INCOME}/${id}`);
  }
}
