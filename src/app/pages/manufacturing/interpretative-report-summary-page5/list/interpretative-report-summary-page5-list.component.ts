import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { InterpretativeReportSummaryPage5Service } from 'src/app/services/interpretative-report-summary-page5.service';
import { InterpretativeReportSummaryPage5ListItem } from 'src/app/models/interpretative-report-summary-page5';

@Component({
  selector: 'app-interpretative-report-summary-page5-list',
  templateUrl: './interpretative-report-summary-page5-list.component.html',
  styleUrls: ['./interpretative-report-summary-page5-list.component.scss']
})
export class InterpretativeReportSummaryPage5ListComponent implements OnInit, OnDestroy {
  selectedItems: any = [];
  fiscalYear: number | null = null;
  reportMonth: number | null = null;
  reportFilter = {
    pageSize: 20,
    pageNumber: 1
  };
  page = 1;
  totalRecords: number = 0;
  pageSize = 20;

  reports: InterpretativeReportSummaryPage5ListItem[] = [];
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
    private service: InterpretativeReportSummaryPage5Service,
    private router: Router
  ) { }

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
      { name: 'reportMonth', title: 'ماه گزارش', hasSort: true },
      { name: 'publishDate', title: 'تاریخ انتشار', hasSort: true },
      { name: 'version', title: 'نسخه', hasSort: false },
      { name: 'uri', title: 'لینک CODAL', hasLink: true, hasView: true }
    ];

    this.KeyName = [
      { name: 'عملیات', onClick: true, uniqueKey: 'id', iconClass: 'fa fa-eye text-primary', title: 'مشاهده جزئیات', hasModal: true },
      { name: 'symbol' },
      { name: 'isin' },
      { name: 'fiscalYear' },
      { name: 'reportMonth' },
      { name: 'publishDate' },
      { name: 'version' },
      { name: 'uri', hasLink: true, hasView: true }
    ];
  }

  getAllReports() {
    this.isLoading = true;
    const isin = this.selectedItems.length > 0 ? this.selectedItems[0]?.isin : undefined;
    
    this.service.getList(
      isin,
      this.fiscalYear || undefined,
      this.reportMonth || undefined,
      this.reportFilter.pageNumber,
      this.reportFilter.pageSize
    )
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res: any) => {
          this.reports = res.data?.items || [];
          this.totalRecords = res.data?.meta?.total || 0;
        },
        error: (err) => {
          console.error('Error fetching reports:', err);
          this.reports = [];
        }
      });
  }

  searchTable() {
    this.isLoading = true;
    this.reports = [];
    this.page = 1;
    this.pageSize = 20;
    this.reportFilter = {
      pageNumber: 1,
      pageSize: 20
    };
    this.getAllReports();
  }

  changePage(e: any) {
    this.isLoading = true;
    this.reports = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    };
    this.getAllReports();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.reports = [];
    this.pageSize = Number(e.target.value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1
    };
    this.getAllReports();
  }

  openViewPage(rowItem: any) {
    if (rowItem && rowItem.id) {
      this.router.navigate(['/interpretative-report-summary-page5', rowItem.id]);
    }
  }

  selected(items: any) {
    this.selectedItems = items?.item ? [items.item] : [];
  }

  handleSort(option: any) {
    this.isLoading = true;
    this.reports = [];
    this.page = 1;
    this.pageSize = 20;
    this.reportFilter = {
      pageNumber: 1,
      pageSize: 20
    };
    this.getAllReports();
  }

  getMonthName(month: number): string {
    return this.months.find(m => m.value === month)?.label || '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
