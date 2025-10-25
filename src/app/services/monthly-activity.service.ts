import { Injectable } from '@angular/core';
import { MonthlyActivity } from '../models/models';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class MonthlyActivityService {

  constructor(private apiService: ApiService) { }

  getAllMonthlyReport(command: any) {
    return this.apiService.get(API_ENDPOINTS.MANUFACTURING.MONTHLY_ACTIVITY, command);
  }

  getMonthlyActivityById(state: any) {
    return this.apiService.get(`${API_ENDPOINTS.MANUFACTURING.MONTHLY_ACTIVITY}/${state.id}`);
  }

  editMonthlyActivityForm(command: any) {
    return this.apiService.put(`${API_ENDPOINTS.MANUFACTURING.MONTHLY_ACTIVITY}/${command.id}`, command);
  }

  addMonthlyActivity(command: MonthlyActivity) {
    return this.apiService.post(API_ENDPOINTS.MANUFACTURING.MONTHLY_ACTIVITY, command);
  }
}
