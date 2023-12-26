import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ScreenerService } from 'src/app/services/screener.service';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
import toEnDigit from 'src/app/utils/toEnDigit';
import { GetErrorService } from 'src/app/services/getError.service';
import { Router } from '@angular/router';
import { MonthlyActivityService } from 'src/app/services/monthly-activity.service';
@Component({
  selector: 'app-sales-report',
  templateUrl: './sales-report.component.html',
  styleUrls: ['./sales-report.component.scss']
})
export class SalesReportComponent implements OnInit {
  salesForm: FormGroup | undefined;
  isSalesFormSubmit = false;
  searching = false;
  searchFailed = false;
  reportId;
  isLoading: boolean = false;
  selectedSymbol = {};
  constructor(
    private service: ScreenerService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private errorService: GetErrorService,
    private router: Router,
    private monthlyActivityService: MonthlyActivityService
  ) {
    this.reportId = this.router.getCurrentNavigation()?.extras.state;
  }
  ngOnInit(): void {
    this.makeSalesForm();
    if (this.reportId) {
      this.getMonthlyActivityById();
    }
  }

  makeSalesForm() {
    this.salesForm = this.fb.group({
      selectedSymbol: [{}, Validators.required],
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



  getMonthlyActivityById() {
    this.isLoading = true;
    this.monthlyActivityService.getMonthlyActivityById(this.reportId)
      .subscribe({
        next: (res: any) => {
          this.setSalesFromValue(res.data)
        },
        error: (err) => {

        },
        complete: () => {
          this.isLoading = false;
        }
      })
  }

  setSalesFromValue(res: any) {
    this.salesForm?.patchValue({
      selectedSymbol: { name: res.symbol, isin: res.isin },
      traceNo: res.traceNo,
      uri: res.uri,
      fiscalYear: res.fiscalYear,
      yearEndMonth: res.yearEndMonth,
      reportMonth: res.reportMonth,
      saleBeforeCurrentMonth: res.saleBeforeCurrentMonth,
      saleCurrentMonth: res.saleCurrentMonth,
      saleIncludeCurrentMonth: res.saleIncludeCurrentMonth,
      saleLastYear: res.saleLastYear,
      hasSubCompanySale: res.hasSubCompanySale,
    })
  }

  registerSales() {
    if (this.salesForm?.invalid) {
      this.isSalesFormSubmit = true;
      return;
    }
    const command = {
      "id": this.reportId ? this.reportId['id'] : null,
      "isin": this.salesForm?.value.selectedSymbol.isin,
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
    if (!this.reportId) {
      this.service.registerMonthlyActivity(command)
        .subscribe({
          next: (res: any) => {
            this.toastr.success(`ثبت اطلاعات نماد ${this.salesForm?.value.selectedSymbol.name} با موفقیت انجام شد.`);
            this.salesForm?.reset();
          },
          error: (err => {
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
          })
        })
    } else {
      this.monthlyActivityService.editMonthlyActivityForm(command)
        .subscribe({
          next: (res) => {
            this.toastr.success(`ویرایش اطلاعات نماد ${this.salesForm?.value.selectedSymbol.name} با موفقیت انجام شد.`);
            this.router.navigate(['/get-sales-report']);
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
          }
        })
    }
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

  selectSymbol(e: any) {
    this.salesForm?.setValue({ isin: e.item.isin });
    this.selectedSymbol = { isin: e.item.isin, name: e.item.name }
  }
}
