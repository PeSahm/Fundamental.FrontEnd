import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  /**
   * Perform GET request
   * @param endpoint - API endpoint
   * @param params - Query parameters
   * @returns Observable of the HTTP response
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    const url = this.apiConfig.getApiUrl(endpoint);
    const httpParams = this.buildHttpParams(params);
    
    return this.http.get<T>(url, { params: httpParams });
  }

  /**
   * Perform POST request
   * @param endpoint - API endpoint
   * @param body - Request body
   * @returns Observable of the HTTP response
   */
  post<T>(endpoint: string, body?: any): Observable<T> {
    const url = this.apiConfig.getApiUrl(endpoint);
    return this.http.post<T>(url, body);
  }

  /**
   * Perform PUT request
   * @param endpoint - API endpoint
   * @param body - Request body
   * @returns Observable of the HTTP response
   */
  put<T>(endpoint: string, body?: any): Observable<T> {
    const url = this.apiConfig.getApiUrl(endpoint);
    return this.http.put<T>(url, body);
  }

  /**
   * Perform DELETE request
   * @param endpoint - API endpoint
   * @returns Observable of the HTTP response
   */
  delete<T>(endpoint: string): Observable<T> {
    const url = this.apiConfig.getApiUrl(endpoint);
    return this.http.delete<T>(url);
  }

  /**
   * Build HttpParams from an object
   * @param params - Parameters object
   * @returns HttpParams instance
   */
  private buildHttpParams(params?: any): HttpParams | undefined {
    if (!params) {
      return undefined;
    }

    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined && params[key] !== '') {
        httpParams = httpParams.append(key, params[key]);
      }
    });

    return httpParams;
  }
}
