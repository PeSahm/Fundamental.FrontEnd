import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class GetErrorService {
    constructor(private http: HttpClient) { }

    getError() {
        return this.http.get('https://endpoint.stockscreeners.ir/error-messages/admin?culture=fa-ir')
            .pipe(map((res: any) => res.data))
    }
}
