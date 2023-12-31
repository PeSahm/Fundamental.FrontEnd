import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class ManufacturingService {
    constructor(private http: HttpClient) { }

    addBalanceSheet(command: any) {
        return this.http.post('https://api.stockscreeners.ir/Manufacturing/balance-sheet', command)
    }
    getAllManufacturingBalanceSheet(command: any) {
        return this.http.get(`https://api.stockscreeners.ir/Manufacturing/balance-sheet`, { params: command })
            .pipe(
                map((res: any) => {
                    return res.data
                })
            )
    }
    getManufacturingBalanceSheetDetail(command: any) {
        return this.http.get(`https://api.stockscreeners.ir/Manufacturing/balance-sheet/${command.traceNo}/${command.fiscalYear}/${command.reportMonth}/details`)
            .pipe(
                map((res: any) => {
                    return res.data
                })
            )
    }

    getBalanceSheetSort(){
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


}
