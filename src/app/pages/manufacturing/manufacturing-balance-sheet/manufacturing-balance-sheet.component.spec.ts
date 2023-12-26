import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingBalanceSheetComponent } from './manufacturing-balance-sheet.component';

describe('ManufacturingBalanceSheetComponent', () => {
  let component: ManufacturingBalanceSheetComponent;
  let fixture: ComponentFixture<ManufacturingBalanceSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManufacturingBalanceSheetComponent]
    });
    fixture = TestBed.createComponent(ManufacturingBalanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
