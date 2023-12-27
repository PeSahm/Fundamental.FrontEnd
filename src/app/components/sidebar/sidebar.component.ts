import { Component, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  encapsulation: ViewEncapsulation.None // Use None, Emulated, or ShadowDom

})
export class SidebarComponent {
  isSearchBarOpen = true;
  toggleSearchFilter(el: ElementRef) {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }

}
