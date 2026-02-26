import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesIndustryCashFlowListComponent } from './services-industry-cash-flow-list.component';

describe('ServicesIndustryCashFlowListComponent', () => {
  let component: ServicesIndustryCashFlowListComponent;
  let fixture: ComponentFixture<ServicesIndustryCashFlowListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ServicesIndustryCashFlowListComponent] });
    fixture = TestBed.createComponent(ServicesIndustryCashFlowListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
