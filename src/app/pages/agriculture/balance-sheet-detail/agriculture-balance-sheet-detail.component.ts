import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgricultureBalanceSheetService } from 'src/app/services/agriculture-balance-sheet.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-agriculture-balance-sheet-detail',
  templateUrl: './agriculture-balance-sheet-detail.component.html',
  styleUrls: ['./agriculture-balance-sheet-detail.component.scss']
})
export class AgricultureBalanceSheetDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AgricultureBalanceSheetService
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
          this.error = 'خطا در بارگذاری داده‌های صورت وضعیت مالی';
          console.error('Error loading agriculture balance sheet detail:', err);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/agriculture/balance-sheet']);
  }
}
