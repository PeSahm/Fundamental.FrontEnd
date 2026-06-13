import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StructuralCashFlowService } from 'src/app/services/structural-cash-flow.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-structural-cash-flow-detail',
  templateUrl: './structural-cash-flow-detail.component.html',
  styleUrls: ['./structural-cash-flow-detail.component.scss']
})
export class StructuralCashFlowDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private service: StructuralCashFlowService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های جریان وجوه نقد ساختاری'; console.error(err); }
      });
  }

  goBack(): void { this.router.navigate(['/structural/cash-flow']); }
}
