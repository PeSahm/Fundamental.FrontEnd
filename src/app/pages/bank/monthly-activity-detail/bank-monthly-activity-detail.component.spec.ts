import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankMonthlyActivityDetailComponent } from './bank-monthly-activity-detail.component';

describe('BankMonthlyActivityDetailComponent', () => {
  let component: BankMonthlyActivityDetailComponent;
  let fixture: ComponentFixture<BankMonthlyActivityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [BankMonthlyActivityDetailComponent] });
    fixture = TestBed.createComponent(BankMonthlyActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
