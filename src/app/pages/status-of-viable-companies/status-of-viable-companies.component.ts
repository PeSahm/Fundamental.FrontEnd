import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { SymbolShareHoldersService } from 'src/app/services/symbol-share-holders.service';

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
    reviewStatus: 1
  };
  page = 1;
  totalRecords: number = 0;
  pageSize = 20;
  tableData = [];
  KeyName: any[] = [];
  columnName: any[] = [];
  isLoading = true;
  constructor(
    private symbolShareHoldersService: SymbolShareHoldersService,
    // private modalService: NgbModal
  ) {

  }
  ngOnInit(): void {
    this.getAllTableData();
    this.makeTableConst();
  }
  getAllTableData() {
    this.symbolShareHoldersService.getAllStatusOfViablecompanies(this.reportFilter)
      .pipe(finalize(()=>this.isLoading = false))
      .subscribe({
        next: (res: any) => {
          this.tableData = res.data.items;
          this.totalRecords = res.data.meta.total;
        }
      });
  }
  makeTableConst() {
    this.columnName = [
      // { name: '', title: 'عملیات', hasSort: false },
      { name: 'patentSymbol', title: ' نماد سرمایه گذار', hasSort: false },
      { name: 'subsidiarySymbolName', title: 'نماد سرمایه پذیر', hasSort: false },
      { name: 'ownershipPercentage', title: 'درصد مالکیت', hasSort: false },
      { name: 'costPrice', title: 'بهای تمام شده', hasSort: false },
    ];
    this.KeyName =
      [
        // {
        //   name: 'عملیات', onClick: true, uniqueKey: 'id', iconClass: 'fa fa-tasks text-primary'
        //   , title: 'وضعبت بررسی', hasModal: true
        // },
        { name: 'patentSymbol' },
        { name: 'subsidiarySymbolName' },
        { name: 'ownershipPercentage', pipe: 'number' },
        { name: 'costPrice' },
      ]


  }

  selected(items: any) {
    this.selectedSymbol = items['item'];

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
      reviewStatus: parseInt(this.reviewStatus)?? null,
      pageNumber: 1,
      pageSize: 20,

    }
    this.reportFilter = command;
    this.symbolShareHoldersService.getAllSymbolShareHolders(command)
    .pipe(finalize(()=>this.isLoading = false))
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

}
