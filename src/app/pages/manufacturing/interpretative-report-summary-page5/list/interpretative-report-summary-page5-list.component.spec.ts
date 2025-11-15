import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterpretativeReportSummaryPage5ListComponent } from './interpretative-report-summary-page5-list.component';

describe('InterpretativeReportSummaryPage5ListComponent', () => {
  let component: InterpretativeReportSummaryPage5ListComponent;
  let fixture: ComponentFixture<InterpretativeReportSummaryPage5ListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterpretativeReportSummaryPage5ListComponent]
    });
    fixture = TestBed.createComponent(InterpretativeReportSummaryPage5ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
