import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { AnnualAssemblyService } from 'src/app/services/annual-assembly.service';
import { AnnualAssemblyListItem } from 'src/app/models/annual-assembly';

@Component({
  selector: 'app-annual-assembly-list',
  templateUrl: './annual-assembly-list.component.html',
  styleUrls: ['./annual-assembly-list.component.scss']
})
export class AnnualAssemblyListComponent implements OnInit, OnDestroy {
  selectedItems: any = [];
  fiscalYear: number | null = null;
  reportMonth: number | null = null;
  reportFilter = {
    pageSize: 20,
    pageNumber: 1,
    orderBy: ''
  };
  totalRecords = 0;

  reports: AnnualAssemblyListItem[] = [];
  isLoading = true;
  destroy$ = new Subject<void>();
  KeyName: any[] = [];
  columnName: any[] = [];

  months = [
    { value: 1, label: 'فروردین' },
    { value: 2, label: 'اردیبهشت' },
    { value: 3, label: 'خرداد' },
    { value: 4, label: 'تیر' },
    { value: 5, label: 'مرداد' },
    { value: 6, label: 'شهریور' },
    { value: 7, label: 'مهر' },
    { value: 8, label: 'آبان' },
    { value: 9, label: 'آذر' },
    { value: 10, label: 'دی' },
    { value: 11, label: 'بهمن' },
    { value: 12, label: 'اسفند' }
  ];

  constructor(
    private service: AnnualAssemblyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllReports();
    this.makeTableConst();
  }

  makeTableConst() {
    this.columnName = [
      { name: null, title: 'عملیات' },
      { name: 'symbol', title: 'نماد', hasSort: true },
      { name: 'isin', title: 'ISIN', hasSort: false },
      { name: 'fiscalYear', title: 'سال مالی', hasSort: true },
      { name: 'assemblyDate', title: 'تاریخ مجمع', hasSort: true },
      { name: 'assemblyResultTypeTitle', title: 'نتیجه مجمع', hasSort: false },
      { name: 'publishDate', title: 'تاریخ انتشار', hasSort: true },
      { name: 'version', title: 'نسخه', hasSort: false },
      { name: 'htmlUrl', title: 'لینک CODAL', hasLink: true, hasView: true }
    ];

    this.KeyName = [
      { name: 'عملیات', onClick: true, uniqueKey: 'id', iconClass: 'fa fa-eye text-primary', title: 'مشاهده جزئیات', hasModal: true },
      { name: 'symbol' },
      { name: 'isin' },
      { name: 'fiscalYear' },
      { name: 'assemblyDate' },
      { name: 'assemblyResultTypeTitle' },
      { name: 'publishDate' },
      { name: 'version' },
      { name: 'htmlUrl', hasLink: true, hasView: true }
    ];
  }

  getAllReports() {
    this.isLoading = true;
    const isin = this.selectedItems.length > 0 ? this.selectedItems[0]?.isin : undefined;

    this.service
      .getList(
        isin,
        this.fiscalYear || undefined,
        this.reportMonth || undefined,
        this.reportFilter.pageNumber,
        this.reportFilter.pageSize,
        this.reportFilter.orderBy || undefined
      )
      .pipe(takeUntil(this.destroy$), finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (res: any) => {
          this.reports = res.data?.items || res.items || [];
          this.totalRecords = res.data?.meta?.total || res.totalCount || 0;
        },
        error: (err) => {
          console.error('Error fetching annual assembly reports:', err);
          this.reports = [];
        }
      });
  }

  searchTable() {
    this.isLoading = true;
    this.reports = [];
    this.reportFilter.pageNumber = 1;
    this.getAllReports();
  }

  changePage(e: any) {
    this.isLoading = true;
    this.reports = [];
    this.reportFilter.pageNumber = e;
    this.getAllReports();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.reports = [];
    this.reportFilter.pageSize = Number(e.target.value);
    this.reportFilter.pageNumber = 1;
    this.getAllReports();
  }

  openViewPage(rowItem: any) {
    if (rowItem && rowItem.id) {
      this.router.navigate(['/annual-assembly', rowItem.id]);
    }
  }

  selected(items: any) {
    this.selectedItems = items?.item ? [items.item] : [];
  }

  handleSort(option: any) {
    this.isLoading = true;
    this.reports = [];
    this.reportFilter.pageNumber = 1;
    this.reportFilter.orderBy = `${option.column} ${option.sortOrder}`;
    this.getAllReports();
  }

  getMonthName(month: number): string {
    return this.months.find((m) => m.value === month)?.label || '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
