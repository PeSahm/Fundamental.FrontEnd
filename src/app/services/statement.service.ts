import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private apiService: ApiService) { }

  getAllStatements(command: any) {
    return this.apiService.get<any>(API_ENDPOINTS.STATEMENTS, command);
  }

  getStatementById(state: any) {
    return this.apiService.get(`${API_ENDPOINTS.STATEMENTS}/${state.id}`);
  }

  editStatementForm(command: any) {
    return this.apiService.put(`${API_ENDPOINTS.STATEMENTS}/${command.id}`, command);
  }
}