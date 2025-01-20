import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ManufacturingService } from 'src/app/services/manufacturing.service';

@Component({
  selector: 'app-non-operational-income',
  templateUrl: './non-operational-income.component.html',
  styleUrls: ['./non-operational-income.component.scss']
})
export class NonOperationalIncomeComponent implements OnInit {
  selectedItems: any = [];
  fiscalYear = null;
  reportMonth = null;
  isLoading = true;
  nonOperationalIncomeList = [];
  reportFilter = {
    pageSize: 20,
    pageNumber: 1
  };
  page = 1;
  totalRecords: number = 0;
  pageSize = 20;
  isSearchBarOpen = true;
  KeyName: any[] = [];
  columnName: any[] = [];

  constructor(
    private manufacturingService: ManufacturingService,

  ) {


  }
  ngOnInit(): void {
    this.getAllNonOperationalIncome();
    this.makeTableConst();
  }

  makeTableConst() {
    this.columnName = [
      // { name: null, title: 'عملیات' },
      { name: 'symbol', title: 'نماد', hasSort: true },
      { name: 'title', title: 'عنوان', hasSort: true },
      { name: 'traceNo', title: 'شماره گزارش', hasSort: true },
      { name: 'uri', title: 'لینک', hasLink: true, hasView: true },
      { name: 'fiscalYear', title: 'سال مالی', hasSort: true },
      { name: 'reportMonth', title: 'ماه گزارش سال مالی', hasSort: true },
      { name: 'value', title: 'مقدار' , hasSort: true},
      { name: 'description', title: 'شرح', },

    ];


    this.KeyName =
      [
        // { name: 'عملیات', onClick: true, hasEdit: true , uniqueKey :'id' },
        { name: 'symbol' },
        { name: 'title' },

        { name: 'traceNo' },
        { name: 'uri', hasLink: true, hasView: true },
        { name: 'fiscalYear' },
        { name: 'reportMonth' },
        { name: 'value', pipe: 'number' },
        { name: 'description' },

      ]
  }
  selected(items: any) {
    this.selectedItems = items;
  }

  searchTable() {
    this.isLoading = true;
    this.nonOperationalIncomeList = [];
    this.page = 1;
    this.pageSize = 20;
    const command = {
      ...this.reportFilter,
      year: this.fiscalYear,
      reportMonth: this.reportMonth,
      IsinList: this.selectedItems.map((item: any) => item?.isin),
      pageNumber: 1,
      pageSize: 20,
      OrderBy:''

    }
    this.reportFilter = command;
    this.manufacturingService.getAllNonOperationalIncome(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.nonOperationalIncomeList = res.items
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
    this.nonOperationalIncomeList = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllNonOperationalIncome();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.nonOperationalIncomeList = [];
    this.pageSize = Number(e.target.value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllNonOperationalIncome();
  }

  getAllNonOperationalIncome() {
    this.manufacturingService.getAllNonOperationalIncome(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.nonOperationalIncomeList = res.items;
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
  handleSort(option: any) {
    this.isLoading = true;
    this.nonOperationalIncomeList = [];
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
    this.manufacturingService.getAllNonOperationalIncome(this.reportFilter)
      .pipe(finalize(() => {
        this.isLoading = false;
      }))
      .subscribe({
        next: (res: any) => {
          this.nonOperationalIncomeList = res.items
          this.totalRecords = res.meta.total
        }
      })
  }


}
