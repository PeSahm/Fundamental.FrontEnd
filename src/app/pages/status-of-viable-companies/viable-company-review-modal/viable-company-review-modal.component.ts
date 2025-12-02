import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { StatusOfViableCompanyService } from 'src/app/services/status-of-viable-company.service';

@Component({
  selector: 'app-viable-company-review-modal',
  templateUrl: './viable-company-review-modal.component.html',
  styleUrls: ['./viable-company-review-modal.component.scss']
})
export class ViableCompanyReviewModalComponent implements OnInit {

  @Input() rowItem: any;
  reviewStatus = "";
  isApproved = true;
  selectedSymbol: any = null;
  percentage = '';
  constructor(
    public activeModal: NgbActiveModal,
    private statusOfViableCompanyService: StatusOfViableCompanyService,
    private toastr: ToastrService,


  ) { }
  ngOnInit(): void {

  }

  selectStatusSide() {
    this.isApproved = parseInt(this.reviewStatus) === 1 ? true : false;
  }

  registerReviewStatus(isApproved: boolean) {
    if (isApproved) {
      if (this.selectedSymbol?.isin && this.reviewStatus) {
        this.statusOfViableCompanyService.approved({
          id: this.rowItem?.id,
          subsidiaryIsin: this.selectedSymbol?.isin,
          percentage: Number(this.percentage)
        })
        .subscribe((res:any)=>{
          if (res?.success) {
            this.activeModal.close('1');
            this.toastr.success(`عملیات  تایید نماد ${this.rowItem?.parentSymbolName} با موفقیت انجام شد.`)
          }
        })
      } else {
        this.toastr.warning(`انتخاب نماد الزامی است.`)
      }
      if(this.reviewStatus === '' || !this.reviewStatus){
        this.toastr.warning(`انتخاب نوع وضعیت الزامی است.`)
      }

    } else {
      this.statusOfViableCompanyService.reject(this.rowItem?.id)
        .subscribe((res: any) => {
          if (res.success) {
            this.activeModal.close('2');
            this.toastr.success(`عملیات عدم تایید نماد ${this.rowItem?.parentSymbolName} با موفقیت انجام شد.`)
          }
        })
    }
  }

  selected(items: any) {
    this.selectedSymbol = items['item'];
  }

  validateInput(event: KeyboardEvent): void {
    const charCode = event.key;
    if (!charCode.match(/[0-9.]/) || (charCode === '.' && this.percentage?.includes('.'))) {
      event.preventDefault();
    }
  }


}
