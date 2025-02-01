import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { StatusOfViableCompanyService } from 'src/app/services/status-of-viable-company.service';
import { SymbolShareHoldersService } from 'src/app/services/symbol-share-holders.service';

@Component({
  selector: 'app-share-holders-modal',
  templateUrl: './share-holders-modal.component.html',
  styleUrls: ['./share-holders-modal.component.scss']
})
export class ShareHoldersModalComponent implements OnInit {

  @Input() rowItem;
  reviewStatus = "1";
  isApproved = true;
  selectedSymbol;
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

  registerReviewStatus(isApproved) {
    if (isApproved) {
      this.statusOfViableCompanyService.approved({
        id: this.rowItem?.id,
        subsidiaryIsin: this.rowItem?.subsidiarySymbolIsin
      })
      .subscribe((res:any)=>{
        if (res?.success) {
          this.activeModal.close('1');
          this.toastr.success(`عملیات  تایید نماد ${this.rowItem?.parentSymbolName} با موفقیت انجام شد.`)
        }
      })

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
}
