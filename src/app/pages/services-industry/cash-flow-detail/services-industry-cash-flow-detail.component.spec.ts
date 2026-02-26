import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesIndustryCashFlowDetailComponent } from './services-industry-cash-flow-detail.component';

describe('ServicesIndustryCashFlowDetailComponent', () => {
  let component: ServicesIndustryCashFlowDetailComponent;
  let fixture: ComponentFixture<ServicesIndustryCashFlowDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ServicesIndustryCashFlowDetailComponent] });
    fixture = TestBed.createComponent(ServicesIndustryCashFlowDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
