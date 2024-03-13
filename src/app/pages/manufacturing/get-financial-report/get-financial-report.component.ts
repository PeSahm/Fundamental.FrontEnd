import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScreenerService } from 'src/app/services/screener.service';
import {  Statement, SymbolDetail } from 'src/app/models/models';
import { Router } from '@angular/router';
import { StatementService } from 'src/app/services/statement.service';

@Component({
  selector: 'app-get-financial-report',
  templateUrl: './get-financial-report.component.html',
  styleUrls: ['./get-financial-report.component.scss']
})
export class GetFinancialReportComponent implements OnInit {
  selectedSymbol = '';
  searching = false;
  searchFailed = false;
  fiscalYear = null;
  reportMonth = null;
  reportFilter = {
    pageSize: 20,
    pageNumber: 1,
  };
  isSearchBarOpen = true;
  page = 1;
  totalRecords: number = 0;
  pageSize = 20;
  sortOption: any = { OrderBy: '', sortOrder: '' }
  KeyName: any[] = [];
  columnName: any[] = [];
  @ViewChild('input') searchInput!: ElementRef;
  selectedItems: SymbolDetail[] = [];
  statements: Statement[] = [];
  isLoading = true;
  constructor(
    private service: ScreenerService,
    private router: Router,
    private statementService: StatementService

  ) {

  }
  ngOnInit(): void {
    this.getAllStatements()
    this.makeTableConst()
  }

  makeTableConst() {
    this.columnName = [
      { name: '', title: 'عملیات', hasSort: false },
      { name: 'symbol', title: 'نماد', hasSort: true },
      { name: 'traceNo', title: 'شماره گزارش', hasSort: false },
      { name: 'uri', title: 'لینک', hasSort: false },
      { name: 'fiscalYear', title: 'سال مالی', hasSort: true },
      { name: 'yearEndMonth', title: 'ماه انتهای سال مالی', hasSort: true },
      { name: 'reportMonth', title: 'ماه گزارش سال مالی', hasSort: true },
      { name: 'operatingIncome', title: 'درآمد عملیاتی', hasSort: false },
      { name: 'grossProfit', title: 'سود(زيان) ناخالص', hasSort: false },
      { name: 'netProfit', title: 'سود(زيان) عملياتى', hasSort: false },
      { name: 'expense', title: 'هزینه', hasSort: false },
      { name: 'asset', title: 'دارایی', hasSort: false },
      { name: 'ownersEquity', title: 'دريافتني‌هاي تجاري و ساير دريافتني‌ها', hasSort: false },
      { name: 'receivables', title: 'حقوق مالکانه', hasSort: false },
      { name: 'bankInterestIncome', title: 'سود سپرده بانکی', hasSort: false },
      { name: 'investmentIncome', title: 'درآمد حاصل از سرمایه گذاری', hasSort: false },
    ];
    this.KeyName =
      [
        { name: 'عملیات', onClick: true, hasEdit: true, uniqueKey: 'id' },
        { name: 'symbol' },
        { name: 'traceNo' },
        { name: 'uri', hasLink: true, hasView: true },
        { name: 'fiscalYear' },
        { name: 'yearEndMonth' },
        { name: 'reportMonth' },
        { name: 'operatingIncome', pipe: 'number' },
        { name: 'grossProfit', pipe: 'number' },
        { name: 'operatingProfit', pipe: 'number' },
        { name: 'netProfit', pipe: 'number' },
        { name: 'expense', pipe: 'number' },
        { name: 'asset', pipe: 'number' },
        { name: 'ownersEquity', pipe: 'number' },
        { name: 'receivables', pipe: 'number' },
        { name: 'bankInterestIncome', pipe: 'number' },
        { name: 'investmentIncome', pipe: 'number' }
      ]
  }

  getAllStatements() {
    this.statementService.getAllStatements(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.statements = res.data.items;
          this.totalRecords = res.data.meta.total;
        },
        error: (err) => {
          // Handle errors here
        },
        complete: () => {
          this.isLoading = false;
        }
      });

  }

  selected(e: any) {
    this.selectedItems = e;
  }

  searchTable() {
    this.isLoading = true;
    this.statements = [];
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
    this.statementService.getAllStatements(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.statements = res.data.items
          this.totalRecords = res.data.meta.total
        },
        complete: () => {
          this.isLoading = false;

        }
      })
    this.isSearchBarOpen = false;
  }

  changePage(e: number) {
    this.isLoading = true;
    this.statements = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllStatements();
  }

  changeSize(e: Event) {
    const size = (e.target as HTMLSelectElement).value;
    this.isLoading = true;
    this.statements = [];
    this.pageSize = Number(size);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllStatements();
  }
  openEditPage(item: Statement) {
    this.router.navigate(['/financial-report'], { state: { id: item } })
  }

  handleSort(option: any) {
    this.isLoading = true;
    this.statements = [];
    this.page = 1;
    this.pageSize = 20;
    const command = {
      ...this.reportFilter,
      year: this.fiscalYear,
      reportMonth: this.reportMonth,
      IsinList: this.selectedItems.map((item: any) => item?.isin),
      pageNumber: 1,
      pageSize: 20,
      OrderBy : `${option.column} ${option.sortOrder}`
    }
    this.reportFilter = command;
    this.statementService.getAllStatements(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.statements = res.data.items
          this.totalRecords = res.data.meta.total
        },
        complete: () => {
          this.isLoading = false;

        }
      })
  }






}
