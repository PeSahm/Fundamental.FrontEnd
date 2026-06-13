import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesIndustryCashFlowService } from 'src/app/services/services-industry-cash-flow.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-services-industry-cash-flow-detail',
  templateUrl: './services-industry-cash-flow-detail.component.html',
  styleUrls: ['./services-industry-cash-flow-detail.component.scss']
})
export class ServicesIndustryCashFlowDetailComponent implements OnInit {
  isLoading = true;
  reportData: any = null;
  error: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private service: ServicesIndustryCashFlowService) {}

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
        error: (err) => { this.error = 'خطا در بارگذاری داده‌های جریان وجوه نقد خدمات'; console.error(err); }
      });
  }

  goBack(): void { this.router.navigate(['/services-industry/cash-flow']); }
}
