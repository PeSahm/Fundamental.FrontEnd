import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExtraAssemblyEnumService {
  getCapitalChangeStateLabel(state: number): string {
    const labels: Record<number, string> = {
      0: 'بدون تغییر سرمایه',
      1: 'افزایش سرمایه',
      2: 'کاهش سرمایه',
      3: 'تغییر ارزش اسمی سهام',
      4: 'چند تغییر همزمان'
    };
    return labels[state] || 'نامشخص';
  }

  getCapitalIncreaseTypeLabel(type: number): string {
    const labels: Record<number, string> = {
      0: 'قطعی',
      1: 'در اختیار هیئت‌مدیره'
    };
    return labels[type] || 'نامشخص';
  }
}
