import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesIndustryMonthlyActivityDetailComponent } from './services-industry-monthly-activity-detail.component';

describe('ServicesIndustryMonthlyActivityDetailComponent', () => {
  let component: ServicesIndustryMonthlyActivityDetailComponent;
  let fixture: ComponentFixture<ServicesIndustryMonthlyActivityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ServicesIndustryMonthlyActivityDetailComponent] });
    fixture = TestBed.createComponent(ServicesIndustryMonthlyActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
