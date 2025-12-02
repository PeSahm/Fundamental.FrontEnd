import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, tap, switchMap, catchError, of } from 'rxjs';
import { SearchSymbol, SymbolDetail } from 'src/app/models/models';
import { ScreenerService } from 'src/app/services/screener.service';
import { ControlValueAccessor, FormControl, FormControlName, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-symbol-search',
  templateUrl: './symbol-search.component.html',
  styleUrls: ['./symbol-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SymbolSearchComponent,
    },
  ],
})

export class SymbolSearchComponent implements OnInit, ControlValueAccessor {
  searching = false;
  searchFailed = false;
  @Output() selectSearchSymbol = new EventEmitter();
  @Input() hasFormControl: boolean = false;
  @Input() isMulti: boolean = false;
  @ViewChild('input') searchInput!: ElementRef;
  selectedItems: any = [];

  fc = new FormControl();
  onChange = (item: string) => { };

  constructor(
    private screenerService: ScreenerService
  ) {
    this.fc.valueChanges.subscribe((v:any) => {
      this.onChange(v);
      if(v?.length === 0) {
        this.selectSearchSymbol.emit(null)
      }
    });
  }


  ngOnInit(): void {
  }

  writeValue(newVal: string): void {
    this.fc.patchValue(newVal);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }

  selectSymbol(e: any) {
    if (this.isMulti) {
      e.preventDefault();
      let selectedSymbol = e['item']
      this.selectedItems.push(selectedSymbol);
      this.searchInput.nativeElement.value = '';
    }
    this.selectSearchSymbol.emit(this.isMulti ? this.selectedItems : e);
  }
  close(item: any) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.searchInput.nativeElement.focus();
  }



  search = (text$: Observable<string>): Observable<readonly any[]> =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this.screenerService.searchSymbol(term)
          .pipe(
            tap(() => (this.searchFailed = false)),
            catchError(() => of<SearchSymbol>({ success: false, data: [], error: null }))
          )
      ),
      switchMap(result => of((result as SearchSymbol).data || [])),
      tap(() => (this.searching = false)),
    );
  resultFormatter = (result: SymbolDetail): string => result.name + ' - ' + result.title;
  inputFormatter = (result: SymbolDetail): string => result.name || '';
}
