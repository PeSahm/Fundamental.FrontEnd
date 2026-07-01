import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BankMonthlyActivityService } from 'src/app/services/bank-monthly-activity.service';
import { finalize } from 'rxjs';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-bank-monthly-activity-detail',
  templateUrl: './bank-monthly-activity-detail.component.html',
  styleUrls: ['./bank-monthly-activity-detail.component.scss']
})
export class BankMonthlyActivityDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(private route: ActivatedRoute, private router: Router, private service: BankMonthlyActivityService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) { this.loadDetail(id); } else { this.error = 'شناسه گزارش مشخص نشده است'; this.isLoading = false; }
  }

  loadDetail(id: string): void {
    this.isLoading = true;
    this.service.getById(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response: any) => {
          if (response?.data) { this.reportData = response.data; } else { this.error = 'داده‌های گزارش یافت نشد'; }
        },
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های فعالیت ماهانه بانکی'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  private sectionLabels: Record<string, string> = {
    achievedRevenue: 'درآمدهای محقق‌شده',
    facilityInfo: 'تسهیلات',
    deposite: 'سپرده‌ها',
    investDebtSecurity: 'سرمایه‌گذاری در اوراق بدهی',
    investStocks: 'سرمایه‌گذاری در سهام',
    operationCosts: 'بهای تمام‌شده درآمدهای عملیاتی',
    depositInfo: 'اطلاعات سپرده‌ها',
    financialCosts: 'هزینه‌های مالی'
  };

  sectionLabel(key: string | null | undefined): string {
    if (!key) return '—';
    return this.sectionLabels[key] || key;
  }

  goBack(): void { this.router.navigate(['/bank/monthly-activity']); }
}
