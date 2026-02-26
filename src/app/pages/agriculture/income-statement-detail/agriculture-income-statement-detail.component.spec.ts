import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgricultureIncomeStatementDetailComponent } from './agriculture-income-statement-detail.component';

describe('AgricultureIncomeStatementDetailComponent', () => {
  let component: AgricultureIncomeStatementDetailComponent;
  let fixture: ComponentFixture<AgricultureIncomeStatementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AgricultureIncomeStatementDetailComponent] });
    fixture = TestBed.createComponent(AgricultureIncomeStatementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
