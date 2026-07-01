import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsuranceMonthlyActivityDetailComponent } from './insurance-monthly-activity-detail.component';

describe('InsuranceMonthlyActivityDetailComponent', () => {
  let component: InsuranceMonthlyActivityDetailComponent;
  let fixture: ComponentFixture<InsuranceMonthlyActivityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InsuranceMonthlyActivityDetailComponent] });
    fixture = TestBed.createComponent(InsuranceMonthlyActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
