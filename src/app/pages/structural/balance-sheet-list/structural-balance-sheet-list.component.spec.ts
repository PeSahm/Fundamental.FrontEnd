import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StructuralBalanceSheetListComponent } from './structural-balance-sheet-list.component';

describe('StructuralBalanceSheetListComponent', () => {
  let component: StructuralBalanceSheetListComponent;
  let fixture: ComponentFixture<StructuralBalanceSheetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [StructuralBalanceSheetListComponent] });
    fixture = TestBed.createComponent(StructuralBalanceSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
