import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { Paginated, ExtraAnnualAssemblyListItem, ExtraAnnualAssemblyDetail } from '../models/extra-annual-assembly';

@Injectable({ providedIn: 'root' })
export class ExtraAnnualAssemblyService {
  constructor(private apiService: ApiService) {}

  getList(
    isin?: string,
    fiscalYear?: number,
    reportMonth?: number,
    pageNumber: number = 1,
    pageSize: number = 10,
    orderBy?: string
  ): Observable<Paginated<ExtraAnnualAssemblyListItem>> {
    const params: any = {
      PageNumber: pageNumber,
      PageSize: pageSize
    };

    if (isin) params.Isin = isin;
    if (fiscalYear) params.FiscalYear = fiscalYear;
    if (reportMonth) params.ReportMonth = reportMonth;
    if (orderBy) params.OrderBy = orderBy;

    return this.apiService.get<Paginated<ExtraAnnualAssemblyListItem>>(
      API_ENDPOINTS.MANUFACTURING.EXTRA_ANNUAL_ASSEMBLY,
      params
    );
  }

  getById(id: string): Observable<ExtraAnnualAssemblyDetail> {
    return this.apiService.get<ExtraAnnualAssemblyDetail>(
      `${API_ENDPOINTS.MANUFACTURING.EXTRA_ANNUAL_ASSEMBLY}/${id}`
    );
  }
}
