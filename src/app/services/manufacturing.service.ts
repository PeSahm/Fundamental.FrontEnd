import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
})

export class ManufacturingService {
    constructor(private http: HttpClient) { }

    addBalanceSheet(command: any) {
        return this.http.post('https://api.stockscreeners.ir/Manufacturing/balance-sheet', command)
    }
}
