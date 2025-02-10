import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StatusOfViableCompanyService {

  constructor(
    private http: HttpClient
  ) { }

  getAllStatusOfViablecompanies(command: any) {
    let params = new HttpParams();
    Object.keys(command).forEach(
        key => command[key] && (params = params.append(key, command[key]))
    );
    
    return this.http.get(`https://api.stockscreeners.ir/Manufacturing/status-of-viable-companies`, { params })
  }

  approved(command:any){
    return this.http.put(`https://api.stockscreeners.ir/Manufacturing/status-of-viable-companies/approve`, command)
  }

  reject(id:any){
    return this.http.put(`https://api.stockscreeners.ir/Manufacturing/status-of-viable-companies/reject/${id}`, null)

  }

}
