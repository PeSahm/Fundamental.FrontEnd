import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = environment.basePath;
  }

  /**
   * Get the full API URL by appending the endpoint to the base URL
   * @param endpoint - The API endpoint (e.g., 'Manufacturing/balance-sheet')
   * @returns Full API URL
   */
  getApiUrl(endpoint: string): string {
    // Remove leading slash from endpoint if present
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    
    // Ensure baseUrl ends with slash
    const baseUrlWithSlash = this.baseUrl.endsWith('/') ? this.baseUrl : `${this.baseUrl}/`;
    
    return `${baseUrlWithSlash}${cleanEndpoint}`;
  }

  /**
   * Get the base API URL
   * @returns Base API URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }
}
