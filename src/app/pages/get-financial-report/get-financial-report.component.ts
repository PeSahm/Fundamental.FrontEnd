import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ScreenerService } from 'src/app/services/screener.service';
@Component({
  selector: 'app-get-financial-report',
  templateUrl: './get-financial-report.component.html',
  styleUrls: ['./get-financial-report.component.scss']
})
export class GetFinancialReportComponent implements OnInit {
  selectedSymbol = '';
  searching = false;
  searchFailed = false;
  @ViewChild('input') searchInput!: ElementRef;
  selectedItems:any = [];
  statements = [];
  isLoading = true;
  constructor(
    private service: ScreenerService,

  ) {

  }
  ngOnInit(): void {
    this.getAllStatements()

  }

  getAllStatements() {
    this.service.getAllStatements()
      .subscribe((res: any) => {
        this.statements = res.data.items
      }, err => {

      }, () => {
        this.isLoading = false;
      })
  }

  selected(e:any) {
    e.preventDefault();
    console.log(e.item)
    this.selectedItems = [...this.selectedItems , this.selectedItems.push(e.item)];
    console.log( this.selectedItems)

    this.searchInput.nativeElement.value = '';
  }




}
