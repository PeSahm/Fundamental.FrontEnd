import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AnnualAssemblyDetail } from 'src/app/models/annual-assembly';
import { AnnualAssemblyService } from 'src/app/services/annual-assembly.service';

@Component({
  selector: 'app-annual-assembly-detail',
  templateUrl: './annual-assembly-detail.component.html',
  styleUrls: ['./annual-assembly-detail.component.scss']
})
export class AnnualAssemblyDetailComponent implements OnInit, OnDestroy {
  detail?: AnnualAssemblyDetail;
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AnnualAssemblyService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id.trim() !== '') {
      this.loadDetail(id);
    } else {
      this.toastr.error('شناسه گزارش نامعتبر است');
      this.router.navigate(['/annual-assembly']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadDetail(id: string): void {
    this.isLoading = true;
    this.service
      .getById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          this.detail = res.data || res;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error loading annual assembly detail:', err);
          this.toastr.error('تصمیمات مجمع عمومی عادی سالیانه یافت نشد.');
          this.isLoading = false;
          this.router.navigate(['/annual-assembly']);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/annual-assembly']);
  }
}
