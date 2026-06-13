import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StructuralComprehensiveIncomeListComponent } from './structural-comprehensive-income-list.component';

describe('StructuralComprehensiveIncomeListComponent', () => {
  let component: StructuralComprehensiveIncomeListComponent;
  let fixture: ComponentFixture<StructuralComprehensiveIncomeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StructuralComprehensiveIncomeListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(StructuralComprehensiveIncomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
