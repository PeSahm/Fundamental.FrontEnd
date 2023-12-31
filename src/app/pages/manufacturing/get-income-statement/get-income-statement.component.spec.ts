import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetIncomeStatementComponent } from './get-income-statement.component';

describe('GetIncomeStatementComponent', () => {
  let component: GetIncomeStatementComponent;
  let fixture: ComponentFixture<GetIncomeStatementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetIncomeStatementComponent]
    });
    fixture = TestBed.createComponent(GetIncomeStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
