# API Configuration Guide

This document explains how the centralized API configuration works in this Angular application.

## Overview

The API configuration has been centralized to make it easy to change the base API URL and manage endpoints consistently across the application.

## Key Files

### 1. Environment Configuration
- `src/environments/environment.ts` - Development environment
- `src/environments/environment.prod.ts` - Production environment

Both files contain the `basePath` property:
```typescript
export const environment = {
  production: false, // or true for prod
  basePath: 'https://api.stockscreeners.ir/'
};
```

### 2. API Configuration Service
- `src/app/services/api-config.service.ts` - Centralizes API URL construction

### 3. API Service (Optional)
- `src/app/services/api.service.ts` - Provides centralized HTTP methods

### 4. API Endpoints Constants
- `src/app/config/api-endpoints.ts` - Contains endpoint constants

## How to Change API Base URL

### Method 1: Change Environment Files
Update the `basePath` in both environment files:

```typescript
// For development
export const environment = {
  production: false,
  basePath: 'https://new-api-url.com/'
};

// For production  
export const environment = {
  production: true,
  basePath: 'https://production-api-url.com/'
};
```

### Method 2: Use Different URLs for Different Environments
```typescript
// Development
export const environment = {
  production: false,
  basePath: 'https://dev-api.stockscreeners.ir/'
};

// Production
export const environment = {
  production: true,
  basePath: 'https://api.stockscreeners.ir/'
};
```

## Updated Service Pattern

All services now follow this pattern:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfigService } from './api-config.service';

@Injectable({
  providedIn: 'root'
})
export class YourService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigService
  ) {}

  getData() {
    return this.http.get(this.apiConfig.getApiUrl('your-endpoint'));
  }
}
```

## Benefits

1. **Single Point of Configuration**: Change API URL in one place
2. **Environment-Specific URLs**: Different URLs for dev/prod
3. **Type Safety**: Centralized endpoint constants
4. **Maintainability**: Easy to update and maintain
5. **Consistency**: All services use the same pattern

## Migration Complete

All existing services have been updated to use the centralized configuration:
- ✅ StatusOfViableCompanyService
- ✅ ManufacturingService  
- ✅ ScreenerService
- ✅ StatementService
- ✅ MonthlyActivityService
- ✅ SymbolShareHoldersService
- ✅ GetErrorService

## Optional: Using API Service

You can also use the centralized `ApiService` for more consistent HTTP calls:

```typescript
import { ApiService } from './api.service';
import { API_ENDPOINTS } from '../config/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class YourService {
  constructor(private apiService: ApiService) {}

  getData(params: any) {
    return this.apiService.get(API_ENDPOINTS.YOUR_ENDPOINT, params);
  }

  createData(data: any) {
    return this.apiService.post(API_ENDPOINTS.YOUR_ENDPOINT, data);
  }
}
