import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AgricultureComprehensiveIncomeDetailComponent } from './agriculture-comprehensive-income-detail.component';

describe('AgricultureComprehensiveIncomeDetailComponent', () => {
  let component: AgricultureComprehensiveIncomeDetailComponent;
  let fixture: ComponentFixture<AgricultureComprehensiveIncomeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgricultureComprehensiveIncomeDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AgricultureComprehensiveIncomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
