import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { LeasingChangesInEquityDetail, LeasingChangesInEquityListItem } from '../models/leasing/changes-in-equity.model';

@Injectable({
  providedIn: 'root'
})
export class LeasingChangesInEquityService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<LeasingChangesInEquityListItem[]>> {
    return this.apiService.get<Result<LeasingChangesInEquityListItem[]>>(API_ENDPOINTS.LEASING.CHANGES_IN_EQUITY, params);
  }

  getById(id: string): Observable<DetailResult<LeasingChangesInEquityDetail>> {
    return this.apiService.get<DetailResult<LeasingChangesInEquityDetail>>(`${API_ENDPOINTS.LEASING.CHANGES_IN_EQUITY}/${id}`);
  }
}
