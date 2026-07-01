import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BankMonthlyActivityListComponent } from './bank-monthly-activity-list.component';

describe('BankMonthlyActivityListComponent', () => {
  let component: BankMonthlyActivityListComponent;
  let fixture: ComponentFixture<BankMonthlyActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [BankMonthlyActivityListComponent] });
    fixture = TestBed.createComponent(BankMonthlyActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
