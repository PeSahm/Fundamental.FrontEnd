import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SymbolShareHoldersService {

  constructor(private http: HttpClient) {
  }
  getAllSymbolShareHolders(command: any) {
    return this.http.get(`https://api.stockscreeners.ir/symbol-share-holders`, { params: command })
  }
  rejectShareHolders(id) {
    return this.http.post(`https://api.stockscreeners.ir/symbol-share-holders/reject/${id}`, null)
  }
}
