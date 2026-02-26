import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvestmentCashFlowService } from 'src/app/services/investment-cash-flow.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-investment-cash-flow-detail',
  templateUrl: './investment-cash-flow-detail.component.html',
  styleUrls: ['./investment-cash-flow-detail.component.scss']
})
export class InvestmentCashFlowDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private service: InvestmentCashFlowService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های جریان وجوه نقد سرمایه‌گذاری'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  goBack(): void { this.router.navigate(['/investment/cash-flow']); }
}
