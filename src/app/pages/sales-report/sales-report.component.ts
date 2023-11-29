import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScreenerService } from 'src/app/services/screener.service';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
import toEnDigit from 'src/app/utils/toEnDigit';
@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  salesForm: FormGroup | undefined;
  isSalesFormSubmit = false;
  selectedSymbol = '';
  searching = false;
  searchFailed = false;
  constructor(
    private service: ScreenerService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
  }
  ngOnInit(): void {
    this.makeSalesForm();
  }

  makeSalesForm() {
    this.salesForm = this.fb.group({
      isin: ['', Validators.required],
      traceNo: ['', Validators.required],
      uri: ['', Validators.required],
      fiscalYear: ['', Validators.required],
      yearEndMonth: ['', Validators.required],
      reportMonth: ['', Validators.required],
      saleBeforeCurrentMonth: ['', Validators.required],
      saleCurrentMonth: ['', Validators.required],
      saleIncludeCurrentMonth: ['', Validators.required],
      saleLastYear: ['', Validators.required],
      hasSubCompanySale: [false, Validators.required],

    })
  }

  get salesFormSubmitted() {
    return this.salesForm?.controls;
  }


  registerSales() {
    if (this.salesForm?.invalid) {
      this.isSalesFormSubmit = true;
      return;
    }
    const command = {
      "isin": this.salesForm?.value.isin.isin,
      "traceNo": parseInt(toEnDigit(this.salesForm?.value.traceNo)),
      "uri": this.salesForm?.value.uri,
      "fiscalYear": parseInt(toEnDigit(this.salesForm?.value.fiscalYear)),
      "yearEndMonth": parseInt(toEnDigit(this.salesForm?.value.yearEndMonth)),
      "reportMonth": parseInt(toEnDigit(this.salesForm?.value.reportMonth)),
      "saleBeforeCurrentMonth": parseInt(toEnDigit(this.salesForm?.value.saleBeforeCurrentMonth)),
      "saleCurrentMonth": parseInt(toEnDigit(this.salesForm?.value.saleCurrentMonth)),
      "saleIncludeCurrentMonth": parseInt(toEnDigit(this.salesForm?.value.saleIncludeCurrentMonth)),
      "saleLastYear": parseInt(toEnDigit(this.salesForm?.value.saleLastYear)),
      "hasSubCompanySale": this.salesForm?.value.hasSubCompanySale,
    }
    this.service.registerMonthlyActivity(command)
    .subscribe((res: any) => {
      if (res.success) {
          this.toastr.success(`ثبت اطلاعات نماد ${this.salesForm?.value.isin.name} با موفقیت انجام شد.`);
          this.salesForm?.reset();
        } else {
          this.toastr.error(res.error.values.message)
        }
      })



  }




  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(600),
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
