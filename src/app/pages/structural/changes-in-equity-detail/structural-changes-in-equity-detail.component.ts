import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { StructuralChangesInEquityService } from 'src/app/services/structural-changes-in-equity.service';
import { StructuralChangesInEquityDetail } from 'src/app/models/structural/changes-in-equity.model';
import convertToToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-structural-changes-in-equity-detail',
  templateUrl: './structural-changes-in-equity-detail.component.html',
  styleUrls: ['./structural-changes-in-equity-detail.component.scss']
})
export class StructuralChangesInEquityDetailComponent implements OnInit {
  isLoading = true;
  reportData: StructuralChangesInEquityDetail | null = null;
  error: string | null = null;
  convertToToman = convertToToman;

  constructor(private route: ActivatedRoute, private router: Router, private service: StructuralChangesInEquityService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های صورت تغییرات در حقوق مالکانه ساختاری'; console.error(err); }
      });
  }

  formatNumber(value: number | undefined | null): string {
    if (value == null) return '—';
    return value.toLocaleString('en-US');
  }

  goBack(): void { this.router.navigate(['/structural/changes-in-equity']); }
}
