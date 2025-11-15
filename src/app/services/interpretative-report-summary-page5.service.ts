import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class InterpretativeReportSummaryPage5Service {

  constructor(private apiService: ApiService) { }

  getList(
    isin?: string,
    fiscalYear?: number,
    reportMonth?: number,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<any> {
    const params: any = {
      PageNumber: pageNumber,
      PageSize: pageSize
    };

    if (isin) {
      params.Isin = isin;
    }
    if (fiscalYear) {
      params.FiscalYear = fiscalYear;
    }
    if (reportMonth) {
      params.ReportMonth = reportMonth;
    }

    return this.apiService.get(
      API_ENDPOINTS.MANUFACTURING.INTERPRETATIVE_REPORT_SUMMARY_PAGE5,
      params
    );
  }

  getById(id: string): Observable<any> {
    return this.apiService.get(
      `${API_ENDPOINTS.MANUFACTURING.INTERPRETATIVE_REPORT_SUMMARY_PAGE5}/${id}`
    );
  }
}
