import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  isSearchBarOpen = true;
  toggleSearchFilter(el: ElementRef) {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }


}
