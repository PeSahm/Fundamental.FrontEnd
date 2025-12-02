import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SymbolShareHoldersService } from 'src/app/services/symbol-share-holders.service';

@Component({
  selector: 'app-share-holders-modal',
  templateUrl: './share-holders-modal.component.html',
  styleUrls: ['./share-holders-modal.component.scss']
})
export class ShareHoldersModalComponent implements OnInit {

  @Input() rowItem: any;
  reviewStatus = "1";
  isApproved = true;
  selectedSymbol: any = null;
  constructor(
    public activeModal: NgbActiveModal,
    private symbolShareHolderService: SymbolShareHoldersService,
    private toastr: ToastrService,


  ) { }
  ngOnInit(): void {

  }

  selectStatusSide() {
    this.isApproved = parseInt(this.reviewStatus) === 1 ? true : false;
  }

  registerReviewStatus(isApproved: boolean) {
    if (isApproved) {
      this.symbolShareHolderService.approveShareHolders({
        id: this.rowItem?.id,
        shareHolderIsin: this.selectedSymbol.isin
      })
      .subscribe((res:any)=>{
        if (res?.success) {
          this.activeModal.close('1');
          this.toastr.success(`عملیات  تایید نماد ${this.rowItem?.symbolName} با موفقیت انجام شد.`)
        }
      })

    } else {
      this.symbolShareHolderService.rejectShareHolders(this.rowItem?.id)
        .subscribe((res: any) => {
          if (res.success) {
            this.activeModal.close('2');
            this.toastr.success(`عملیات عدم تایید نماد ${this.rowItem?.symbolName} با موفقیت انجام شد.`)
          }
        })
    }
  }

  selected(items: any) {
    this.selectedSymbol = items['item'];
  }
}
