import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapitalSupplyMonthlyActivityListComponent } from './capital-supply-monthly-activity-list.component';

describe('CapitalSupplyMonthlyActivityListComponent', () => {
  let component: CapitalSupplyMonthlyActivityListComponent;
  let fixture: ComponentFixture<CapitalSupplyMonthlyActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [CapitalSupplyMonthlyActivityListComponent] });
    fixture = TestBed.createComponent(CapitalSupplyMonthlyActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
