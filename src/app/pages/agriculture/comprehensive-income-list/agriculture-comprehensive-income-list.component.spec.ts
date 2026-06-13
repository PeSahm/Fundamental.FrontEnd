import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AgricultureComprehensiveIncomeListComponent } from './agriculture-comprehensive-income-list.component';

describe('AgricultureComprehensiveIncomeListComponent', () => {
  let component: AgricultureComprehensiveIncomeListComponent;
  let fixture: ComponentFixture<AgricultureComprehensiveIncomeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgricultureComprehensiveIncomeListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AgricultureComprehensiveIncomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
