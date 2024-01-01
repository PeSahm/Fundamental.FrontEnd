import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFinancialReportComponent } from './get-financial-report.component';

describe('GetFinancialReportComponent', () => {
  let component: GetFinancialReportComponent;
  let fixture: ComponentFixture<GetFinancialReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetFinancialReportComponent]
    });
    fixture = TestBed.createComponent(GetFinancialReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
