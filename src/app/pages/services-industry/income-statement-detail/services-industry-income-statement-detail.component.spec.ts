import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesIndustryIncomeStatementDetailComponent } from './services-industry-income-statement-detail.component';

describe('ServicesIndustryIncomeStatementDetailComponent', () => {
  let component: ServicesIndustryIncomeStatementDetailComponent;
  let fixture: ComponentFixture<ServicesIndustryIncomeStatementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ServicesIndustryIncomeStatementDetailComponent] });
    fixture = TestBed.createComponent(ServicesIndustryIncomeStatementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
