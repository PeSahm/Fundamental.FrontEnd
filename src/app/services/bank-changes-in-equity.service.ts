import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { DetailResult, Result } from '../models/models';
import { BankChangesInEquityDetail, BankChangesInEquityListItem } from '../models/bank/changes-in-equity.model';

@Injectable({
  providedIn: 'root'
})
export class BankChangesInEquityService {

  constructor(private apiService: ApiService) { }

  getAll(params?: any): Observable<Result<BankChangesInEquityListItem[]>> {
    return this.apiService.get<Result<BankChangesInEquityListItem[]>>(API_ENDPOINTS.BANK.CHANGES_IN_EQUITY, params);
  }

  getById(id: string): Observable<DetailResult<BankChangesInEquityDetail>> {
    return this.apiService.get<DetailResult<BankChangesInEquityDetail>>(`${API_ENDPOINTS.BANK.CHANGES_IN_EQUITY}/${id}`);
  }
}
