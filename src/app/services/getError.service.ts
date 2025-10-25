import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { ApiService } from './api.service';
import { API_ENDPOINTS, CULTURE } from '../config/api-endpoints';

@Injectable({
    providedIn: 'root'
})

export class GetErrorService {
    constructor(private apiService: ApiService) { }

    getError() {
        return this.apiService.get(`${API_ENDPOINTS.ERROR_MESSAGES}?culture=${CULTURE.FA_IR}`)
            .pipe(map((res: any) => res.data));
    }
}
