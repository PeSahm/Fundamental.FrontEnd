import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { InterpretativeReportSummaryPage5DetailComponent } from './interpretative-report-summary-page5-detail.component';
import { InterpretativeReportSummaryPage5Service } from 'src/app/services/interpretative-report-summary-page5.service';

describe('InterpretativeReportSummaryPage5DetailComponent', () => {
  let component: InterpretativeReportSummaryPage5DetailComponent;
  let fixture: ComponentFixture<InterpretativeReportSummaryPage5DetailComponent>;
  let mockService: jasmine.SpyObj<InterpretativeReportSummaryPage5Service>;
  let mockActivatedRoute: any;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockToastr: jasmine.SpyObj<ToastrService>;

  beforeEach(() => {
    mockService = jasmine.createSpyObj('InterpretativeReportSummaryPage5Service', ['getById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockToastr = jasmine.createSpyObj('ToastrService', ['error']);

    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy().and.returnValue('test-id')
        }
      }
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [InterpretativeReportSummaryPage5DetailComponent],
      providers: [
        { provide: InterpretativeReportSummaryPage5Service, useValue: mockService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: ToastrService, useValue: mockToastr }
      ]
    });
    fixture = TestBed.createComponent(InterpretativeReportSummaryPage5DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
