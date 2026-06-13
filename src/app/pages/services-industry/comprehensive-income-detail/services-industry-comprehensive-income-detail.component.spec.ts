import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicesIndustryComprehensiveIncomeDetailComponent } from './services-industry-comprehensive-income-detail.component';

describe('ServicesIndustryComprehensiveIncomeDetailComponent', () => {
  let component: ServicesIndustryComprehensiveIncomeDetailComponent;
  let fixture: ComponentFixture<ServicesIndustryComprehensiveIncomeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesIndustryComprehensiveIncomeDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ServicesIndustryComprehensiveIncomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
