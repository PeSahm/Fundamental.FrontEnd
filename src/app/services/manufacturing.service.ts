import { Injectable } from "@angular/core";
import { Observable, catchError, map, of } from "rxjs";
import { DetailResult, ManufacturingBalanceSheet, ManufacturingBalanceSheetDetails, Result } from "../models/models";
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
    providedIn: 'root'
})

export class ManufacturingService {
    constructor(private apiService: ApiService) { }

    addBalanceSheet(command: any) {
        return this.apiService.post(API_ENDPOINTS.MANUFACTURING.BALANCE_SHEET, command);
    }

    getAllManufacturingBalanceSheet(command: any): Observable<Result<ManufacturingBalanceSheet[]>> {
        return this.apiService.get<Result<ManufacturingBalanceSheet[]>>(API_ENDPOINTS.MANUFACTURING.BALANCE_SHEET, command)
            .pipe(
                catchError((err) => of())
            );
    }

    getManufacturingBalanceSheetDetail(command: any): Observable<DetailResult<ManufacturingBalanceSheetDetails[]>> {
        return this.apiService.get<DetailResult<ManufacturingBalanceSheetDetails[]>>(`${API_ENDPOINTS.MANUFACTURING.BALANCE_SHEET}/${command.traceNo}/${command.fiscalYear}/${command.reportMonth}/details`)
            .pipe(
                catchError((err) => of())
            );
    }

    getBalanceSheetSort() {
        return this.apiService.get(API_ENDPOINTS.MANUFACTURING.BALANCE_SHEET_SORT)
            .pipe(
                map((res: any) => {
                    return res.data;
                })
            );
    }

    getAllManufacturingIncomeStatement(command: any) {
        return this.apiService.get(API_ENDPOINTS.MANUFACTURING.INCOME_STATEMENT, command)
            .pipe(
                map((res: any) => {
                    return res.data;
                })
            );
    }

    getManufacturingIncomeStatementDetail(command: any) {
        return this.apiService.get(`${API_ENDPOINTS.MANUFACTURING.INCOME_STATEMENT}/${command.traceNo}/${command.fiscalYear}/${command.reportMonth}/details`)
            .pipe(
                map((res: any) => {
                    return res.data;
                })
            );
    }

    addIncomeStatement(command: any) {
        return this.apiService.post(API_ENDPOINTS.MANUFACTURING.INCOME_STATEMENT, command);
    }

    getIncomeStatementSort() {
        return this.apiService.get(API_ENDPOINTS.MANUFACTURING.INCOME_STATEMENT_SORT)
            .pipe(
                map((res: any) => {
                    return res.data;
                })
            );
    }

    getAllNonOperationalIncome(command: any) {
        return this.apiService.get(API_ENDPOINTS.MANUFACTURING.NON_OPERATION_INCOME, command)
            .pipe(
                map((res: any) => {
                    return res.data;
                })
            );
    }

    addTagInNonOperationalIncome(command: { id: string, tags: number[] }) {
        return this.apiService.put(`${API_ENDPOINTS.MANUFACTURING.NON_OPERATION_INCOME}/tags/${command.id}`, command);
    }
}
