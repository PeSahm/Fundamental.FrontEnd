import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StructuralMonthlyActivityListComponent } from './structural-monthly-activity-list.component';

describe('StructuralMonthlyActivityListComponent', () => {
  let component: StructuralMonthlyActivityListComponent;
  let fixture: ComponentFixture<StructuralMonthlyActivityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [StructuralMonthlyActivityListComponent] });
    fixture = TestBed.createComponent(StructuralMonthlyActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
