import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgricultureCashFlowService } from 'src/app/services/agriculture-cash-flow.service';
import { finalize } from 'rxjs';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-agriculture-cash-flow-detail',
  templateUrl: './agriculture-cash-flow-detail.component.html',
  styleUrls: ['./agriculture-cash-flow-detail.component.scss']
})
export class AgricultureCashFlowDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(private route: ActivatedRoute, private router: Router, private service: AgricultureCashFlowService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های جریان وجوه نقد'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  goBack(): void { this.router.navigate(['/agriculture/cash-flow']); }
}
