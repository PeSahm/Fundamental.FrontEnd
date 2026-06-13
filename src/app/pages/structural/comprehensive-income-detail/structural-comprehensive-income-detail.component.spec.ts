import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StructuralComprehensiveIncomeDetailComponent } from './structural-comprehensive-income-detail.component';

describe('StructuralComprehensiveIncomeDetailComponent', () => {
  let component: StructuralComprehensiveIncomeDetailComponent;
  let fixture: ComponentFixture<StructuralComprehensiveIncomeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StructuralComprehensiveIncomeDetailComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(StructuralComprehensiveIncomeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
