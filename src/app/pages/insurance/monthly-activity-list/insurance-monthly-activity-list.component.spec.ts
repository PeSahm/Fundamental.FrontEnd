import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsuranceMonthlyActivityListComponent } from './insurance-monthly-activity-list.component';

describe('InsuranceMonthlyActivityListComponent', () => {
  let component: InsuranceMonthlyActivityListComponent;
  let fixture: ComponentFixture<InsuranceMonthlyActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InsuranceMonthlyActivityListComponent] });
    fixture = TestBed.createComponent(InsuranceMonthlyActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
