import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetManufacturingBalanceSheetComponent } from './get-manufacturing-balance-sheet.component';

describe('GetManufacturingBalanceSheetComponent', () => {
  let component: GetManufacturingBalanceSheetComponent;
  let fixture: ComponentFixture<GetManufacturingBalanceSheetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetManufacturingBalanceSheetComponent]
    });
    fixture = TestBed.createComponent(GetManufacturingBalanceSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
