import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ManufacturingService } from 'src/app/services/manufacturing.service';
import { ScreenerService } from 'src/app/services/screener.service';
@Component({
  selector: 'app-get-manufacturing-balance-sheet',
  templateUrl: './get-manufacturing-balance-sheet.component.html',
  styleUrls: ['./get-manufacturing-balance-sheet.component.scss']
})
export class GetManufacturingBalanceSheetComponent implements OnInit {
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
  balanceSheetItems = [];
  columnNameChild: string[] = [];
  selectedItems: any = [];
  balanceSheetChildren: any[] = [];
  @ViewChild('input') searchInput!: ElementRef;
  isLoading = true;
  isLoadingChild = false;
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
    this.manufacturingService.getAllManufacturingBalanceSheet(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.balanceSheetItems = res.items;
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
        next: (res: any) => {
          this.balanceSheetItems = res.items
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


  toggleSearchFilter(el: ElementRef) {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }

  getDetailRow(row: any) {
    if (row.expand) {
      this.isLoadingChild = true;
      this.balanceSheetChildren = [];
      this.manufacturingService.getManufacturingBalanceSheetDetail(row.rowData)
        .subscribe((res: any) => {
          this.balanceSheetChildren = res;
          this.isLoadingChild = false;
        })
    }
  }
}
