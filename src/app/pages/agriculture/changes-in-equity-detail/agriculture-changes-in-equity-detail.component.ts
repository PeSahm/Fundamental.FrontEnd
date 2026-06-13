import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AgricultureChangesInEquityService } from 'src/app/services/agriculture-changes-in-equity.service';
import { AgricultureChangesInEquityDetail } from 'src/app/models/agriculture/changes-in-equity.model';

@Component({
  selector: 'app-agriculture-changes-in-equity-detail',
  templateUrl: './agriculture-changes-in-equity-detail.component.html',
  styleUrls: ['./agriculture-changes-in-equity-detail.component.scss']
})
export class AgricultureChangesInEquityDetailComponent implements OnInit {
  isLoading = true;
  reportData: AgricultureChangesInEquityDetail | null = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private service: AgricultureChangesInEquityService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های صورت تغییرات در حقوق مالکانه کشاورزی'; console.error(err); }
      });
  }

  goBack(): void { this.router.navigate(['/agriculture/changes-in-equity']); }
}
