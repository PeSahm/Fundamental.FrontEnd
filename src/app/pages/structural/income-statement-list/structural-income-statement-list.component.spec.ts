import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StructuralIncomeStatementListComponent } from './structural-income-statement-list.component';

describe('StructuralIncomeStatementListComponent', () => {
  let component: StructuralIncomeStatementListComponent;
  let fixture: ComponentFixture<StructuralIncomeStatementListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [StructuralIncomeStatementListComponent] });
    fixture = TestBed.createComponent(StructuralIncomeStatementListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
