import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeasingMonthlyActivityService } from 'src/app/services/leasing-monthly-activity.service';
import { finalize } from 'rxjs';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-leasing-monthly-activity-detail',
  templateUrl: './leasing-monthly-activity-detail.component.html',
  styleUrls: ['./leasing-monthly-activity-detail.component.scss']
})
export class LeasingMonthlyActivityDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(private route: ActivatedRoute, private router: Router, private service: LeasingMonthlyActivityService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های فعالیت ماهانه لیزینگ'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  private sectionLabels: Record<string, string> = {
    achievedRevenue: 'درآمدهای محقق‌شده',
    achievedFinancingCost: 'هزینه‌های تأمین مالی محقق‌شده',
    delegatedGoodsSummary: 'خلاصه کالای واگذارشده',
    operationalActivityThisYear: 'فعالیت عملیاتی سال جاری'
  };

  sectionLabel(key: string | null | undefined): string {
    if (!key) return '—';
    return this.sectionLabels[key] || key;
  }

  goBack(): void { this.router.navigate(['/leasing/monthly-activity']); }
}
