import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesIndustryIncomeStatementListComponent } from './services-industry-income-statement-list.component';

describe('ServicesIndustryIncomeStatementListComponent', () => {
  let component: ServicesIndustryIncomeStatementListComponent;
  let fixture: ComponentFixture<ServicesIndustryIncomeStatementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ServicesIndustryIncomeStatementListComponent] });
    fixture = TestBed.createComponent(ServicesIndustryIncomeStatementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
