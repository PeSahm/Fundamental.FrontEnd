import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ScreenerService } from 'src/app/services/screener.service';
import { MonthlyActivityService } from 'src/app/services/monthly-activity.service';
import { Router } from '@angular/router';
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
  columnName: string[] = [];
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
      'عملیات', 'نماد', 'شماره گزارش', 'لینک', 'سال مالی', 'ماه انتهای سال مالی',
      'ماه گزارش سال مالی',
       'فروش اول سال مالی تا ماه قبل سال جاری',
        'فروش ماه جاری', 
        'فروش از ابتدای سال مالی تا انتهای ماه جاری	', 
        'فروش اول سال مالی تا ماه قبل سال قبل	', 
        'دارای فروش شرکت های زیر مجموعه', 
    ];
    this.KeyName =
      [
        { name: 'عملیات', onClick: true, hasEdit: true },
        { name: 'symbol' },
        { name: 'traceNo' },
        { name: 'uri', hasLink: true, hasView: true },
        { name: 'fiscalYear' },
        { name: 'yearEndMonth' },
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
    this.pageSize = 10;
    const command = {
      ...this.reportFilter,
      year: this.fiscalYear,
      reportMonth: this.reportMonth,
      IsinList: this.selectedItems.map((item: any) => item?.isin),
      pageNumber: 1,
      pageSize: 10,

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

  selected(e: any) {
    e.preventDefault();
    let selectedSymbol = e['item']
    this.selectedItems.push(selectedSymbol);
    this.searchInput.nativeElement.value = '';
  }
  close(item: any) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.searchInput.nativeElement.focus();
  }

  toggleSearchFilter(el: ElementRef) {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this.service.searchSymbol(term)
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => of<SearchSymbol>({ success: false, data: [], error: null }))
          )
      ),
      switchMap(result => of(result)),
      tap(() => (this.searching = false)),
    );
  resultFormatter = (result: SymbolDetail) => result.name + ' - ' + result.title;
  inputFormatter = (result: SymbolDetail) => result.name;

  openEditPage(id: any) {
    this.router.navigate(['/sales-report'], { state: { id } })
  }

}
