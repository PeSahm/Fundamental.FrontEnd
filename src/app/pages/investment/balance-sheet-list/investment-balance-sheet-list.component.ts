import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
import { InvestmentBalanceSheetService } from 'src/app/services/investment-balance-sheet.service';

@Component({
  selector: 'app-investment-balance-sheet-list',
  templateUrl: './investment-balance-sheet-list.component.html',
  styleUrls: ['./investment-balance-sheet-list.component.scss']
})
export class InvestmentBalanceSheetListComponent implements OnInit, OnDestroy {
  selectedItems: any = [];
  fiscalYear: number | null = null;
  reportMonth: number | null = null;
  reportFilter = { pageSize: 20, pageNumber: 1, orderBy: '' };
  totalRecords: number = 0;
  reports: any[] = [];
  isLoading = true;
  destroy$ = new Subject<void>();
  KeyName: any[] = [];
  columnName: any[] = [];

  months = [
    { value: 1, label: 'فروردین' }, { value: 2, label: 'اردیبهشت' }, { value: 3, label: 'خرداد' },
    { value: 4, label: 'تیر' }, { value: 5, label: 'مرداد' }, { value: 6, label: 'شهریور' },
    { value: 7, label: 'مهر' }, { value: 8, label: 'آبان' }, { value: 9, label: 'آذر' },
    { value: 10, label: 'دی' }, { value: 11, label: 'بهمن' }, { value: 12, label: 'اسفند' }
  ];

  constructor(private service: InvestmentBalanceSheetService, private router: Router) { }

  ngOnInit(): void { this.getAllReports(); this.makeTableConst(); }

  makeTableConst() {
    this.columnName = [
      { name: null, title: 'عملیات' }, { name: 'symbol', title: 'نماد', hasSort: true },
      { name: 'isin', title: 'ISIN' }, { name: 'fiscalYear', title: 'سال مالی', hasSort: true },
      { name: 'reportMonth', title: 'ماه گزارش', hasSort: true }, { name: 'publishDate', title: 'تاریخ انتشار', hasSort: true },
      { name: 'version', title: 'نسخه' }, { name: 'uri', title: 'لینک CODAL', hasLink: true, hasView: true }
    ];
    this.KeyName = [
      { name: 'عملیات', onClick: true, uniqueKey: 'id', iconClass: 'fa fa-eye text-primary', title: 'مشاهده جزئیات', hasModal: true },
      { name: 'symbol' }, { name: 'isin' }, { name: 'fiscalYear' }, { name: 'reportMonth' },
      { name: 'publishDate' }, { name: 'version' }, { name: 'uri', hasLink: true, hasView: true }
    ];
  }

  getAllReports() {
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

  searchTable() { this.isLoading = true; this.reports = []; this.reportFilter.pageNumber = 1; this.getAllReports(); }
  changePage(e: any) { this.isLoading = true; this.reports = []; this.reportFilter.pageNumber = e; this.getAllReports(); }
  changeSize(e: any) { this.isLoading = true; this.reports = []; this.reportFilter.pageSize = Number(e.target.value); this.reportFilter.pageNumber = 1; this.getAllReports(); }
  openViewPage(rowItem: any) { if (rowItem?.id) { this.router.navigate(['/investment/balance-sheet', rowItem.id]); } }
  selected(items: any) { this.selectedItems = items?.item ? [items.item] : []; }
  handleSort(option: any) { this.isLoading = true; this.reports = []; this.reportFilter.pageNumber = 1; this.reportFilter.orderBy = `${option.column} ${option.sortOrder}`; this.getAllReports(); }
  ngOnDestroy(): void { this.destroy$.next(); this.destroy$.complete(); }
}
