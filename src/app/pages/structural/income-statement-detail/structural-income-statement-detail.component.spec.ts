import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StructuralIncomeStatementDetailComponent } from './structural-income-statement-detail.component';

describe('StructuralIncomeStatementDetailComponent', () => {
  let component: StructuralIncomeStatementDetailComponent;
  let fixture: ComponentFixture<StructuralIncomeStatementDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [StructuralIncomeStatementDetailComponent] });
    fixture = TestBed.createComponent(StructuralIncomeStatementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
