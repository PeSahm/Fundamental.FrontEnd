import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvestmentBalanceSheetListComponent } from './investment-balance-sheet-list.component';

describe('InvestmentBalanceSheetListComponent', () => {
  let component: InvestmentBalanceSheetListComponent;
  let fixture: ComponentFixture<InvestmentBalanceSheetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [InvestmentBalanceSheetListComponent] });
    fixture = TestBed.createComponent(InvestmentBalanceSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
