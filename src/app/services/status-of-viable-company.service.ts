import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class StatusOfViableCompanyService {

  constructor(private apiService: ApiService) { }

  getAllStatusOfViablecompanies(command: any) {
    return this.apiService.get(API_ENDPOINTS.MANUFACTURING.STATUS_OF_VIABLE_COMPANIES, command);
  }

  approved(command: any) {
    return this.apiService.put(`${API_ENDPOINTS.MANUFACTURING.STATUS_OF_VIABLE_COMPANIES}/approve`, command);
  }

  reject(id: any) {
    return this.apiService.put(`${API_ENDPOINTS.MANUFACTURING.STATUS_OF_VIABLE_COMPANIES}/reject/${id}`, null);
  }
}
