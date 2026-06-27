import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { ServicesIndustryComprehensiveIncomeService } from 'src/app/services/services-industry-comprehensive-income.service';
import { ColumnName, DetailRow, KeyName, KeyNameChild } from 'src/app/models/models';

interface ServicesIndustryComprehensiveIncomeItem {
  id: string;
  symbol: string;
  isin: string;
  fiscalYear: number;
  reportMonth: number;
  publishDate: string;
  uri: string;
}

interface ServicesIndustryComprehensiveIncomeDetailItem {
  row: number;
  codalRow: number;
  description: string;
  value: number | null;
}

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
  reports: ServicesIndustryComprehensiveIncomeItem[] | null = null;
  children: ServicesIndustryComprehensiveIncomeDetailItem[] | null = null;
  isLoading = true;
  isLoadingChild = false;
  destroy$ = new Subject<void>();
  KeyName: KeyName[] = [];
  KeyNameChild: KeyNameChild[] = [];
  columnName: ColumnName[] = [];
  columnNameChild: string[] = [];

  months = [
    { value: 1, label: 'فروردین' }, { value: 2, label: 'اردیبهشت' }, { value: 3, label: 'خرداد' },
    { value: 4, label: 'تیر' }, { value: 5, label: 'مرداد' }, { value: 6, label: 'شهریور' },
    { value: 7, label: 'مهر' }, { value: 8, label: 'آبان' }, { value: 9, label: 'آذر' },
    { value: 10, label: 'دی' }, { value: 11, label: 'بهمن' }, { value: 12, label: 'اسفند' }
  ];

  constructor(private service: ServicesIndustryComprehensiveIncomeService) { }

  ngOnInit(): void {
    this.getAllReports();
    this.makeTableConst();
  }

  makeTableConst(): void {
    this.columnName = [
      { name: 'symbol', title: 'نماد', hasSort: true },
      { name: 'isin', title: 'ISIN' },
      { name: 'fiscalYear', title: 'سال مالی', hasSort: true },
      { name: 'reportMonth', title: 'ماه گزارش', hasSort: true },
      { name: 'publishDate', title: 'تاریخ انتشار', hasSort: true },
      { name: 'uri', title: 'لینک CODAL', hasLink: true, hasView: true },
    ];
    this.KeyName = [
      { name: 'symbol' },
      { name: 'isin' },
      { name: 'fiscalYear' },
      { name: 'reportMonth' },
      { name: 'publishDate' },
      { name: 'uri', hasLink: true, hasView: true },
    ];

    this.columnNameChild = [
      'ردیف',
      'کدال ردیف',
      'شرح',
      'مقدار',
    ];
    this.KeyNameChild = [
      { name: 'row' },
      { name: 'codalRow' },
      { name: 'description' },
      { name: 'value', pipe: 'number' },
    ];
  }

  getAllReports(): void {
    this.isLoading = true;
    const params: any = { PageNumber: this.reportFilter.pageNumber, PageSize: this.reportFilter.pageSize };
    if (this.selectedItems.length > 0) { params.IsinList = this.selectedItems[0]?.isin; }
    if (this.fiscalYear) { params.FiscalYear = this.fiscalYear; }
    if (this.reportMonth) { params.ReportMonth = this.reportMonth; }
    if (this.reportFilter.orderBy) { params.OrderBy = this.reportFilter.orderBy; }
    this.service.getAll(params)
      .pipe(takeUntil(this.destroy$), finalize(() => this.isLoading = false))
      .subscribe({
        next: (res: any) => {
          this.reports = res.data?.items || [];
          this.totalRecords = res.data?.meta?.total || 0;
        },
        error: () => { this.reports = []; }
      });
  }

  getDetailRow(row: DetailRow<ServicesIndustryComprehensiveIncomeItem>): void {
    if (row.expand) {
      this.isLoadingChild = true;
      this.children = null;
      this.service.getById(row.rowData.id)
        .pipe(takeUntil(this.destroy$), finalize(() => this.isLoadingChild = false))
        .subscribe((res: any) => {
          this.children = res.data?.details ?? [];
        });
    }
  }

  searchTable(): void {
    this.isLoading = true;
    this.reports = null;
    this.reportFilter.pageNumber = 1;
    this.getAllReports();
  }

  changePage(e: any): void {
    this.isLoading = true;
    this.reports = null;
    this.reportFilter.pageNumber = e;
    this.getAllReports();
  }

  changeSize(e: any): void {
    this.isLoading = true;
    this.reports = null;
    this.reportFilter.pageSize = Number(e.target.value);
    this.reportFilter.pageNumber = 1;
    this.getAllReports();
  }

  selected(items: any): void { this.selectedItems = items?.item ? [items.item] : []; }

  handleSort(option: any): void {
    this.isLoading = true;
    this.reports = null;
    this.reportFilter.pageNumber = 1;
    this.reportFilter.orderBy = `${option.column} ${option.sortOrder}`;
    this.getAllReports();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
