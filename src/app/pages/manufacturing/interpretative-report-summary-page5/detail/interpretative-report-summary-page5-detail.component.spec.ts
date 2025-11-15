import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterpretativeReportSummaryPage5DetailComponent } from './interpretative-report-summary-page5-detail.component';

describe('InterpretativeReportSummaryPage5DetailComponent', () => {
  let component: InterpretativeReportSummaryPage5DetailComponent;
  let fixture: ComponentFixture<InterpretativeReportSummaryPage5DetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterpretativeReportSummaryPage5DetailComponent]
    });
    fixture = TestBed.createComponent(InterpretativeReportSummaryPage5DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
