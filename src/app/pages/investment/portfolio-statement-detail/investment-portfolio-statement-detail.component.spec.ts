import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';

import { InvestmentPortfolioStatementDetailComponent } from './investment-portfolio-statement-detail.component';
import { InvestmentPortfolioStatementService } from 'src/app/services/investment-portfolio-statement.service';
import { PersianNumberPipe } from 'src/app/pipes/persian-number.pipe';
import { JalaliDatePipe } from 'src/app/pipes/jalali-date.pipe';

describe('InvestmentPortfolioStatementDetailComponent', () => {
  let component: InvestmentPortfolioStatementDetailComponent;
  let fixture: ComponentFixture<InvestmentPortfolioStatementDetailComponent>;
  let mockService: jasmine.SpyObj<InvestmentPortfolioStatementService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  const mockData = {
    id: 'test-id',
    isin: 'IRO7PFAN0001',
    symbol: 'وسرمایه',
    fiscalYear: 1403,
    reportMonth: 6,
    publishDate: '2024-09-22T00:00:00Z',
    currency: 'IRR',
    uri: '',
    reserveForInvestment: 1000,
    investmentDescription: 'توضیح سرمایه‌گذاری',
    dividendCurrentMonth: 500,
    dividendDescription: 'توضیح سود',
    acceptedPortfolioItems: [
      { companyName: 'شرکت الف', companySymbol: 'فالف', capital: 10000, shareNominalValue: 1000, startShareCount: 100, startCost: 2000, startMarketValue: 3000, shareCountChange: 0, costChange: 0, marketValueChange: 0, endOwnershipPercent: 5, endCost: 2000, endMarketValue: 5000, endCostPerShare: 20, endValuePerShare: 50, profitLoss: 3000 }
    ],
    notAcceptedPortfolioItems: [],
    incomeBuyItems: [],
    incomeSaleItems: [],
    dividendItems: [],
    industryGroupItems: []
  };

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('InvestmentPortfolioStatementService', ['getById']);
    serviceSpy.getById.and.returnValue(of({ data: mockData }));

    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { paramMap: { get: jasmine.createSpy('get').and.returnValue('test-id') } }
    });

    await TestBed.configureTestingModule({
      declarations: [InvestmentPortfolioStatementDetailComponent, PersianNumberPipe, JalaliDatePipe],
      imports: [RouterTestingModule, NgbTooltipModule],
      providers: [
        { provide: InvestmentPortfolioStatementService, useValue: serviceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InvestmentPortfolioStatementDetailComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(InvestmentPortfolioStatementService) as jasmine.SpyObj<InvestmentPortfolioStatementService>;
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

  it('should render accepted portfolio rows from mock data', () => {
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('.section-card table tbody tr');
    expect(rows.length).toBeGreaterThan(0);
    expect(fixture.nativeElement.textContent).toContain('شرکت الف');
    expect(fixture.nativeElement.textContent).toContain('سبد سهام شرکت‌های پذیرفته‌شده در بورس');
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
