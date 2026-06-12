import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { ServicesIndustryChangesInEquityDetail, ServicesIndustryChangesInEquityListItem } from '../models/services-industry/changes-in-equity.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesIndustryChangesInEquityService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<ServicesIndustryChangesInEquityListItem[]>> {
    return this.apiService.get<Result<ServicesIndustryChangesInEquityListItem[]>>(API_ENDPOINTS.SERVICES_INDUSTRY.CHANGES_IN_EQUITY, params);
  }

  getById(id: string): Observable<DetailResult<ServicesIndustryChangesInEquityDetail>> {
    return this.apiService.get<DetailResult<ServicesIndustryChangesInEquityDetail>>(`${API_ENDPOINTS.SERVICES_INDUSTRY.CHANGES_IN_EQUITY}/${id}`);
  }
}
