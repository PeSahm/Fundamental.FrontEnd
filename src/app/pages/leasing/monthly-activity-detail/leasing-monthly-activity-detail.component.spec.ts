import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeasingMonthlyActivityDetailComponent } from './leasing-monthly-activity-detail.component';

describe('LeasingMonthlyActivityDetailComponent', () => {
  let component: LeasingMonthlyActivityDetailComponent;
  let fixture: ComponentFixture<LeasingMonthlyActivityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [LeasingMonthlyActivityDetailComponent] });
    fixture = TestBed.createComponent(LeasingMonthlyActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
