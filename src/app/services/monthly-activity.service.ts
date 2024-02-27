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
    return this.http.get(`https://api.stockscreeners.ir/Manufacturing/monthly-activity` , {params : command})
  }
  getMonthlyActivityById(state : any){    
    return this.http.get(`https://api.stockscreeners.ir/Manufacturing/monthly-activity/${state.id}`)
  }
  editMonthlyActivityForm(command:any){
    return this.http.put(`https://api.stockscreeners.ir/Manufacturing/monthly-activity/${command.id}`, command)
  }
 addMonthlyActivity(command: MonthlyActivity) {
    return this.http.post('https://api.stockscreeners.ir/Manufacturing/monthly-activity', command)
  }



}
