import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CapitalSupplyMonthlyActivityService } from 'src/app/services/capital-supply-monthly-activity.service';
import { finalize } from 'rxjs';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-capital-supply-monthly-activity-detail',
  templateUrl: './capital-supply-monthly-activity-detail.component.html',
  styleUrls: ['./capital-supply-monthly-activity-detail.component.scss']
})
export class CapitalSupplyMonthlyActivityDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(private route: ActivatedRoute, private router: Router, private service: CapitalSupplyMonthlyActivityService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های فعالیت ماهانه تأمین سرمایه'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  private sectionLabels: Record<string, string> = {
    revenuesServiceDeliveryRealized: 'درآمدهای ارائه خدمات محقق‌شده',
    profitLossInvestments: 'سود و زیان سرمایه‌گذاری‌ها',
    marketingCommitments: 'تعهدات بازارگردانی',
    underwritingFee: 'کارمزد پذیره‌نویسی'
  };

  sectionLabel(key: string | null | undefined): string {
    if (!key) return '—';
    return this.sectionLabels[key] || key;
  }

  goBack(): void { this.router.navigate(['/capital-supply/monthly-activity']); }
}
