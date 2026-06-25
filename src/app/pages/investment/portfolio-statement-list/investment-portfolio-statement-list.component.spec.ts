import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentPortfolioStatementListComponent } from './investment-portfolio-statement-list.component';

describe('InvestmentPortfolioStatementListComponent', () => {
  let component: InvestmentPortfolioStatementListComponent;
  let fixture: ComponentFixture<InvestmentPortfolioStatementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InvestmentPortfolioStatementListComponent] });
    fixture = TestBed.createComponent(InvestmentPortfolioStatementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
