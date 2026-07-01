import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InsuranceChangesInEquityListComponent } from './insurance-changes-in-equity-list.component';

describe('InsuranceChangesInEquityListComponent', () => {
  let component: InsuranceChangesInEquityListComponent;
  let fixture: ComponentFixture<InsuranceChangesInEquityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceChangesInEquityListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(InsuranceChangesInEquityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
