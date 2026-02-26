import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentCashFlowDetailComponent } from './investment-cash-flow-detail.component';

describe('InvestmentCashFlowDetailComponent', () => {
  let component: InvestmentCashFlowDetailComponent;
  let fixture: ComponentFixture<InvestmentCashFlowDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InvestmentCashFlowDetailComponent] });
    fixture = TestBed.createComponent(InvestmentCashFlowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
