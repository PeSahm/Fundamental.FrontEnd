import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgricultureCashFlowListComponent } from './agriculture-cash-flow-list.component';

describe('AgricultureCashFlowListComponent', () => {
  let component: AgricultureCashFlowListComponent;
  let fixture: ComponentFixture<AgricultureCashFlowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AgricultureCashFlowListComponent] });
    fixture = TestBed.createComponent(AgricultureCashFlowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
