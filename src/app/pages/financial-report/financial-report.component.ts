
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { ScreenerService } from 'src/app/services/screener.service';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import toEnDigit from 'src/app/utils/toEnDigit';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class FinancialReportComponent implements OnInit {
  statementsForm: FormGroup | undefined;
  isStatementsFormSubmit = false;
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
    this.makeStatementForm();
  }

  makeStatementForm() {
    this.statementsForm = this.fb.group({
      isin: ['', Validators.required],
      traceNo: ['', Validators.required],
      uri: ['', Validators.required],
      fiscalYear: ['', Validators.required],
      yearEndMonth: ['', Validators.required],
      reportMonth: ['', Validators.required],
      operatingIncome: ['', Validators.required],
      grossProfit: ['', Validators.required],
      operatingProfit: ['', Validators.required],
      bankInterestIncome: ['', Validators.required],
      investmentIncome: ['', Validators.required],
      netProfit: ['', Validators.required],
      expense: ['', Validators.required],
      asset: ['', Validators.required],
      ownersEquity: ['', Validators.required],
      receivables: ['', Validators.required],
    })

  }
  get statementsFormSubmitted() {
    return this.statementsForm?.controls;
  }

  registerStatementForm() {
    if (this.statementsForm?.invalid) {
      this.isStatementsFormSubmit = true;
      return;
    }
    const command = {
      "isin": this.statementsForm?.value.isin.isin,
      "traceNo": parseInt(toEnDigit(this.statementsForm?.value.traceNo)),
      "uri": this.statementsForm?.value.uri,
      "fiscalYear": parseInt(toEnDigit(this.statementsForm?.value.fiscalYear)),
      "yearEndMonth": parseInt(toEnDigit(this.statementsForm?.value.yearEndMonth)),
      "reportMonth": parseInt(toEnDigit(this.statementsForm?.value.reportMonth)),
      "operatingIncome": parseInt(toEnDigit(this.statementsForm?.value.operatingIncome)),
      "grossProfit": parseInt(toEnDigit(this.statementsForm?.value.grossProfit)),
      "operatingProfit": parseInt(toEnDigit(this.statementsForm?.value.operatingProfit)),
      "bankInterestIncome": parseInt(toEnDigit(this.statementsForm?.value.bankInterestIncome)),
      "investmentIncome": parseInt(toEnDigit(this.statementsForm?.value.investmentIncome)),
      "netProfit": parseInt(toEnDigit(this.statementsForm?.value.netProfit)),
      "expense": parseInt(toEnDigit(this.statementsForm?.value.expense)),
      "asset": parseInt(toEnDigit(this.statementsForm?.value.asset)),
      "ownersEquity": parseInt(toEnDigit(this.statementsForm?.value.ownersEquity)),
      "receivables": parseInt(toEnDigit(this.statementsForm?.value.receivables)),
    }


    this.service.registerStatement(command)
      .subscribe((res: any) => {
        if (res.success) {
          this.statementsForm?.reset();
          this.toastr.success(`ثبت اطلاعات نماد ${this.statementsForm?.value.isin.name} با موفقیت انجام شد.`);
        } else {
          this.toastr.error(res.error.values.message)
        }
      })

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
  onSelect(event: NgbTypeaheadSelectItemEvent) {

  }

}
