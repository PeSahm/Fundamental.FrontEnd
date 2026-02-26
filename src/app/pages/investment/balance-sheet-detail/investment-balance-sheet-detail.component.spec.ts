import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentBalanceSheetDetailComponent } from './investment-balance-sheet-detail.component';

describe('InvestmentBalanceSheetDetailComponent', () => {
  let component: InvestmentBalanceSheetDetailComponent;
  let fixture: ComponentFixture<InvestmentBalanceSheetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InvestmentBalanceSheetDetailComponent] });
    fixture = TestBed.createComponent(InvestmentBalanceSheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
