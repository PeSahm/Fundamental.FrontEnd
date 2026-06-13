import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AgricultureChangesInEquityListComponent } from './agriculture-changes-in-equity-list.component';

describe('AgricultureChangesInEquityListComponent', () => {
  let component: AgricultureChangesInEquityListComponent;
  let fixture: ComponentFixture<AgricultureChangesInEquityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgricultureChangesInEquityListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AgricultureChangesInEquityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
