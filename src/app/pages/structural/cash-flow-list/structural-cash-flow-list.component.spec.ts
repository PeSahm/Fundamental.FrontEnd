import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StructuralCashFlowListComponent } from './structural-cash-flow-list.component';

describe('StructuralCashFlowListComponent', () => {
  let component: StructuralCashFlowListComponent;
  let fixture: ComponentFixture<StructuralCashFlowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [StructuralCashFlowListComponent] });
    fixture = TestBed.createComponent(StructuralCashFlowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
