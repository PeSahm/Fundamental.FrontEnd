import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { AgricultureChangesInEquityDetail, AgricultureChangesInEquityListItem } from '../models/agriculture/changes-in-equity.model';

@Injectable({
  providedIn: 'root'
})
export class AgricultureChangesInEquityService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<AgricultureChangesInEquityListItem[]>> {
    return this.apiService.get<Result<AgricultureChangesInEquityListItem[]>>(API_ENDPOINTS.AGRICULTURE.CHANGES_IN_EQUITY, params);
  }

  getById(id: string): Observable<DetailResult<AgricultureChangesInEquityDetail>> {
    return this.apiService.get<DetailResult<AgricultureChangesInEquityDetail>>(`${API_ENDPOINTS.AGRICULTURE.CHANGES_IN_EQUITY}/${id}`);
  }
}
