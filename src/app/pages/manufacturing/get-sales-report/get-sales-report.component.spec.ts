import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetSalesReportComponent } from './get-sales-report.component';

describe('GetSalesReportComponent', () => {
  let component: GetSalesReportComponent;
  let fixture: ComponentFixture<GetSalesReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GetSalesReportComponent]
    });
    fixture = TestBed.createComponent(GetSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
