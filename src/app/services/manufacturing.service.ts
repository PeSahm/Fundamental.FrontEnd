import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";
import { ManufacturingBalanceSheet, ManufacturingBalanceSheetDataFrom, ManufacturingBalanceSheetDetailsRow } from "../models/models";



@Injectable({
    providedIn: 'root'
})


export class ManufacturingService {
    constructor(private http: HttpClient) { }

    addBalanceSheet(command: any) {
        return this.http.post('https://api.stockscreeners.ir/Manufacturing/balance-sheet', command)
    }
    getAllManufacturingBalanceSheet(command) {
        return this.http.get<ManufacturingBalanceSheetDataFrom>(environment.basePath + 'Manufacturing/balance-sheet', { params: command })
    }
    getManufacturingBalanceSheetDetail(command: any) {
        return this.http.get<ManufacturingBalanceSheetDetailsRow>(environment.basePath + `Manufacturing/balance-sheet/${command.traceNo}/${command.fiscalYear}/${command.reportMonth}/details`)
    }

    getBalanceSheetSort() {
        return this.http.get('https://api.stockscreeners.ir/Manufacturing/balance-sheet-sort')
            .pipe(
                map((res: any) => {
                    return res.data
                })
            )
    }

    getAllManufacturingIncomeStatement(command: any) {
        return this.http.get(`https://api.stockscreeners.ir/Manufacturing/income-statement`, { params: command })
            .pipe(
                map((res: any) => {
                    return res.data
                })
            )
    }
    getManufacturingIncomeStatementDetail(command: any) {
        return this.http.get(`https://api.stockscreeners.ir/Manufacturing/income-statement/${command.traceNo}/${command.fiscalYear}/${command.reportMonth}/details`)
            .pipe(
                map((res: any) => {
                    return res.data
                })
            )
    }

    addIncomeStatement(command: any) {
        return this.http.post('https://api.stockscreeners.ir/Manufacturing/income-statement', command)
    }
    getIncomeStatementSort() {
        return this.http.get('https://api.stockscreeners.ir/Manufacturing/income-statement-sort')
            .pipe(
                map((res: any) => {
                    return res.data
                })
            )
    }


}
