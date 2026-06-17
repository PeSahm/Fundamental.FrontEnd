import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { StructuralComprehensiveIncomeService } from 'src/app/services/structural-comprehensive-income.service';
import { StructuralComprehensiveIncomeDetail } from 'src/app/models/structural/comprehensive-income.model';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-structural-comprehensive-income-detail',
  templateUrl: './structural-comprehensive-income-detail.component.html',
  styleUrls: ['./structural-comprehensive-income-detail.component.scss']
})
export class StructuralComprehensiveIncomeDetailComponent implements OnInit {
  isLoading = true;
  reportData: StructuralComprehensiveIncomeDetail | null = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(private route: ActivatedRoute, private router: Router, private service: StructuralComprehensiveIncomeService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های صورت سود و زیان جامع ساختاری'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  goBack(): void { this.router.navigate(['/structural/comprehensive-income']); }
}
