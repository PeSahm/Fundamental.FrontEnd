import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesIndustryBalanceSheetDetailComponent } from './services-industry-balance-sheet-detail.component';

describe('ServicesIndustryBalanceSheetDetailComponent', () => {
  let component: ServicesIndustryBalanceSheetDetailComponent;
  let fixture: ComponentFixture<ServicesIndustryBalanceSheetDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ServicesIndustryBalanceSheetDetailComponent] });
    fixture = TestBed.createComponent(ServicesIndustryBalanceSheetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
