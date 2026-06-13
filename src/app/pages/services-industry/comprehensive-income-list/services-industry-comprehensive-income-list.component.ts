import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { ServicesIndustryComprehensiveIncomeService } from 'src/app/services/services-industry-comprehensive-income.service';
import { ServicesIndustryComprehensiveIncomeListItem } from 'src/app/models/services-industry/comprehensive-income.model';

@Component({
  selector: 'app-services-industry-comprehensive-income-list',
  templateUrl: './services-industry-comprehensive-income-list.component.html',
  styleUrls: ['./services-industry-comprehensive-income-list.component.scss']
})
export class ServicesIndustryComprehensiveIncomeListComponent implements OnInit, OnDestroy {
  selectedItems: any[] = [];
  fiscalYear: number | null = null;
  reportMonth: number | null = null;
  reportFilter = { pageSize: 20, pageNumber: 1, orderBy: '' };
  totalRecords = 0;
  reports: ServicesIndustryComprehensiveIncomeListItem[] = [];
  isLoading = true;
  destroy$ = new Subject<void>();

  months = [
    { value: 1, label: 'فروردین' }, { value: 2, label: 'اردیبهشت' }, { value: 3, label: 'خرداد' },
    { value: 4, label: 'تیر' }, { value: 5, label: 'مرداد' }, { value: 6, label: 'شهریور' },
    { value: 7, label: 'مهر' }, { value: 8, label: 'آبان' }, { value: 9, label: 'آذر' },
    { value: 10, label: 'دی' }, { value: 11, label: 'بهمن' }, { value: 12, label: 'اسفند' }
  ];

  constructor(private service: ServicesIndustryComprehensiveIncomeService, private router: Router) { }

  ngOnInit(): void { this.getAllReports(); }

  getAllReports(): void {
    this.isLoading = true;
    const params: any = { PageNumber: this.reportFilter.pageNumber, PageSize: this.reportFilter.pageSize };
    if (this.selectedItems.length > 0) { params.Isin = this.selectedItems[0]?.isin; }
    if (this.fiscalYear) { params.FiscalYear = this.fiscalYear; }
    if (this.reportMonth) { params.ReportMonth = this.reportMonth; }
    if (this.reportFilter.orderBy) { params.OrderBy = this.reportFilter.orderBy; }
    this.service.getAll(params)
      .pipe(takeUntil(this.destroy$), finalize(() => this.isLoading = false))
      .subscribe({
        next: (res: any) => { this.reports = res.data?.items || []; this.totalRecords = res.data?.meta?.total || 0; },
        error: (err) => { console.error('Error:', err); this.reports = []; }
      });
  }

  searchTable(): void { this.reports = []; this.reportFilter.pageNumber = 1; this.getAllReports(); }
  changePage(e: any): void { this.reports = []; this.reportFilter.pageNumber = e; this.getAllReports(); }
  changeSize(e: any): void { this.reports = []; this.reportFilter.pageSize = Number(e.target.value); this.reportFilter.pageNumber = 1; this.getAllReports(); }
  openViewPage(rowItem: ServicesIndustryComprehensiveIncomeListItem): void { if (rowItem?.id) { this.router.navigate(['/services-industry/comprehensive-income', rowItem.id]); } }
  selected(items: any): void { this.selectedItems = items?.item ? [items.item] : []; }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
