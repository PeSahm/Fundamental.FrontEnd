import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StructuralMonthlyActivityDetailComponent } from './structural-monthly-activity-detail.component';

describe('StructuralMonthlyActivityDetailComponent', () => {
  let component: StructuralMonthlyActivityDetailComponent;
  let fixture: ComponentFixture<StructuralMonthlyActivityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [StructuralMonthlyActivityDetailComponent] });
    fixture = TestBed.createComponent(StructuralMonthlyActivityDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
