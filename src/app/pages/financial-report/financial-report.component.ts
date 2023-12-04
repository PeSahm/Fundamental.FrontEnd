
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { ScreenerService } from 'src/app/services/screener.service';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import toEnDigit from 'src/app/utils/toEnDigit';
import { ToastrService } from 'ngx-toastr';
import { GetErrorService } from 'src/app/services/getError.service';
import { Router } from '@angular/router';
import { StatementService } from 'src/app/services/statement.service';
@Component({
  selector: 'app-financial-report',
  templateUrl: './financial-report.component.html',
  styleUrls: ['./financial-report.component.scss']
})
export class FinancialReportComponent implements OnInit {
  statementsForm: FormGroup | undefined;
  isStatementsFormSubmit = false;
  selectedSymbol = {};
  searching = false;
  searchFailed = false;
  reportId;
  constructor(
    private service: ScreenerService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private errorService: GetErrorService,
    private router: Router,
    private statementService: StatementService

  ) {
    this.reportId = this.router.getCurrentNavigation()?.extras.state;
  }
  ngOnInit(): void {
    this.makeStatementForm();
    if (this.reportId) {
      this.getStatementValueById();
    }
  }


  makeStatementForm() {
    this.statementsForm = this.fb.group({
      selectedSymbol: ['', Validators.required],
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
      "id": this.reportId ? this.reportId['id'] : null,
      "isin": this.statementsForm?.value.selectedSymbol.isin,
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
    console.log("command : " , this.statementsForm?.value);
    console.log("command : " , command);

    
    if (!this.reportId) {
      this.service.registerStatement(command)
        .subscribe({
          next: (res) => {
            this.toastr.success(`ثبت اطلاعات نماد ${this.statementsForm?.value.isin.name} با موفقیت انجام شد.`);
            this.statementsForm?.reset();
          },
          error: (err) => {
            const errorCode = String(err?.error?.error?.code);
            this.errorService.getError()
              .subscribe((res) => {
                if (errorCode.includes('_800')) {
                  this.toastr.error(err?.error?.error?.values?.message);
                } else {
                  const errMessage = res[errorCode]
                  this.toastr.error(errMessage);
                }
              })
          },
          complete: () => {
          }
        })
    } else {
      this.statementService.editStatementForm(command)
        .subscribe({
          next: (res) => {
            this.toastr.success(`ویرایش اطلاعات نماد ${this.statementsForm?.value.selectedSymbol.name} با موفقیت انجام شد.`);
            this.statementsForm?.reset();
          },
          error: (err) => {
            const errorCode = String(err?.error?.error?.code);
            this.errorService.getError()
              .subscribe((res) => {
                if (errorCode.includes('_800')) {
                  this.toastr.error(err?.error?.error?.values?.message);
                } else {
                  const errMessage = res[errorCode]
                  this.toastr.error(errMessage);
                }
              })
          },
          complete: () => {
          }
        })
    }
  }

  getStatementValueById() {
    this.statementService.getStatementById(this.reportId)
      .subscribe({
        next: (res: any) => {
          this.setStatementFromValue(res.data)
        },
        error: (err) => {

        },
        complete: () => {

        }
      })
  }

  setStatementFromValue(res: any) {
    this.statementsForm?.patchValue({
      selectedSymbol: { name: res.symbol , isin:res.isin },
      traceNo: res.traceNo,
      uri: res.uri,
      fiscalYear: res.fiscalYear,
      yearEndMonth: res.yearEndMonth,
      reportMonth: res.reportMonth,
      operatingIncome: res.operatingIncome,
      grossProfit: res.grossProfit,
      operatingProfit: res.operatingProfit,
      bankInterestIncome: res.bankInterestIncome,
      investmentIncome: res.investmentIncome,
      netProfit: res.netProfit,
      expense: res.expense,
      asset: res.asset,
      ownersEquity: res.ownersEquity,
      receivables: res.receivables,
    })
  }

  selectSymbol(e: any) {
    this.statementsForm?.setValue({ isin: e.item.isin });
    this.selectedSymbol = { isin: e.item.isin, name: e.item.name }
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
