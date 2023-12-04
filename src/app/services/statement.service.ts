import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of, OperatorFunction } from 'rxjs';
import { MonthlyActivity, SearchSymbol, Statement } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private http: HttpClient) {

  }
  getStatementById(state : any){    
    return this.http.get(`https://endpoint.stockscreeners.ir/statements/${state.id}`)
  }
  editStatementForm(command:any){
    return this.http.put(`https://endpoint.stockscreeners.ir/statements/${command.id}`, command)
  }



}