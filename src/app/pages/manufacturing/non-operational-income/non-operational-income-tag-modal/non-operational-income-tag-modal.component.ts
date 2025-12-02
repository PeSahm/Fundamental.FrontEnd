import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ManufacturingService } from 'src/app/services/manufacturing.service';

@Component({
  selector: 'app-non-operational-income-tag-modal',
  templateUrl: './non-operational-income-tag-modal.component.html',
  styleUrls: ['./non-operational-income-tag-modal.component.scss']
})
export class NonOperationalIncomeTagModalComponent implements OnInit {
  @Input() rowItem: any;
  tag = '';
  constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private manufacturingService : ManufacturingService
  ) {

  }
  ngOnInit(): void {

  }

  insertTag() {
    if(!this.tag || this.tag === ''){
      this.toastr.warning('لطفا تگ مورد نظر خود را انتخاب کنید!');
      return;
    }

    const command =  {
      id:this.rowItem?.id,
      tags:[Number(this.tag)]
    }
    this.manufacturingService.addTagInNonOperationalIncome(command)
    .subscribe((res:any)=>{
      if(res.success){
        this.toastr.success(`افزودن تگ به نماد ${this.rowItem?.symbol} با موفقیت انجام گردید.`);
        this.activeModal.close();
      }
    })

    
  }

}
