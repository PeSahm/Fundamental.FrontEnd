import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgricultureCashFlowDetailComponent } from './agriculture-cash-flow-detail.component';

describe('AgricultureCashFlowDetailComponent', () => {
  let component: AgricultureCashFlowDetailComponent;
  let fixture: ComponentFixture<AgricultureCashFlowDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AgricultureCashFlowDetailComponent] });
    fixture = TestBed.createComponent(AgricultureCashFlowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
