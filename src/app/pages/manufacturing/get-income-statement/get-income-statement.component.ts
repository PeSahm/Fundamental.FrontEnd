import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, tap, switchMap, catchError, of } from 'rxjs';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
import { ManufacturingService } from 'src/app/services/manufacturing.service';
import { ScreenerService } from 'src/app/services/screener.service';

@Component({
  selector: 'app-get-income-statement',
  templateUrl: './get-income-statement.component.html',
  styleUrls: ['./get-income-statement.component.scss']
})
export class GetIncomeStatementComponent implements OnInit {
  selectedSymbol = '';
  searching = false;
  searchFailed = false;
  fiscalYear = null;
  reportMonth = null;
  traceNo = null;
  reportFilter = {
    pageSize: 20,
    pageNumber: 1
  };
  isSearchBarOpen = true;
  page = 1;
  totalRecords: number = 0;
  pageSize = 20;
  KeyName: any[] = [];
  KeyNameChild: any[] = [];
  columnName: string[] = [];
  incomeStatementItems = [];
  columnNameChild: string[] = [];
  selectedItems: any = [];
  incomeStatementChildren: any[] = [];
  @ViewChild('input') searchInput!: ElementRef;
  isLoading = true;
  isLoadingChild = false;
  constructor(
    private manufacturingService: ManufacturingService,
    private service: ScreenerService,

  ) {

  }


  ngOnInit(): void {
    this.getAllManufacturingIncomeStatement();
    this.makeTableConst();
  }

  makeTableConst() {
    this.columnName = [
      'نماد', 'شماره گزارش', 'لینک', 'سال مالی',
      'ماه گزارش سال مالی',
      'عنوان'
    ];
    this.KeyName =
      [
        { name: 'symbol' },
        { name: 'traceNo' },
        { name: 'uri', hasLink: true, hasView: true },
        { name: 'fiscalYear' },
        { name: 'reportMonth' },
        { name: 'title' },

      ]

    this.columnNameChild = [
      'توضیحات',
      'مقدار',
    ]

    this.KeyNameChild = [
      { name: 'description' },
      { name: 'value', pipe: 'number' },
    ];
  }

  getAllManufacturingIncomeStatement() {
    this.manufacturingService.getAllManufacturingIncomeStatement(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.incomeStatementItems = res.items;
          this.totalRecords = res.meta.total;

        },
        error: (err) => {
          // Handle errors here
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
  searchTable() {
    this.isLoading = true;
    this.incomeStatementItems = [];
    this.page = 1;
    this.pageSize = 20;
    const command = {
      ...this.reportFilter,
      year: this.fiscalYear,
      reportMonth: this.reportMonth,
      IsinList: this.selectedItems.map((item: any) => item?.isin),
      traceNo: this.traceNo,
      pageNumber: 1,
      pageSize: 20,

    }
    this.reportFilter = command;
    this.manufacturingService.getAllManufacturingIncomeStatement(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.incomeStatementItems = res.items
          this.totalRecords = res.meta.total
        },
        complete: () => {
          this.isLoading = false;

        }
      })
    this.isSearchBarOpen = false;
  }
  changePage(e: any) {
    this.isLoading = true;
    this.incomeStatementItems = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllManufacturingIncomeStatement();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.incomeStatementItems = [];
    this.pageSize = Number(e.target.value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllManufacturingIncomeStatement();
  }
  selected(items: any) {
    this.selectedItems = items;
  }
  getDetailRow(row: any) {
    if (row.expand) {
      this.isLoadingChild = true;
      this.incomeStatementChildren = [];
      this.manufacturingService.getManufacturingIncomeStatementDetail(row.rowData)
        .subscribe((res: any) => {
          this.incomeStatementChildren = res;
          this.isLoadingChild = false;
        })
    }


  }

}
