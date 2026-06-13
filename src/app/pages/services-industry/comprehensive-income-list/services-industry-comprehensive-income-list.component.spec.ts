import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicesIndustryComprehensiveIncomeListComponent } from './services-industry-comprehensive-income-list.component';

describe('ServicesIndustryComprehensiveIncomeListComponent', () => {
  let component: ServicesIndustryComprehensiveIncomeListComponent;
  let fixture: ComponentFixture<ServicesIndustryComprehensiveIncomeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesIndustryComprehensiveIncomeListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ServicesIndustryComprehensiveIncomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
