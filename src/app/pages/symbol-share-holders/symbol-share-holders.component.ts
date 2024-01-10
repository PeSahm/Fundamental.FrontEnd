import { Component, OnInit } from '@angular/core';
import { SymbolShareHoldersService } from 'src/app/services/symbol-share-holders.service';

@Component({
  selector: 'app-symbol-share-holders',
  templateUrl: './symbol-share-holders.component.html',
  styleUrls: ['./symbol-share-holders.component.scss']
})



export class SymbolShareHoldersComponent implements OnInit {
  selectedSymbol;
  reviewStatus;
  source;
  reportFilter = {
    pageSize: 20,
    pageNumber: 1
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
    private symbolShareHoldersService : SymbolShareHoldersService
  ){

  }
  ngOnInit(): void {
    this.getAllSymbolShareHolders();
    this.makeTableConst();
  }
  getAllSymbolShareHolders(){
    this.symbolShareHoldersService.getAllSymbolShareHolders(this.reportFilter)
    .subscribe({
      next: (res: any) => {
        console.log("res : " , res);
        
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
  makeTableConst(){
    this.columnName = [
      { name: 'symbolName', title: 'نماد', hasSort: false },
      { name: 'shareHolderName', title: 'سهامدار', hasSort: false },
      { name: 'sharePercentage', title: 'درصد سهامداری', hasSort: false },
      { name: 'shareHolderSourceName', title: 'منبع', hasSort: false },
      { name: 'reviewStatusName', title: 'وضعیت بررسی', hasSort: false },
    ];
    this.KeyName =
      [
        { name: 'symbolName' },
        { name: 'shareHolderName' },
        { name: 'sharePercentage'  , pipe: 'number'},
        { name: 'shareHolderSourceName' },
        { name: 'reviewStatusName' },
      ]


  }

  selected(items: any) {
    console.log("sdkcnsdc : ", items)
    this.selectedSymbol = items['item'];
    console.log("this.selectedSymbol : ", this.selectedSymbol)

  }

  searchTable() {

    this.isLoading = true;
    this.symbolShareHoldersItems = [];
    this.page = 1;
    this.pageSize = 20;
    const command = {
      ...this.reportFilter,
      isin: this.selectedSymbol?.isin,
      source: parseInt(this.source),
      reviewStatus: parseInt(this.reviewStatus),
      pageNumber: 1,
      pageSize: 20,

    }
    this.reportFilter = command;
    this.symbolShareHoldersService.getAllSymbolShareHolders(command)
    .subscribe({
      next: (res: any) => {
        // this.symbolShareHoldersItems = res.items;
        // this.totalRecords = res.meta.total;
        console.log("res : " , res);
        
      },
      complete: () => {
        this.isLoading = false;

      }
    })



  }

}
