import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-share-holders-modal',
  templateUrl: './share-holders-modal.component.html',
  styleUrls: ['./share-holders-modal.component.scss']
})
export class ShareHoldersModalComponent implements OnInit {

  @Input() id;
  reviewStatus = "1";
  isApproved = true;
  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {

  }

  selectStatusSide() {
    this.isApproved = parseInt(this.reviewStatus) === 1 ? true : false;
  }

  registerReviewStatus(isApproved){
    if(isApproved){

    }else{
      
    }
  }
}
