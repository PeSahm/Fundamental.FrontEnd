import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import toEnDigit from 'src/app/utils/toEnDigit';
import { ScreenerService } from 'src/app/services/screener.service';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs/operators';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
import { ManufacturingService } from 'src/app/services/manufacturing.service';
import { ToastrService } from 'ngx-toastr';
import { GetErrorService } from 'src/app/services/getError.service';

@Component({
  selector: 'app-manufacturing-balance-sheet',
  templateUrl: './manufacturing-balance-sheet.component.html',
  styleUrls: ['./manufacturing-balance-sheet.component.scss']
})
export class ManufacturingBalanceSheetComponent implements OnInit {
  balanceSheetForm: FormGroup | undefined;
  isBalanceSheetFormSubmit = false;
  selectedSymbol = {};
  searching = false;
  searchFailed = false;
  isLoading: boolean = false;
  balanceSheetList: any[] = [];
  constructor(private fb: FormBuilder,
    private service: ScreenerService,
    private manufacturingService: ManufacturingService,
    private toastr: ToastrService,
    private errorService: GetErrorService,

  ) { }
  ngOnInit(): void {
    this.balanceSheetForm = this.fb.group({
      selectedSymbol: [null, Validators.required],
      traceNo: ['', Validators.required],
      uri: ['', Validators.required],
      fiscalYear: ['', Validators.required],
      yearEndMonth: ['', Validators.required],
      reportMonth: ['', Validators.required],
      isAudited: [false],
      items: this.fb.array([]),
    });
    this.getAllBalanceSheetSort();
  }
  get balanceSheetFormSubmitted() {
    return this.balanceSheetForm?.controls;
  }
  get items() {
    return this.balanceSheetForm?.get('items') as FormArray;
  }
  addItem() {
    this.items.push(this.fb.group({
      balanceSheetSort: null,
      value: null,
    }));
  }
  removeItem(index: number) {
    this.items.removeAt(index);
  }
  submitForm() {

    // if (this.balanceSheetForm?.invalid) {
    //   this.isBalanceSheetFormSubmit = true;
    //   return;
    // }

    const isItemEmpty = this.balanceSheetForm?.value.items.find((item: any) => {
      return item.value === null || item.balanceSheetSort === null
    });
    if (isItemEmpty) {
      this.toastr.error('یکی از آیتم ها خالی است.');
      return;
    }
    if (this.balanceSheetForm?.value.items.length === 0
    ) {
      this.toastr.error('حتما باید یک ردیف اضافه کنید');
      return;
    }
    this.manufacturingService.addBalanceSheet(
      {
        "isin": this.balanceSheetForm?.value.selectedSymbol?.isin,
        "traceNo": parseInt(toEnDigit(this.balanceSheetForm?.value.traceNo)),
        "uri": this.balanceSheetForm?.value.uri,
        "fiscalYear": parseInt(toEnDigit(this.balanceSheetForm?.value.fiscalYear)),
        "yearEndMonth": parseInt(toEnDigit(this.balanceSheetForm?.value.yearEndMonth)),
        "reportMonth": parseInt(toEnDigit(this.balanceSheetForm?.value.reportMonth)),
        "isAudited": this.balanceSheetForm?.value.isAudited,
        "items": this.balanceSheetForm?.value.items.map((item: any) => {
          return {
            codalCategory: Number(item.balanceSheetSort.category) ?? 0,
            codalRow: Number(item.balanceSheetSort.codalRow) ?? 0,
            value: Number(item.value) ?? 0,
          }
        })
      }
    )
      .subscribe({
        next: (res: any) => {
          this.toastr.success(`ثبت اطلاعات نماد ${this.balanceSheetForm?.value.selectedSymbol.name} با موفقیت انجام شد.`);
          this.balanceSheetForm?.reset();
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
  }

  getAllBalanceSheetSort() {
    this.manufacturingService.getBalanceSheetSort()
      .subscribe((res: any) => {
        this.balanceSheetList = res;
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

  selectSymbol(e: any) {
    this.balanceSheetForm?.patchValue({ selectedSymbol: { isin: e.item.isin, name: e.item.name } });
    // this.selectedSymbol = { isin: e.item.isin, name: e.item.name }
  }


}
