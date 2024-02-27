import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScreenerService } from 'src/app/services/screener.service';
import { MonthlyActivityService } from 'src/app/services/monthly-activity.service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-get-sales-report',
  templateUrl: './get-sales-report.component.html',
  styleUrls: ['./get-sales-report.component.scss']
})
export class GetSalesReportComponent implements OnInit {

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
  sales = [];
  isLoading = true;
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
        { name: 'عملیات', onClick: true, hasEdit: true , uniqueKey :'id' },
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
    this.monthlyReportService.getAllMonthlyReport(this.reportFilter)
      .subscribe((res: any) => {
        this.sales = res.data.items
        this.totalRecords = res.data.meta.total
      }, err => {

      }, () => {
        this.isLoading = false;
      })
  }


  searchTable() {
    this.isLoading = true;
    this.sales = [];
    this.page = 1;
    this.pageSize = 20;
    const command = {
      ...this.reportFilter,
      year: this.fiscalYear,
      reportMonth: this.reportMonth,
      IsinList: this.selectedItems.map((item: any) => item?.isin),
      pageNumber: 1,
      pageSize: 20,

    }
    this.reportFilter = command;
    this.monthlyReportService.getAllMonthlyReport(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.sales = res.data.items
          this.totalRecords = res.data.meta.total
        },
        complete: () => {
          this.isLoading = false;

        }
      })
    this.isSearchBarOpen = false;
  }

  changePage(e: any) {
    this.isLoading = true;
    this.sales = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllSales();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.sales = [];
    this.pageSize = Number(e.target.value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllSales();
  }
  openEditPage(id: any) {
    this.router.navigate(['/sales-report'], { state: { id } })
  }

  selected(items: any) {
    this.selectedItems = items;
  }

  handleSort(option: any) {
    this.isLoading = true;
    this.sales = [];
    this.page = 1;
    this.pageSize = 20;
    const command = {
      ...this.reportFilter,
      year: this.fiscalYear,
      reportMonth: this.reportMonth,
      IsinList: this.selectedItems.map((item: any) => item?.isin),
      pageNumber: 1,
      pageSize: 20,
      OrderBy: `${option.column} ${option.sortOrder}`
    }
    this.reportFilter = command;
    this.monthlyReportService.getAllMonthlyReport(this.reportFilter)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (res: any) => {
          this.sales = res.data.items
          this.totalRecords = res.data.meta.total
        }
      })
  }

}
