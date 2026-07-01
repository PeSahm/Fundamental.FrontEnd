import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { CapitalSupplyChangesInEquityDetail, CapitalSupplyChangesInEquityListItem } from '../models/capital-supply/changes-in-equity.model';

@Injectable({
  providedIn: 'root'
})
export class CapitalSupplyChangesInEquityService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<CapitalSupplyChangesInEquityListItem[]>> {
    return this.apiService.get<Result<CapitalSupplyChangesInEquityListItem[]>>(API_ENDPOINTS.CAPITAL_SUPPLY.CHANGES_IN_EQUITY, params);
  }

  getById(id: string): Observable<DetailResult<CapitalSupplyChangesInEquityDetail>> {
    return this.apiService.get<DetailResult<CapitalSupplyChangesInEquityDetail>>(`${API_ENDPOINTS.CAPITAL_SUPPLY.CHANGES_IN_EQUITY}/${id}`);
  }
}
