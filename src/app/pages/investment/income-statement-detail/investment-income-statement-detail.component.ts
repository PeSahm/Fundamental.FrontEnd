import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentIncomeStatementService } from 'src/app/services/investment-income-statement.service';
import { finalize } from 'rxjs';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-investment-income-statement-detail',
  templateUrl: './investment-income-statement-detail.component.html',
  styleUrls: ['./investment-income-statement-detail.component.scss']
})
export class InvestmentIncomeStatementDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(private route: ActivatedRoute, private router: Router, private service: InvestmentIncomeStatementService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های صورت سود و زیان سرمایه‌گذاری'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  goBack(): void { this.router.navigate(['/investment/income-statement']); }
}
