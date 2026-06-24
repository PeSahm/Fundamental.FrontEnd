import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { InvestmentBalanceSheetService } from 'src/app/services/investment-balance-sheet.service';
import { ColumnName, DetailRow, KeyName, KeyNameChild } from 'src/app/models/models';

interface InvestmentBalanceSheetItem {
  id: string;
  symbol: string;
  isin: string;
  fiscalYear: number;
  reportMonth: number;
  publishDate: string;
  version: number;
  uri: string;
}

interface InvestmentBalanceSheetDetailItem {
  row: number;
  codalRow: number;
  description: string;
  value: number | null;
}

@Component({
  selector: 'app-investment-balance-sheet-list',
  templateUrl: './investment-balance-sheet-list.component.html',
  styleUrls: ['./investment-balance-sheet-list.component.scss']
})
export class InvestmentBalanceSheetListComponent implements OnInit, OnDestroy {
  selectedItems: any = [];
  fiscalYear: number | null = null;
  reportMonth: number | null = null;
  reportFilter = {
    pageSize: 20,
    pageNumber: 1,
    orderBy: ''
  };
  totalRecords: number = 0;
  reports: InvestmentBalanceSheetItem[] | null = null;
  children: InvestmentBalanceSheetDetailItem[] | null = null;
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

  constructor(private service: InvestmentBalanceSheetService) { }

  ngOnInit(): void {
    this.getAllReports();
    this.makeTableConst();
  }

  makeTableConst() {
    this.columnName = [
      { name: 'symbol', title: 'نماد', hasSort: true },
      { name: 'isin', title: 'ISIN' },
      { name: 'fiscalYear', title: 'سال مالی', hasSort: true },
      { name: 'reportMonth', title: 'ماه گزارش', hasSort: true },
      { name: 'publishDate', title: 'تاریخ انتشار', hasSort: true },
      { name: 'version', title: 'نسخه' },
      { name: 'uri', title: 'لینک CODAL', hasLink: true, hasView: true },
    ];
    this.KeyName = [
      { name: 'symbol' },
      { name: 'isin' },
      { name: 'fiscalYear' },
      { name: 'reportMonth' },
      { name: 'publishDate' },
      { name: 'version' },
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

  getAllReports() {
    this.isLoading = true;
    const params: any = {
      PageNumber: this.reportFilter.pageNumber,
      PageSize: this.reportFilter.pageSize
    };
    if (this.selectedItems.length > 0) { params.Isin = this.selectedItems[0]?.isin; }
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

  getDetailRow(row: DetailRow<InvestmentBalanceSheetItem>) {
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

  searchTable() {
    this.isLoading = true;
    this.reports = null;
    this.reportFilter.pageNumber = 1;
    this.getAllReports();
  }

  changePage(e: any) {
    this.isLoading = true;
    this.reports = null;
    this.reportFilter.pageNumber = e;
    this.getAllReports();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.reports = null;
    this.reportFilter.pageSize = Number(e.target.value);
    this.reportFilter.pageNumber = 1;
    this.getAllReports();
  }

  selected(items: any) { this.selectedItems = items?.item ? [items.item] : []; }

  handleSort(option: any) {
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
