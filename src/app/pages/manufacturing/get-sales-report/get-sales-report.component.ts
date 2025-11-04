import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ScreenerService } from 'src/app/services/screener.service';
import { MonthlyActivityService } from 'src/app/services/monthly-activity.service';
import { Router } from '@angular/router';
import { Subject, finalize, takeUntil } from 'rxjs';
@Component({
  selector: 'app-get-sales-report',
  templateUrl: './get-sales-report.component.html',
  styleUrls: ['./get-sales-report.component.scss']
})
export class GetSalesReportComponent implements OnInit, OnDestroy {

  selectedSymbol = '';
  searching = false;
  searchFailed = false;
  fiscalYear = null;
  reportMonth = null;
  reportFilter = {
    pageSize: 20,
    pageNumber: 1
  };
  isSearchBarOpen = true;
  page = 1;
  totalRecords: number = 0;
  pageSize = 20;

  @ViewChild('input') searchInput!: ElementRef;
  selectedItems: any = [];
  sales: any[] | null = null;
  isLoading = true;
  destroy$ = new Subject<void>();
  KeyName: any[] = [];
  columnName: any[] = [];
  constructor(
    private service: ScreenerService,
    private monthlyReportService: MonthlyActivityService,
    private router: Router
  ) {

  }



  ngOnInit(): void {
    this.getAllSales();
    this.makeTableConst();
  }
  makeTableConst() {
    this.columnName = [
      { name: null, title: 'عملیات' },
      { name: 'symbol', title: 'نماد', hasSort: true },
      { name: 'traceNo', title: 'شماره گزارش', hasSort: true },
      { name: 'uri', title: 'لینک', hasLink: true, hasView: true },
      { name: 'fiscalYear', title: 'سال مالی', hasSort: true },
      { name: 'reportMonth', title: 'ماه گزارش سال مالی', hasSort: true },
      { name: 'saleBeforeCurrentMonth', title: 'فروش اول سال مالی تا ماه قبل سال جاری' , hasSort: true},
      { name: 'saleCurrentMonth', title: 'فروش ماه جاری' , hasSort: true},
      { name: 'saleIncludeCurrentMonth', title: 'فروش از ابتدای سال مالی تا انتهای ماه جاری', hasSort: true },
      { name: 'saleLastYear', title: 'فروش اول سال مالی تا ماه قبل سال قبل' , hasSort: true},
    ];


    this.KeyName =
      [
        { name: null, onClick: true, hasView: true, hasEdit: true, uniqueKey: 'id' },
        { name: 'symbol' },
        { name: 'traceNo' },
        { name: 'uri', hasLink: true, hasView: true },
        { name: 'fiscalYear' },
        { name: 'reportMonth' },
        { name: 'saleBeforeCurrentMonth', pipe: 'number' },
        { name: 'saleCurrentMonth', pipe: 'number' },
        { name: 'saleIncludeCurrentMonth', pipe: 'number' },
        { name: 'saleLastYear', pipe: 'number' },
      ]
  }

  getAllSales() {
    this.isLoading = true;
    this.monthlyReportService.getAllMonthlyReport(this.reportFilter)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res: any) => {
          this.sales = res.data?.items;
          this.totalRecords = res.data?.meta?.total || 0;
        },
        error: (err) => {
          // Handle errors here
        }
      });
  }


  searchTable() {
    this.isLoading = true;
    this.sales = null;
    this.page = 1;
    this.pageSize = 20;
    const command: any = {
      ...this.reportFilter,
      pageNumber: 1,
      pageSize: 20,
    };

    if (this.fiscalYear) {
      command.year = this.fiscalYear;
    }
    if (this.reportMonth) {
      command.reportMonth = this.reportMonth;
    }
    if (this.selectedItems.length > 0) {
      command.IsinList = this.selectedItems.map((item: any) => item?.isin);
    }

    this.reportFilter = command;
    this.getAllSales();
    this.isSearchBarOpen = false;
  }

  changePage(e: any) {
    this.isLoading = true;
    this.sales = null;
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllSales();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.sales = null;
    this.pageSize = Number(e.target.value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllSales();
  }
  openEditPage(actionData: any) {
    if (actionData.action === 'edit') {
      this.router.navigate(['/sales-report'], { state: { id: actionData.data } });
    } else if (actionData.action === 'view') {
      this.router.navigate(['/monthly-activity-detail', actionData.data]);
    }
  }

  selected(items: any) {
    this.selectedItems = items;
  }

  handleSort(option: any) {
    this.isLoading = true;
    this.sales = null;
    this.page = 1;
    this.pageSize = 20;
    const command: any = {
      ...this.reportFilter,
      pageNumber: 1,
      pageSize: 20,
      OrderBy: `${option.column} ${option.sortOrder}`
    };

    if (this.fiscalYear) {
      command.year = this.fiscalYear;
    }
    if (this.reportMonth) {
      command.reportMonth = this.reportMonth;
    }
    if (this.selectedItems.length > 0) {
      command.IsinList = this.selectedItems.map((item: any) => item?.isin);
    }

    this.reportFilter = command;
    this.getAllSales();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
