import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { StructuralComprehensiveIncomeDetail, StructuralComprehensiveIncomeListItem } from '../models/structural/comprehensive-income.model';

@Injectable({
  providedIn: 'root'
})
export class StructuralComprehensiveIncomeService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<StructuralComprehensiveIncomeListItem[]>> {
    return this.apiService.get<Result<StructuralComprehensiveIncomeListItem[]>>(API_ENDPOINTS.STRUCTURAL.COMPREHENSIVE_INCOME, params);
  }

  getById(id: string): Observable<DetailResult<StructuralComprehensiveIncomeDetail>> {
    return this.apiService.get<DetailResult<StructuralComprehensiveIncomeDetail>>(`${API_ENDPOINTS.STRUCTURAL.COMPREHENSIVE_INCOME}/${id}`);
  }
}
