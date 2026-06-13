import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StructuralChangesInEquityDetailComponent } from './structural-changes-in-equity-detail.component';

@Pipe({ name: 'persianNumber' })
class StubPersianNumberPipe implements PipeTransform { transform(v: unknown): unknown { return v; } }

@Pipe({ name: 'jalali' })
class StubJalaliPipe implements PipeTransform { transform(v: unknown): unknown { return v; } }

describe('StructuralChangesInEquityDetailComponent', () => {
  let component: StructuralChangesInEquityDetailComponent;
  let fixture: ComponentFixture<StructuralChangesInEquityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StructuralChangesInEquityDetailComponent, StubPersianNumberPipe, StubJalaliPipe],
      imports: [HttpClientTestingModule, RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(StructuralChangesInEquityDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => { fixture.detectChanges(); expect(component).toBeTruthy(); });

  it('should render item rows from data and root is rtl', () => {
    component.isLoading = false;
    component.reportData = {
      id: '1', isin: 'IRO1TEST0001', symbol: 'نماد', uri: '', traceNo: 1,
      fiscalYear: 1402, yearEndMonth: 12, reportMonth: 6, isAudited: true,
      publishDate: '2024-01-01', createdAt: '', updatedAt: '',
      items: [
        { rowCode: 1, rowType: null, description: 'مانده ابتدای دوره', capital: 1000, capitalIncreaseInProgress: 0, sharePremium: 0, treasurySharePremium: 0, legalReserve: 100, otherReserves: 0, revaluationSurplus: 0, foreignCurrencyTranslationDifference: 0, retainedEarnings: 500, treasuryShares: 0, total: 1600 },
        { rowCode: 2, rowType: null, description: 'مانده پایان دوره', capital: 1000, capitalIncreaseInProgress: 0, sharePremium: 0, treasurySharePremium: 0, legalReserve: 120, otherReserves: 0, revaluationSurplus: 0, foreignCurrencyTranslationDifference: 0, retainedEarnings: 700, treasuryShares: 0, total: 1820 }
      ]
    };
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('[dir="rtl"]')).toBeTruthy();
    expect(el.querySelectorAll('tbody tr').length).toBe(2);
  });
});
