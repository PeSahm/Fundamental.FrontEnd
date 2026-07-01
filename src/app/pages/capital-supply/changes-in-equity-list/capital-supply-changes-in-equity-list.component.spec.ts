import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CapitalSupplyChangesInEquityListComponent } from './capital-supply-changes-in-equity-list.component';

describe('CapitalSupplyChangesInEquityListComponent', () => {
  let component: CapitalSupplyChangesInEquityListComponent;
  let fixture: ComponentFixture<CapitalSupplyChangesInEquityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CapitalSupplyChangesInEquityListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CapitalSupplyChangesInEquityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
