import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { Paginated, AnnualAssemblyListItem, AnnualAssemblyDetail } from '../models/annual-assembly';

@Injectable({ providedIn: 'root' })
export class AnnualAssemblyService {
  constructor(private apiService: ApiService) {}

  getList(
    isin?: string,
    fiscalYear?: number,
    reportMonth?: number,
    pageNumber: number = 1,
    pageSize: number = 10,
    orderBy?: string
  ): Observable<Paginated<AnnualAssemblyListItem>> {
    const params: any = {
      PageNumber: pageNumber,
      PageSize: pageSize
    };

    if (isin) params.Isin = isin;
    if (fiscalYear) params.FiscalYear = fiscalYear;
    if (reportMonth) params.ReportMonth = reportMonth;
    if (orderBy) params.OrderBy = orderBy;

    return this.apiService.get<Paginated<AnnualAssemblyListItem>>(
      API_ENDPOINTS.MANUFACTURING.ANNUAL_ASSEMBLY,
      params
    );
  }

  getById(id: string): Observable<AnnualAssemblyDetail> {
    return this.apiService.get<AnnualAssemblyDetail>(
      `${API_ENDPOINTS.MANUFACTURING.ANNUAL_ASSEMBLY}/${id}`
    );
  }
}
