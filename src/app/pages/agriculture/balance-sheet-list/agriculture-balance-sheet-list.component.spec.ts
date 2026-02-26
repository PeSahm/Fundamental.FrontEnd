import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgricultureBalanceSheetListComponent } from './agriculture-balance-sheet-list.component';

describe('AgricultureBalanceSheetListComponent', () => {
  let component: AgricultureBalanceSheetListComponent;
  let fixture: ComponentFixture<AgricultureBalanceSheetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AgricultureBalanceSheetListComponent] });
    fixture = TestBed.createComponent(AgricultureBalanceSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
