import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ManufacturingService } from 'src/app/services/manufacturing.service';

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
  columnNameChild : string[] = [];
  @ViewChild('input') searchInput!: ElementRef;
  isLoading = true;
  constructor(
    private manufacturingService : ManufacturingService
  ){

  }
  ngOnInit(): void {
    this.getAllManufacturingBalanceSheet();
    this.makeTableConst();
  }
  
  makeTableConst() {
    this.columnName = [
     'نماد', 'شماره گزارش', 'لینک', 'سال مالی', 'ماه انتهای سال مالی',
      'ماه گزارش سال مالی',
      'حسابرسی شده',
      'عنوان'
    ];
    this.KeyName =
      [
        { name: 'symbol' },
        { name: 'traceNo' },
        { name: 'uri', hasLink: true, hasView: true },
        { name: 'fiscalYear' },
        { name: 'yearEndMonth' },
        { name: 'reportMonth' },
        { name: 'isAuditedDescription' },
        { name: 'title' },

      ]

      this.columnNameChild = [
        'سفارش',
        'ردیف',
        'توضیحات',
        'عنوان',
        'مقدار',
      ]

      this.KeyNameChild = [
        { name: 'order' },
        { name: 'codalRow' },
        { name: 'description' },
        { name: 'categoryDescription' },
        { name: 'value' , pipe: 'number' },
      ];
  }

  getAllManufacturingBalanceSheet(){
    this.manufacturingService.getAllManufacturingBalanceSheet()
    .subscribe({
      next: (res: any) => {
        this.balanceSheetItems = res.items;
        // this.totalRecords = res.data.meta.total;
      },
      error: (err) => {
        // Handle errors here
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  toggleSearchFilter(el: ElementRef) {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }
  searchTable() {

  }

}
