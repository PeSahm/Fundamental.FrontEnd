import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() data: any[] = [];
  @Input() children: any[] = [];
  @Input() KeyName: any[] = [];
  @Input() KeyNameChild: any[] = [];
  @Input() columnName: string[] = [];
  @Input() columnNameChild: string[] = [];
  @Input() isLoading: boolean = false;
  @Input() isLoadingChild: boolean = false;
  @Input() totalRecords = 0;
  @Input() pageSize = 0;
  @Input() page = 0;
  @Input() isExpandable = false;
  @Output() clickOnRow = new EventEmitter();
  @Output() changePageEvent = new EventEmitter();
  @Output() changeSizeEvent = new EventEmitter();
  @Output() expandRowEvent = new EventEmitter();
  expandedRowId: number = 0;
  expandedRows: { [key: string]: boolean } = {};


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

  ExpandCollapse(item: any, id: any) {
    this.expandedRows[id] = !this.expandedRows[id];
    this.expandRowEvent.emit({rowData : item , expand : this.expandedRows[id]})
  }
}
