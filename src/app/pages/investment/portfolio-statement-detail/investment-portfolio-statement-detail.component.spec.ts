import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentPortfolioStatementDetailComponent } from './investment-portfolio-statement-detail.component';

describe('InvestmentPortfolioStatementDetailComponent', () => {
  let component: InvestmentPortfolioStatementDetailComponent;
  let fixture: ComponentFixture<InvestmentPortfolioStatementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InvestmentPortfolioStatementDetailComponent] });
    fixture = TestBed.createComponent(InvestmentPortfolioStatementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
