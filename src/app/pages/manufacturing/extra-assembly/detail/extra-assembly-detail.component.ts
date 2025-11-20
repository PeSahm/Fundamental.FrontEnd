import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ExtraAssemblyDetail } from 'src/app/models/extra-assembly';
import { ExtraAssemblyService } from 'src/app/services/extra-assembly.service';
import { ExtraAssemblyEnumService } from 'src/app/services/extra-assembly-enum.service';
import { AnnualAssemblyEnumService } from 'src/app/services/annual-assembly-enum.service';
import toToman from 'src/app/utils/toToman';

@Component({
  selector: 'app-extra-assembly-detail',
  templateUrl: './extra-assembly-detail.component.html',
  styleUrls: ['./extra-assembly-detail.component.scss']
})
export class ExtraAssemblyDetailComponent implements OnInit, OnDestroy {
  detail?: ExtraAssemblyDetail;
  isLoading = true;
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ExtraAssemblyService,
    private toastr: ToastrService,
    private extraEnumService: ExtraAssemblyEnumService,
    private annualEnumService: AnnualAssemblyEnumService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id && id.trim() !== '') {
      this.loadDetail(id);
    } else {
      this.toastr.error('شناسه گزارش نامعتبر است');
      this.router.navigate(['/extra-assembly']);
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
          console.error('Error loading extra assembly detail:', err);
          this.toastr.error('تصمیمات مجمع عمومی فوق‌العاده یافت نشد.');
          this.isLoading = false;
          this.router.navigate(['/extra-assembly']);
        }
      });
  }

  goBack(): void {
    this.router.navigate(['/extra-assembly']);
  }

  getCapitalChangeStateLabel(state: number): string {
    return this.extraEnumService.getCapitalChangeStateLabel(state);
  }

  getCapitalIncreaseTypeLabel(type: number): string {
    return this.extraEnumService.getCapitalIncreaseTypeLabel(type);
  }

  getBoardPositionLabel(position: number): string {
    return this.annualEnumService.getBoardPositionLabel(position);
  }

  getBoardMembershipLabel(type: number): string {
    return this.annualEnumService.getBoardMembershipTypeLabel(type);
  }

  formatNumber(value: number | null | undefined): string {
    if (value === null || value === undefined) return '-';
    return value.toLocaleString('en-US');
  }

  formatPercent(value: number | null | undefined): string {
    if (value === null || value === undefined) return '-';
    return value.toFixed(2) + '%';
  }

  getTomanTooltip(value: number | null | undefined): string {
    if (value === null || value === undefined) return '';
    return toToman(value.toString());
  }
}
