import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { ServicesIndustryComprehensiveIncomeDetail, ServicesIndustryComprehensiveIncomeListItem } from '../models/services-industry/comprehensive-income.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesIndustryComprehensiveIncomeService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<ServicesIndustryComprehensiveIncomeListItem[]>> {
    return this.apiService.get<Result<ServicesIndustryComprehensiveIncomeListItem[]>>(API_ENDPOINTS.SERVICES_INDUSTRY.COMPREHENSIVE_INCOME, params);
  }

  getById(id: string): Observable<DetailResult<ServicesIndustryComprehensiveIncomeDetail>> {
    return this.apiService.get<DetailResult<ServicesIndustryComprehensiveIncomeDetail>>(`${API_ENDPOINTS.SERVICES_INDUSTRY.COMPREHENSIVE_INCOME}/${id}`);
  }
}
