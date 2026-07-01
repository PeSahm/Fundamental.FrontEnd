import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeasingMonthlyActivityListComponent } from './leasing-monthly-activity-list.component';

describe('LeasingMonthlyActivityListComponent', () => {
  let component: LeasingMonthlyActivityListComponent;
  let fixture: ComponentFixture<LeasingMonthlyActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [LeasingMonthlyActivityListComponent] });
    fixture = TestBed.createComponent(LeasingMonthlyActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
