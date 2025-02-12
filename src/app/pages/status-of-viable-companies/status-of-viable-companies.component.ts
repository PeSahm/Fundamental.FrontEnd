import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { ShareHoldersModalComponent } from '../symbol-share-holders/share-holders-modal/share-holders-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StatusOfViableCompanyService } from 'src/app/services/status-of-viable-company.service';
import { ViableCompanyReviewModalComponent } from './viable-company-review-modal/viable-company-review-modal.component';
import { SortOption } from 'src/app/models/models';

@Component({
  selector: 'app-status-of-viable-companies',
  templateUrl: './status-of-viable-companies.component.html',
  styleUrls: ['./status-of-viable-companies.component.scss']
})
export class StatusOfViableCompaniesComponent implements OnInit {
  selectedSymbol;
  reviewStatus = "1";
  // source;
  reportFilter = {
    pageSize: 20,
    pageNumber: 1,
    reviewStatus: 1,
  };
  page = 1;
  totalRecords: number = 0;
  pageSize = 20;
  tableData = [];
  KeyName: any[] = [];
  columnName: any[] = [];
  isLoading = true;
  constructor(
    private statusOfViableCompanyService: StatusOfViableCompanyService,
    private modalService: NgbModal
  ) {

  }
  ngOnInit(): void {
    this.getAllTableData();
    this.makeTableConst();
  }
  getAllTableData() {
    this.statusOfViableCompanyService.getAllStatusOfViablecompanies(this.reportFilter)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res: any) => {
          this.tableData = res.data.items;
          this.totalRecords = res.data.meta.total;
        }
      });
  }
  makeTableConst() {
    this.columnName = [
      { name: '', title: 'عملیات', hasSort: false },
      { name: 'patentSymbol', title: ' نماد سرمایه گذار', hasSort: false },
      { name: 'subsidiarySymbolName', title: 'نماد سرمایه پذیر', hasSort: false },
      { name: 'ownershipPercentage', title: 'درصد مالکیت', hasSort: true },
      { name: 'ownershipPercentageProvidedByAdmin', title: 'درصد تایید شده توسط ادمین', hasSort: true },
      { name: 'costPrice', title: 'بهای تمام شده', hasSort: true },
      { name: 'reviewStatusName', title: 'وضعیت', hasSort: false },
      { name: 'url', title: 'لینک', hasLink: true, hasView: false },

    ];
    this.KeyName =
      [
        {
          name: 'عملیات', onClick: true, uniqueKey: 'id', iconClass: 'fa fa-tasks text-primary'
          , title: 'وضعبت بررسی', hasModal: true
        },
        { name: 'patentSymbol' },
        { name: 'subsidiarySymbolName' },
        { name: 'ownershipPercentage' },
        { name: 'ownershipPercentageProvidedByAdmin' },
        { name: 'costPrice', pipe: 'number' },
        { name: 'reviewStatusName', },
        { name: 'url', hasLink: true, hasView: true  },


      ]


  }

  selected(items: any) {
    console.log("items out: " , items)
    if(items) {
      this.selectedSymbol = items['item'];
    } else{
      this.selectedSymbol = null;
    }

  }


  searchTable() {

    this.isLoading = true;
    this.tableData = [];
    this.page = 1;
    this.pageSize = 20;
    const command = {
      ...this.reportFilter,
      isin: this.selectedSymbol?.isin ?? null,
      // source: parseInt(this.source)?? null,
      reviewStatus: parseInt(this.reviewStatus) ?? null,
      pageNumber: 1,
      pageSize: 20,

    }
    this.reportFilter = command;
    this.statusOfViableCompanyService.getAllStatusOfViablecompanies(command)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (res: any) => {
          this.tableData = res.data.items;
          this.totalRecords = res.data.meta.total;

        }
      })



  }

  changePage(e: any) {
    this.isLoading = true;
    this.tableData = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllTableData();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.tableData = [];
    this.pageSize = Number(e.target.value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllTableData();
  }


  openStatusModal(rowItem) {
    const modalRef = this.modalService.open(ViableCompanyReviewModalComponent, { size: 'lg' });
    modalRef.componentInstance.rowItem = rowItem;
    modalRef.closed.subscribe(data => {
      if (data === '1' || data === '2') {
        this.getAllTableData();
      }
    })

  }

    handleSort(option: SortOption) {
      this.isLoading = true;
      this.tableData = [];
      this.page = 1;
      this.pageSize = 20;
      const command = {
        ...this.reportFilter,
        pageNumber: 1,
        pageSize: 20,
        OrderBy: `${option.column} ${option.sortOrder}`
      }
      this.reportFilter = command;
      this.getAllTableData();
    }

}
