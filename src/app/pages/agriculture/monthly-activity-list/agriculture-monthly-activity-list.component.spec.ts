import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgricultureMonthlyActivityListComponent } from './agriculture-monthly-activity-list.component';

describe('AgricultureMonthlyActivityListComponent', () => {
  let component: AgricultureMonthlyActivityListComponent;
  let fixture: ComponentFixture<AgricultureMonthlyActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgricultureMonthlyActivityListComponent]
    });
    fixture = TestBed.createComponent(AgricultureMonthlyActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
