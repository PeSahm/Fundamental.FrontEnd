import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { InterpretativeReportSummaryPage5ListComponent } from './interpretative-report-summary-page5-list.component';
import { InterpretativeReportSummaryPage5Service } from 'src/app/services/interpretative-report-summary-page5.service';

describe('InterpretativeReportSummaryPage5ListComponent', () => {
  let component: InterpretativeReportSummaryPage5ListComponent;
  let fixture: ComponentFixture<InterpretativeReportSummaryPage5ListComponent>;
  let mockService: jasmine.SpyObj<InterpretativeReportSummaryPage5Service>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('InterpretativeReportSummaryPage5Service', ['getList']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [InterpretativeReportSummaryPage5ListComponent],
      providers: [
        { provide: InterpretativeReportSummaryPage5Service, useValue: mockService },
        { provide: Router, useValue: mockRouter }
      ]
    });
    fixture = TestBed.createComponent(InterpretativeReportSummaryPage5ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
