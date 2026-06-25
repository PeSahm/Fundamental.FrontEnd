import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ServicesIndustryChangesInEquityListComponent } from './services-industry-changes-in-equity-list.component';

describe('ServicesIndustryChangesInEquityListComponent', () => {
  let component: ServicesIndustryChangesInEquityListComponent;
  let fixture: ComponentFixture<ServicesIndustryChangesInEquityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicesIndustryChangesInEquityListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ServicesIndustryChangesInEquityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
