import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ManufacturingService } from 'src/app/services/manufacturing.service';
import { NonOperationalIncomeTagModalComponent } from './non-operational-income-tag-modal/non-operational-income-tag-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    pageNumber: 1,
  };
  page = 1;
  totalRecords: number = 0;
  pageSize = 20;
  isSearchBarOpen = true;
  KeyName: any[] = [];
  columnName: any[] = [];
  onlyTagged = false;
  tagStatus="1"
  constructor(
    private manufacturingService: ManufacturingService,
    private modalService: NgbModal


  ) {


  }
  ngOnInit(): void {
    this.getAllNonOperationalIncome();
    this.makeTableConst();
  }

  makeTableConst() {
    this.columnName = [
      { name: null, title: 'عملیات' },
      { name: 'symbol', title: 'نماد', hasSort: true },
      { name: 'title', title: 'عنوان', hasSort: true },
      { name: 'traceNo', title: 'شماره گزارش', hasSort: true },
      { name: 'uri', title: 'لینک', hasLink: true, hasView: true },
      { name: 'fiscalYear', title: 'سال مالی', hasSort: true },
      { name: 'reportMonth', title: 'ماه گزارش سال مالی', hasSort: true },
      { name: 'value', title: 'مقدار', hasSort: true },
      { name: 'tags', title: 'دارای تگ'},
      { name: 'description', title: 'شرح', },

    ];


    this.KeyName =
      [
        {
          name: 'عملیات', onClick: true, uniqueKey: 'id', iconClass: 'fa fa-edit text-success', hasModal: true
        },
        { name: 'symbol' },
        { name: 'title' },

        { name: 'traceNo' },
        { name: 'uri', hasLink: true, hasView: true },
        { name: 'fiscalYear' },
        { name: 'reportMonth' },
        { name: 'value', pipe: 'number' },
        { name: 'tags' , isBoolean:true},
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
      OrderBy: '',
      tagStatus : this.tagStatus


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
    const command  = {...this.reportFilter , tagStatus : this.tagStatus}
    this.manufacturingService.getAllNonOperationalIncome(command)
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

  openAddTagModal(rowItem) {
    const modalRef = this.modalService.open(NonOperationalIncomeTagModalComponent, { size: 'lg' });
    modalRef.componentInstance.rowItem = rowItem;
    modalRef.result.then((data) => {
      this.getAllNonOperationalIncome();

    });

  }


}
