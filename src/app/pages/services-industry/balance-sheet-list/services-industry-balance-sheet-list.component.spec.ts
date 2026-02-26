import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesIndustryBalanceSheetListComponent } from './services-industry-balance-sheet-list.component';

describe('ServicesIndustryBalanceSheetListComponent', () => {
  let component: ServicesIndustryBalanceSheetListComponent;
  let fixture: ComponentFixture<ServicesIndustryBalanceSheetListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ declarations: [ServicesIndustryBalanceSheetListComponent] });
    fixture = TestBed.createComponent(ServicesIndustryBalanceSheetListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
