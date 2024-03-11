import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { KeyName, ManufacturingBalanceSheet, ManufacturingBalanceSheetDataFrom, ManufacturingBalanceSheetDetailsRow, SortOption } from 'src/app/models/models';
import { ManufacturingService } from 'src/app/services/manufacturing.service';
import { ScreenerService } from 'src/app/services/screener.service';
@Component({
  selector: 'app-get-manufacturing-balance-sheet',
  templateUrl: './get-manufacturing-balance-sheet.component.html',
  styleUrls: ['./get-manufacturing-balance-sheet.component.scss']
})
export class GetManufacturingBalanceSheetComponent implements OnInit, OnDestroy {
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
  KeyName: KeyName[] = [];
  KeyNameChild: any[] = [];
  columnName: any[] = [];
  balanceSheetItems: ManufacturingBalanceSheet[] = [];
  columnNameChild: string[] = [];
  selectedItems: any = [];
  balanceSheetChildren: any[] = [];
  @ViewChild('input') searchInput!: ElementRef;
  isLoading = true;
  isLoadingChild = false;
  destroy$ = new Subject<void>();
  constructor(
    private manufacturingService: ManufacturingService,
    private service: ScreenerService,

  ) {

  }

  ngOnInit(): void {
    this.getAllManufacturingBalanceSheet();
    this.makeTableConst();
  }

  makeTableConst() {
    this.columnName = [
      { name: 'symbol', title: 'نماد', hasSort: true },
      { name: 'traceNo', title: 'شماره گزارش', hasSort: true },
      { name: 'uri', title: 'لینک', hasLink: true, hasView: true },
      { name: 'fiscalYear', title: 'سال مالی', hasSort: true },
      { name: 'reportMonth', title: 'ماه گزارش سال مالی', hasSort: true },
      { name: 'title', title: 'عنوان' },
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
      'عنوان',
      'مقدار',
    ]

    this.KeyNameChild = [
      { name: 'description' },
      { name: 'categoryDescription' },
      { name: 'value', pipe: 'number' },
    ];
  }

  getAllManufacturingBalanceSheet() {
    this.isLoading = true;
    this.manufacturingService.getAllManufacturingBalanceSheet(this.reportFilter)
      .pipe(takeUntil(this.destroy$),
        finalize(() => this.isLoading = false)
      )
      .subscribe({
        next: (res) => {
          this.balanceSheetItems = res.data.items;
          this.totalRecords = res.data.meta.total;
        },
        error: (err) => {
          // Handle errors here
        }
      });
  }

  searchTable() {
    this.isLoading = true;
    this.balanceSheetItems = [];
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
    this.manufacturingService.getAllManufacturingBalanceSheet(this.reportFilter)
      .subscribe({
        next: (res: ManufacturingBalanceSheetDataFrom) => {
          this.balanceSheetItems = res.data.items;
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
    this.balanceSheetItems = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllManufacturingBalanceSheet();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.balanceSheetItems = [];
    this.pageSize = Number(e.target.value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllManufacturingBalanceSheet();
  }

  selected(items: any) {
    this.selectedItems = items;
  }
  getDetailRow(row: {
    expand: boolean,
    rowData: ManufacturingBalanceSheet
  }) {
    if (row.expand) {
      this.isLoadingChild = true;
      this.balanceSheetChildren = [];
      this.manufacturingService.getManufacturingBalanceSheetDetail(row.rowData)
        .pipe(takeUntil(this.destroy$),
          finalize(() => this.isLoadingChild = false)
        )
        .subscribe((res: ManufacturingBalanceSheetDetailsRow) => {
          this.balanceSheetChildren = res.data;
        })
    }
  }
  handleSort(option: SortOption) {    
    this.isLoading = true;
    this.balanceSheetItems = [];
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
    this.manufacturingService.getAllManufacturingBalanceSheet(this.reportFilter)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (res) => {
          this.balanceSheetItems = res.data.items
          this.totalRecords = res.data.meta.total
        }
      })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
