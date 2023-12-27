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
    getAllManufacturingBalanceSheet() {
        return this.http.get(`https://api.stockscreeners.ir/Manufacturing/balance-sheet`)
            .pipe(
                map((res: any) => {
                    return res.data
                })
            )
    }
}
