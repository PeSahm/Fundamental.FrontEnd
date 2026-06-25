import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StructuralChangesInEquityListComponent } from './structural-changes-in-equity-list.component';

describe('StructuralChangesInEquityListComponent', () => {
  let component: StructuralChangesInEquityListComponent;
  let fixture: ComponentFixture<StructuralChangesInEquityListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StructuralChangesInEquityListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(StructuralChangesInEquityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => { expect(component).toBeTruthy(); });
});
