import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { AgricultureComprehensiveIncomeDetailComponent } from './agriculture-comprehensive-income-detail.component';
import { AgricultureComprehensiveIncomeService } from 'src/app/services/agriculture-comprehensive-income.service';
import { PersianNumberPipe } from 'src/app/pipes/persian-number.pipe';
import { JalaliDatePipe } from 'src/app/pipes/jalali-date.pipe';

describe('AgricultureComprehensiveIncomeDetailComponent', () => {
  let component: AgricultureComprehensiveIncomeDetailComponent;
  let fixture: ComponentFixture<AgricultureComprehensiveIncomeDetailComponent>;
  let mockService: jasmine.SpyObj<AgricultureComprehensiveIncomeService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockData = {
    id: 'test-id',
    isin: 'IRO1TEST0001',
    symbol: 'نماد',
    fiscalYear: 1402,
    reportMonth: 6,
    isAudited: true,
    publishDate: '2024-01-01',
    uri: '',
    details: [
      { row: 1, codalRow: 1, description: 'سود خالص', value: 1234567 },
      { row: 5, codalRow: 5, description: 'سود جامع دوره', value: 7654321 }
    ]
  };

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('AgricultureComprehensiveIncomeService', ['getById']);
    serviceSpy.getById.and.returnValue(of({ data: mockData }));

    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('test-id') } }
    });

    await TestBed.configureTestingModule({
      declarations: [AgricultureComprehensiveIncomeDetailComponent, PersianNumberPipe, JalaliDatePipe],
      imports: [RouterTestingModule, NgbTooltipModule],
      providers: [
        { provide: AgricultureComprehensiveIncomeService, useValue: serviceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgricultureComprehensiveIncomeDetailComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(AgricultureComprehensiveIncomeService) as jasmine.SpyObj<AgricultureComprehensiveIncomeService>;
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

  it('should render detail rows from mock data', () => {
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.section-card table tbody tr');
    expect(rows.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('سود خالص');
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
