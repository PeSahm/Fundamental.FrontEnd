import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentCashFlowListComponent } from './investment-cash-flow-list.component';

describe('InvestmentCashFlowListComponent', () => {
  let component: InvestmentCashFlowListComponent;
  let fixture: ComponentFixture<InvestmentCashFlowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InvestmentCashFlowListComponent] });
    fixture = TestBed.createComponent(InvestmentCashFlowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
