import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgricultureBalanceSheetDetailComponent } from './agriculture-balance-sheet-detail.component';

describe('AgricultureBalanceSheetDetailComponent', () => {
  let component: AgricultureBalanceSheetDetailComponent;
  let fixture: ComponentFixture<AgricultureBalanceSheetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [AgricultureBalanceSheetDetailComponent] });
    fixture = TestBed.createComponent(AgricultureBalanceSheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
