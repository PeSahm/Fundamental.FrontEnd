// #Best Practice Solution
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, finalize, takeUntil } from 'rxjs';
import { ColumnName, DetailRow, KeyName, KeyNameChild, ManufacturingBalanceSheet, ManufacturingBalanceSheetDetails, SortOption, SymbolDetail } from 'src/app/models/models';
import { ManufacturingService } from 'src/app/services/manufacturing.service';
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
  pageSize = 20;
  KeyName: KeyName[] = [];
  KeyNameChild: KeyNameChild[] = [];
  columnName: ColumnName[] = [];
  columnNameChild: string[] = [];
  selectedItems: SymbolDetail[] = [];
  @ViewChild('input') searchInput!: ElementRef;
  isLoading = true;
  isLoadingChild = false;
  destroy$ = new Subject<void>();
  balanceSheetItems: ManufacturingBalanceSheet[];
  balanceSheetChildren: ManufacturingBalanceSheetDetails[] | null;
  totalRecords: number = 0;

  constructor(
    private manufacturingService: ManufacturingService,
  ) { }

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
          this.balanceSheetItems = res.data?.items;
          this.totalRecords = res.data.meta?.total || 0;
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
      IsinList: this.selectedItems.map((item) => item?.isin),
      traceNo: this.traceNo,
      pageNumber: 1,
      pageSize: 20,

    }
    this.reportFilter = command;
    this.getAllManufacturingBalanceSheet();
    this.isSearchBarOpen = false;
  }
  changePage(e: number) {
    this.isLoading = true;
    this.balanceSheetItems = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllManufacturingBalanceSheet();
  }

  changeSize(e: Event) {
    this.isLoading = true;
    this.balanceSheetItems = [];
    this.pageSize = Number((e.target as HTMLInputElement).value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllManufacturingBalanceSheet();
  }

  selected(items: SymbolDetail[]) {
    this.selectedItems = items;
  }
  getDetailRow(row: DetailRow<ManufacturingBalanceSheet>) {
    if (row.expand) {
      this.isLoadingChild = true;
      this.balanceSheetChildren = null;
      this.manufacturingService.getManufacturingBalanceSheetDetail(row.rowData)
        .pipe(takeUntil(this.destroy$),
          finalize(() => this.isLoadingChild = false))
        .subscribe((res) => {
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
      IsinList: this.selectedItems.map((item) => item.isin),
      pageNumber: 1,
      pageSize: 20,
      OrderBy: `${option.column} ${option.sortOrder}`
    }
    this.reportFilter = command;
    this.getAllManufacturingBalanceSheet();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
