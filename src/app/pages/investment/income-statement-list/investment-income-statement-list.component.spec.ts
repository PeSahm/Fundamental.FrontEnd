import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentIncomeStatementListComponent } from './investment-income-statement-list.component';

describe('InvestmentIncomeStatementListComponent', () => {
  let component: InvestmentIncomeStatementListComponent;
  let fixture: ComponentFixture<InvestmentIncomeStatementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InvestmentIncomeStatementListComponent] });
    fixture = TestBed.createComponent(InvestmentIncomeStatementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
