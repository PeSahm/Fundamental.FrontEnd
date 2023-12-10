import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() KeyName: any[] = [];
  @Input() columnName: string[] = [];
  @Input() isLoading: boolean = false;
  @Input() totalRecords = 0;
  @Input() pageSize = 0;
  @Input() page = 0;

  @Output() clickOnRow = new EventEmitter();
  @Output() changePageEvent = new EventEmitter();
  @Output() changeSizeEvent = new EventEmitter();




  ngOnInit(): void {
  }

  clickOnTd(item: any) {
    this.clickOnRow.emit(item);
  }
  changePage(item: any) {
    this.changePageEvent.emit(item);
  }
  changeSize(item: any) {
    this.changeSizeEvent.emit(item);
  }



}
