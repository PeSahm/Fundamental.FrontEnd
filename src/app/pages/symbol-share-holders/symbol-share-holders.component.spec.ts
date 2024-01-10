import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolShareHoldersComponent } from './symbol-share-holders.component';

describe('SymbolShareHoldersComponent', () => {
  let component: SymbolShareHoldersComponent;
  let fixture: ComponentFixture<SymbolShareHoldersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SymbolShareHoldersComponent]
    });
    fixture = TestBed.createComponent(SymbolShareHoldersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
