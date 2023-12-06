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
  @Output() clickOnRow = new EventEmitter();


  ngOnInit(): void {

  }

  clickOnTd(item: any) {
    this.clickOnRow.emit(item)
  }



}
