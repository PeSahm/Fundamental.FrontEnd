import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesIndustryMonthlyActivityListComponent } from './services-industry-monthly-activity-list.component';

describe('ServicesIndustryMonthlyActivityListComponent', () => {
  let component: ServicesIndustryMonthlyActivityListComponent;
  let fixture: ComponentFixture<ServicesIndustryMonthlyActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ServicesIndustryMonthlyActivityListComponent] });
    fixture = TestBed.createComponent(ServicesIndustryMonthlyActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
