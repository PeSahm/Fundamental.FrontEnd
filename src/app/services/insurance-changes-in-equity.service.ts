import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { InsuranceChangesInEquityDetail, InsuranceChangesInEquityListItem } from '../models/insurance/changes-in-equity.model';

@Injectable({
  providedIn: 'root'
})
export class InsuranceChangesInEquityService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<InsuranceChangesInEquityListItem[]>> {
    return this.apiService.get<Result<InsuranceChangesInEquityListItem[]>>(API_ENDPOINTS.INSURANCE.CHANGES_IN_EQUITY, params);
  }

  getById(id: string): Observable<DetailResult<InsuranceChangesInEquityDetail>> {
    return this.apiService.get<DetailResult<InsuranceChangesInEquityDetail>>(`${API_ENDPOINTS.INSURANCE.CHANGES_IN_EQUITY}/${id}`);
  }
}
