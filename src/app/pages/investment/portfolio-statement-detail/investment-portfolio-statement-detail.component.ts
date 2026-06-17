import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentPortfolioStatementService } from 'src/app/services/investment-portfolio-statement.service';
import { InvestmentPortfolioStatementDetail } from 'src/app/models/investment/portfolio-statement.model';
import { finalize } from 'rxjs';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-investment-portfolio-statement-detail',
  templateUrl: './investment-portfolio-statement-detail.component.html',
  styleUrls: ['./investment-portfolio-statement-detail.component.scss']
})
export class InvestmentPortfolioStatementDetailComponent implements OnInit {
  isLoading = true;
  reportData: InvestmentPortfolioStatementDetail | null = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(private route: ActivatedRoute, private router: Router, private service: InvestmentPortfolioStatementService) {}

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
          if (response?.data) { this.reportData = response.data as InvestmentPortfolioStatementDetail; } else { this.error = 'داده‌های گزارش یافت نشد'; }
        },
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های صورت سبد سهام سرمایه‌گذاری'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  goBack(): void { this.router.navigate(['/investment/portfolio-statement']); }
}
