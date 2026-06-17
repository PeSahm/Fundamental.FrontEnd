import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgricultureMonthlyActivityService } from 'src/app/services/agriculture-monthly-activity.service';
import { finalize } from 'rxjs';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-agriculture-monthly-activity-detail',
  templateUrl: './agriculture-monthly-activity-detail.component.html',
  styleUrls: ['./agriculture-monthly-activity-detail.component.scss']
})
export class AgricultureMonthlyActivityDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AgricultureMonthlyActivityService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadDetail(id);
    } else {
      this.error = 'شناسه گزارش مشخص نشده است';
      this.isLoading = false;
    }
  }

  loadDetail(id: string): void {
    this.isLoading = true;
    this.service.getById(id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (response: any) => {
          if (response?.data) {
            this.reportData = response.data;
          } else {
            this.error = 'داده‌های گزارش یافت نشد';
          }
        },
        error: (err) => {
          this.error = 'خطا در بارگذاری داده‌های گزارش';
          console.error('Error loading agriculture monthly activity detail:', err);
        }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  goBack(): void {
    this.router.navigate(['/agriculture/monthly-activity']);
  }
}
