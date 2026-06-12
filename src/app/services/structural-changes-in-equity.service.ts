import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { StructuralChangesInEquityDetail, StructuralChangesInEquityListItem } from '../models/structural/changes-in-equity.model';

@Injectable({
  providedIn: 'root'
})
export class StructuralChangesInEquityService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<StructuralChangesInEquityListItem[]>> {
    return this.apiService.get<Result<StructuralChangesInEquityListItem[]>>(API_ENDPOINTS.STRUCTURAL.CHANGES_IN_EQUITY, params);
  }

  getById(id: string): Observable<DetailResult<StructuralChangesInEquityDetail>> {
    return this.apiService.get<DetailResult<StructuralChangesInEquityDetail>>(`${API_ENDPOINTS.STRUCTURAL.CHANGES_IN_EQUITY}/${id}`);
  }
}
