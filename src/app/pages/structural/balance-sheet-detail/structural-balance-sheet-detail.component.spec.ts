import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StructuralBalanceSheetDetailComponent } from './structural-balance-sheet-detail.component';

describe('StructuralBalanceSheetDetailComponent', () => {
  let component: StructuralBalanceSheetDetailComponent;
  let fixture: ComponentFixture<StructuralBalanceSheetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [StructuralBalanceSheetDetailComponent] });
    fixture = TestBed.createComponent(StructuralBalanceSheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
