import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureMonthlyActivityDetailComponent } from './agriculture-monthly-activity-detail.component';

describe('AgricultureMonthlyActivityDetailComponent', () => {
  let component: AgricultureMonthlyActivityDetailComponent;
  let fixture: ComponentFixture<AgricultureMonthlyActivityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgricultureMonthlyActivityDetailComponent]
    });
    fixture = TestBed.createComponent(AgricultureMonthlyActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
