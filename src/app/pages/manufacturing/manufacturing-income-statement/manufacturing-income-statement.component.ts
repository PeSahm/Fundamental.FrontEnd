import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GetErrorService } from 'src/app/services/getError.service';
import { ManufacturingService } from 'src/app/services/manufacturing.service';
import { ScreenerService } from 'src/app/services/screener.service';
import toEnDigit from 'src/app/utils/toEnDigit';

@Component({
  selector: 'app-manufacturing-income-statement',
  templateUrl: './manufacturing-income-statement.component.html',
  styleUrls: ['./manufacturing-income-statement.component.scss']
})
export class ManufacturingIncomeStatementComponent implements OnInit {
  incomeStatementForm: FormGroup | undefined;
  isIncomeStatementFormSubmit = false;
  selectedSymbol = {};
  searching = false;
  searchFailed = false;
  isLoading: boolean = false;
  incomeStatementList: any[] = [];
  constructor(private fb: FormBuilder,
    private service: ScreenerService,
    private manufacturingService: ManufacturingService,
    private toastr: ToastrService,
    private errorService: GetErrorService,

  ) { }
  ngOnInit(): void {
    this.incomeStatementForm = this.fb.group({
      selectedSymbol: [null, Validators.required],
      traceNo: ['', Validators.required],
      uri: ['', Validators.required],
      fiscalYear: ['', Validators.required],
      yearEndMonth: ['', Validators.required],
      reportMonth: ['', Validators.required],
      isAudited: [false],
      items: this.fb.array([]),
    });
    this.getAllIncomeStatementSort();
  }
  get IncomeStatementFormSubmitted() {
    return this.incomeStatementForm?.controls as { [key: string]: any };
  }
  get items() {
    return this.incomeStatementForm?.get('items') as FormArray;
  }
  addItem() {
    this.items.push(this.fb.group({
      incomeStatementSort: null,
      value: null,
    }));
  }
  removeItem(index: number) {
    this.items.removeAt(index);
  }
  submitForm() {

    
    // if (this.incomeStatementForm?.invalid) {
    //   this.isIncomeStatementFormSubmit = true;
    //   return;
    // }

    const isItemEmpty = this.incomeStatementForm?.value.items.find((item: any) => {
      return item.value === null || item.incomeStatementSort === null
    });
    if (isItemEmpty) {
      this.toastr.error('یکی از آیتم ها خالی است.');
      return;
    }
    if (this.incomeStatementForm?.value.items.length === 0
    ) {
      this.toastr.error('حتما باید یک ردیف اضافه کنید');
      return;
    }
    this.manufacturingService.addIncomeStatement(
      {
        "isin": this.incomeStatementForm?.value.selectedSymbol?.isin,
        "traceNo": parseInt(toEnDigit(this.incomeStatementForm?.value.traceNo)),
        "uri": this.incomeStatementForm?.value.uri,
        "fiscalYear": parseInt(toEnDigit(this.incomeStatementForm?.value.fiscalYear)),
        "yearEndMonth": parseInt(toEnDigit(this.incomeStatementForm?.value.yearEndMonth)),
        "reportMonth": parseInt(toEnDigit(this.incomeStatementForm?.value.reportMonth)),
        "isAudited": this.incomeStatementForm?.value.isAudited,
        "items": this.incomeStatementForm?.value.items.map((item: any) => {
          return {
            codalCategory: Number(item.incomeStatementSort.category) ?? 0,
            codalRow: Number(item.incomeStatementSort.codalRow) ?? 0,
            value: Number(item.value) ?? 0,
          }
        })
      }
    )
      .subscribe({
        next: (res: any) => {
          this.toastr.success(`ثبت اطلاعات نماد ${this.incomeStatementForm?.value.selectedSymbol.name} با موفقیت انجام شد.`);
          this.incomeStatementForm?.reset();
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

  getAllIncomeStatementSort() {
    this.manufacturingService.getIncomeStatementSort()
      .subscribe((res: any) => {
        this.incomeStatementList = res;
      })
  }


  selectSymbol(e: any) {
    this.incomeStatementForm?.patchValue({ selectedSymbol: { isin: e.item.isin, name: e.item.name } });
  }

}
