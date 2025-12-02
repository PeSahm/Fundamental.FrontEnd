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
      0: 'نقدی',
      1: 'غیرنقدی',
      2: 'از اندوخته‌ها',
      3: 'از سود انباشته',
      4: 'ترکیبی',
      5: 'نقدی با حق تقدم'
    };
    return labels[type] || 'نامشخص';
  }
}
