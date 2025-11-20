import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { Paginated, ExtraAssemblyListItem, ExtraAssemblyDetail } from '../models/extra-assembly';

@Injectable({ providedIn: 'root' })
export class ExtraAssemblyService {
  constructor(private apiService: ApiService) {}

  getList(
    isin?: string,
    fiscalYear?: number,
    yearEndMonth?: number,
    pageNumber: number = 1,
    pageSize: number = 10,
    orderBy?: string
  ): Observable<Paginated<ExtraAssemblyListItem>> {
    const params: any = {
      PageNumber: pageNumber,
      PageSize: pageSize
    };

    if (isin) params.Isin = isin;
    if (fiscalYear) params.FiscalYear = fiscalYear;
    if (yearEndMonth) params.YearEndMonth = yearEndMonth;
    if (orderBy) params.OrderBy = orderBy;

    return this.apiService.get<Paginated<ExtraAssemblyListItem>>(
      API_ENDPOINTS.MANUFACTURING.EXTRA_ASSEMBLY,
      params
    );
  }

  getById(id: string): Observable<ExtraAssemblyDetail> {
    return this.apiService.get<ExtraAssemblyDetail>(
      `${API_ENDPOINTS.MANUFACTURING.EXTRA_ASSEMBLY}/${id}`
    );
  }
}
