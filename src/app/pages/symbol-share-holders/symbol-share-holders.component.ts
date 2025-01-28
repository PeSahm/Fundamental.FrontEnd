import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SymbolShareHoldersService } from 'src/app/services/symbol-share-holders.service';
import { ShareHoldersModalComponent } from './share-holders-modal/share-holders-modal.component';

@Component({
  selector: 'app-symbol-share-holders',
  templateUrl: './symbol-share-holders.component.html',
  styleUrls: ['./symbol-share-holders.component.scss']
})



export class SymbolShareHoldersComponent implements OnInit {
  selectedSymbol;
  reviewStatus = "1";
  // source;
  reportFilter = {
    pageSize: 20,
    pageNumber: 1,
    reviewStatus : 1
  };
  page = 1;
  totalRecords: number = 0;
  pageSize = 20;
  symbolShareHoldersItems;
  KeyName: any[] = [];
  KeyNameChild: any[] = [];
  columnName: any[] = [];
  isLoading = true;
  isLoadingChild = false;
  constructor(
    private symbolShareHoldersService: SymbolShareHoldersService,
    private modalService: NgbModal
  ) {

  }
  ngOnInit(): void {
    this.getAllSymbolShareHolders();
    this.makeTableConst();
  }
  getAllSymbolShareHolders() {
    this.symbolShareHoldersService.getAllSymbolShareHolders(this.reportFilter)
      .subscribe({
        next: (res: any) => {
          this.symbolShareHoldersItems = res.data.items;
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
  makeTableConst() {
    this.columnName = [
      { name: '', title: 'عملیات', hasSort: false },
      { name: 'symbolName', title: 'نماد', hasSort: false },
      { name: 'shareHolderName', title: 'سهامدار', hasSort: false },
      { name: 'sharePercentage', title: 'درصد سهامداری', hasSort: false },
      // { name: 'shareHolderSourceName', title: 'منبع', hasSort: false },
      { name: 'reviewStatusName', title: 'وضعیت بررسی', hasSort: false },
    ];
    this.KeyName =
      [
        {
          name: 'عملیات', onClick: true, uniqueKey: 'id', iconClass: 'fa fa-tasks text-primary'
          , title: 'وضعبت بررسی', hasModal: true
        },
        { name: 'symbolName' },
        { name: 'shareHolderName' },
        { name: 'sharePercentage', pipe: 'number' },
        // { name: 'shareHolderSourceName' },
        { name: 'reviewStatusName' },
      ]


  }

  selected(items: any) {
    this.selectedSymbol = items['item'];

  }
  

  searchTable() {

    this.isLoading = true;
    this.symbolShareHoldersItems = [];
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
      .subscribe({
        next: (res: any) => {
          this.symbolShareHoldersItems = res.data.items;
          this.totalRecords = res.data.meta.total;

        },
        complete: () => {
          this.isLoading = false;

        }
      })



  }

  changePage(e: any) {
    this.isLoading = true;
    this.symbolShareHoldersItems = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllSymbolShareHolders();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.symbolShareHoldersItems = [];
    this.pageSize = Number(e.target.value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllSymbolShareHolders();
  }

  openStatusModal(rowItem) {
    const modalRef = this.modalService.open(ShareHoldersModalComponent, { size: 'lg' });
    modalRef.componentInstance.rowItem = rowItem;
    modalRef.closed.subscribe(data => {
      if (data === '1' || data === '2') {
        this.getAllSymbolShareHolders();
      }
    })

  }


}
