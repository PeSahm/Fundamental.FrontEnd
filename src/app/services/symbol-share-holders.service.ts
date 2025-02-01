import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SymbolShareHoldersService {

  constructor(private http: HttpClient) {
  }
  getAllSymbolShareHolders(command: any) {
    let params = new HttpParams();
    Object.keys(command).forEach(
        key => command[key] && (params = params.append(key, command[key]))
    );
    
    return this.http.get(`https://api.stockscreeners.ir/symbol-share-holders`, { params })
  }
  rejectShareHolders(id) {
    return this.http.post(`https://api.stockscreeners.ir/symbol-share-holders/reject/${id}`, null)
  }
  approveShareHolders(command){
    return this.http.post(`https://api.stockscreeners.ir/symbol-share-holders/approve`, command)

  }


}
