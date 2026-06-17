import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AgricultureComprehensiveIncomeService } from 'src/app/services/agriculture-comprehensive-income.service';
import { AgricultureComprehensiveIncomeDetail } from 'src/app/models/agriculture/comprehensive-income.model';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-agriculture-comprehensive-income-detail',
  templateUrl: './agriculture-comprehensive-income-detail.component.html',
  styleUrls: ['./agriculture-comprehensive-income-detail.component.scss']
})
export class AgricultureComprehensiveIncomeDetailComponent implements OnInit {
  isLoading = true;
  reportData: AgricultureComprehensiveIncomeDetail | null = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(private route: ActivatedRoute, private router: Router, private service: AgricultureComprehensiveIncomeService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های صورت سود و زیان جامع کشاورزی'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  goBack(): void { this.router.navigate(['/agriculture/comprehensive-income']); }
}
