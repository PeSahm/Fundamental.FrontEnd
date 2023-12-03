import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, OperatorFunction } from 'rxjs';
import { MonthlyActivity, SearchSymbol, Statement } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MonthlyActivityService {

  constructor(private http: HttpClient) {

  }
  getAllMonthlyReport(command : any){
    return this.http.get(`https://endpoint.stockscreeners.ir/monthly-activity` , {params : command})
  }



}
