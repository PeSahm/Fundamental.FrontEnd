import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentIncomeStatementDetailComponent } from './investment-income-statement-detail.component';

describe('InvestmentIncomeStatementDetailComponent', () => {
  let component: InvestmentIncomeStatementDetailComponent;
  let fixture: ComponentFixture<InvestmentIncomeStatementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InvestmentIncomeStatementDetailComponent] });
    fixture = TestBed.createComponent(InvestmentIncomeStatementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
