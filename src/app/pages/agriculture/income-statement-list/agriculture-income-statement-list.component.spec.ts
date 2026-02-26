import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgricultureIncomeStatementListComponent } from './agriculture-income-statement-list.component';

describe('AgricultureIncomeStatementListComponent', () => {
  let component: AgricultureIncomeStatementListComponent;
  let fixture: ComponentFixture<AgricultureIncomeStatementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AgricultureIncomeStatementListComponent] });
    fixture = TestBed.createComponent(AgricultureIncomeStatementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
