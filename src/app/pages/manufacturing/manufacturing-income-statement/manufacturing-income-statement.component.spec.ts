import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturingIncomeStatementComponent } from './manufacturing-income-statement.component';

describe('ManufacturingIncomeStatementComponent', () => {
  let component: ManufacturingIncomeStatementComponent;
  let fixture: ComponentFixture<ManufacturingIncomeStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManufacturingIncomeStatementComponent]
    });
    fixture = TestBed.createComponent(ManufacturingIncomeStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
