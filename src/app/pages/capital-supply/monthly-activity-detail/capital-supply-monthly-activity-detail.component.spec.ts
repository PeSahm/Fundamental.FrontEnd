import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapitalSupplyMonthlyActivityDetailComponent } from './capital-supply-monthly-activity-detail.component';

describe('CapitalSupplyMonthlyActivityDetailComponent', () => {
  let component: CapitalSupplyMonthlyActivityDetailComponent;
  let fixture: ComponentFixture<CapitalSupplyMonthlyActivityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [CapitalSupplyMonthlyActivityDetailComponent] });
    fixture = TestBed.createComponent(CapitalSupplyMonthlyActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
