import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, OperatorFunction } from 'rxjs';
import { MonthlyActivity, ResponseStatementRoot, SearchSymbol, Statement } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private http: HttpClient) {

  }
  getAllStatements(command : any){
    return this.http.get<ResponseStatementRoot>(`https://api.stockscreeners.ir/statements` , {params : command})
  }
  getStatementById(state : any){    
    return this.http.get(`https://api.stockscreeners.ir/statements/${state.id}`)
  }
  editStatementForm(command:any){
    return this.http.put(`https://api.stockscreeners.ir/statements/${command.id}`, command)
  }



}