import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { ApproveShareHoldersCommand } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SymbolShareHoldersService {

  constructor(private apiService: ApiService) { }

  getAllSymbolShareHolders(command: any) {
    return this.apiService.get(API_ENDPOINTS.SYMBOL_SHARE_HOLDERS, command);
  }

  rejectShareHolders(id: string) {
    return this.apiService.post(`${API_ENDPOINTS.SYMBOL_SHARE_HOLDERS}/reject/${id}`, null);
  }

  approveShareHolders(command: ApproveShareHoldersCommand) {
    return this.apiService.post(`${API_ENDPOINTS.SYMBOL_SHARE_HOLDERS}/approve`, command);
  }
}
