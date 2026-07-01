import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { CapitalSupplyChangesInEquityDetailComponent } from './capital-supply-changes-in-equity-detail.component';
import { CapitalSupplyChangesInEquityService } from 'src/app/services/capital-supply-changes-in-equity.service';
import { PersianNumberPipe } from 'src/app/pipes/persian-number.pipe';
import { JalaliDatePipe } from 'src/app/pipes/jalali-date.pipe';

describe('CapitalSupplyChangesInEquityDetailComponent', () => {
  let component: CapitalSupplyChangesInEquityDetailComponent;
  let fixture: ComponentFixture<CapitalSupplyChangesInEquityDetailComponent>;
  let mockService: jasmine.SpyObj<CapitalSupplyChangesInEquityService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockData = {
    id: 'test-id',
    isin: 'IRO1TEST0001',
    symbol: 'نماد',
    uri: '',
    traceNo: 1,
    fiscalYear: 1402,
    yearEndMonth: 12,
    reportMonth: 6,
    isAudited: true,
    publishDate: '2024-01-01',
    createdAt: '',
    updatedAt: '',
    items: [
      { rowCode: 1, rowType: null, description: 'مانده ابتدای دوره', capital: 1000, capitalIncreaseInProgress: 0, sharePremium: 0, treasurySharePremium: 0, legalReserve: 100, otherReserves: 0, revaluationSurplus: 0, foreignCurrencyTranslationDifference: 0, retainedEarnings: 500, treasuryShares: 0, total: 1600 },
      { rowCode: 2, rowType: null, description: 'مانده پایان دوره', capital: 1000, capitalIncreaseInProgress: 0, sharePremium: 0, treasurySharePremium: 0, legalReserve: 120, otherReserves: 0, revaluationSurplus: 0, foreignCurrencyTranslationDifference: 0, retainedEarnings: 700, treasuryShares: 0, total: 1820 }
    ]
  };

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('CapitalSupplyChangesInEquityService', ['getById']);
    serviceSpy.getById.and.returnValue(of({ data: mockData }));

    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('test-id') } }
    });

    await TestBed.configureTestingModule({
      declarations: [CapitalSupplyChangesInEquityDetailComponent, PersianNumberPipe, JalaliDatePipe],
      imports: [RouterTestingModule, NgbTooltipModule],
      providers: [
        { provide: CapitalSupplyChangesInEquityService, useValue: serviceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CapitalSupplyChangesInEquityDetailComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(CapitalSupplyChangesInEquityService) as jasmine.SpyObj<CapitalSupplyChangesInEquityService>;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load detail on init via getById', () => {
    component.ngOnInit();

    expect(mockService.getById).toHaveBeenCalledWith('test-id');
    expect(component.reportData).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  });

  it('should render the root container as RTL', () => {
    fixture.detectChanges();
    const root: HTMLElement = fixture.nativeElement.querySelector('.container-fluid');
    expect(root).toBeTruthy();
    expect(root.getAttribute('dir')).toBe('rtl');
  });

  it('should render item rows from mock data', () => {
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.section-card table tbody tr');
    expect(rows.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('مانده ابتدای دوره');
  });

  it('should handle missing report data', () => {
    mockService.getById.and.returnValue(of({ data: null }) as any);

    component.ngOnInit();

    expect(component.error).toBe('داده‌های گزارش یافت نشد');
    expect(component.isLoading).toBeFalse();
  });

  it('should format numbers and map null to em-dash', () => {
    expect(component.formatNumber(1234567)).toBe('1,234,567');
    expect(component.formatNumber(null)).toBe('—');
    expect(component.formatNumber(undefined)).toBe('—');
  });

  it('should handle missing ID parameter', () => {
    (mockActivatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue(null);

    component.ngOnInit();

    expect(component.error).toBe('شناسه گزارش مشخص نشده است');
    expect(component.isLoading).toBeFalse();
  });
});
