import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScreenerService } from 'src/app/services/screener.service';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

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
    pageSize: 10,
    pageNumber: 1
  };
  isSearchBarOpen = true;
  page = 1;
  totalRecords: number = 0;
  pageSize = 10;

  @ViewChild('input') searchInput!: ElementRef;
  selectedItems: any = [];
  statements = [];
  isLoading = true;
  constructor(
    private service: ScreenerService,

  ) {

  }
  ngOnInit(): void {
    this.getAllStatements()

  }

  getAllStatements() {
    this.service.getAllStatements(this.reportFilter)
      .subscribe((res: any) => {
        this.statements = res.data.items
        this.totalRecords = res.data.meta.total
      }, err => {

      }, () => {
        this.isLoading = false;
      })
  }

  selected(e: any) {
    e.preventDefault();
    let selectedSymbol = e['item']
    this.selectedItems.push(selectedSymbol);
    this.searchInput.nativeElement.value = '';
  }
  close(item: any) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.searchInput.nativeElement.focus();
  }

  searchTable() {
    this.isLoading = true;
    this.statements = [];
    this.page = 1;
    const command = {
      ...this.reportFilter,
      year: this.fiscalYear,
      reportMonth: this.reportMonth,
      IsinList: this.selectedItems.map((item: any) => item?.isin),
      pageNumber: 1,
      pageSize: 10,

    }
    this.reportFilter = command;
    this.service.getAllStatements(this.reportFilter)
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

  toggleSearchFilter(el: ElementRef) {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }

  changePage(e: any) {
    this.isLoading = true;
    this.statements = [];
    this.page = e;
    this.reportFilter = {
      ...this.reportFilter,
      pageNumber: this.page
    }
    this.getAllStatements();
  }

  changeSize(e: any) {
    this.isLoading = true;
    this.statements = [];
    this.pageSize = Number(e.target.value);
    this.page = 1;
    this.reportFilter = {
      ...this.reportFilter,
      pageSize: this.pageSize,
      pageNumber: 1,
    }
    this.getAllStatements();
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this.service.searchSymbol(term)
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => of<SearchSymbol>({ success: false, data: [], error: null }))
          )
      ),
      switchMap(result => of(result)),
      tap(() => (this.searching = false)),
    );
  resultFormatter = (result: SymbolDetail) => result.name + ' - ' + result.title;
  inputFormatter = (result: SymbolDetail) => result.name;




}
