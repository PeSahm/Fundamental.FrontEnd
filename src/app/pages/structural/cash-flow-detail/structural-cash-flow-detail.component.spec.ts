import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StructuralCashFlowDetailComponent } from './structural-cash-flow-detail.component';

describe('StructuralCashFlowDetailComponent', () => {
  let component: StructuralCashFlowDetailComponent;
  let fixture: ComponentFixture<StructuralCashFlowDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [StructuralCashFlowDetailComponent] });
    fixture = TestBed.createComponent(StructuralCashFlowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
