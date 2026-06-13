import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { InvestmentPortfolioStatementDetailComponent } from './investment-portfolio-statement-detail.component';
import { InvestmentPortfolioStatementService } from 'src/app/services/investment-portfolio-statement.service';

@Pipe({ name: 'persianNumber' })
class StubPersianNumberPipe implements PipeTransform {
  transform(value: unknown): string { return value == null ? '—' : String(value); }
}

@Pipe({ name: 'jalali' })
class StubJalaliDatePipe implements PipeTransform {
  transform(value: unknown): string { return value == null ? '—' : String(value); }
}

describe('InvestmentPortfolioStatementDetailComponent', () => {
  let component: InvestmentPortfolioStatementDetailComponent;
  let fixture: ComponentFixture<InvestmentPortfolioStatementDetailComponent>;
  let serviceSpy: jasmine.SpyObj<InvestmentPortfolioStatementService>;

  const mockData = {
    id: 'abc',
    isin: 'IRO1TEST0001',
    symbol: 'وسرمایه',
    fiscalYear: 1403,
    reportMonth: 6,
    publishDate: '2024-09-22T00:00:00Z',
    currency: 'IRR',
    reserveForInvestment: 1000,
    investmentDescription: 'توضیح سرمایه‌گذاری',
    dividendCurrentMonth: 500,
    dividendDescription: 'توضیح سود',
    acceptedPortfolioItems: [
      { companyName: 'شرکت الف', companySymbol: 'فالف', capital: 10000, startCost: 2000, endMarketValue: 5000, profitLoss: 3000, rowCode: -1, rowType: 'data' }
    ],
    notAcceptedPortfolioItems: [],
    incomeBuyItems: [],
    incomeSaleItems: [],
    dividendItems: [],
    industryGroupItems: []
  };

  beforeEach(() => {
    serviceSpy = jasmine.createSpyObj<InvestmentPortfolioStatementService>('InvestmentPortfolioStatementService', ['getById', 'getAll']);
    serviceSpy.getById.and.returnValue(of({ data: mockData }));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [InvestmentPortfolioStatementDetailComponent, StubPersianNumberPipe, StubJalaliDatePipe],
      providers: [
        { provide: InvestmentPortfolioStatementService, useValue: serviceSpy },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id: 'abc' }) } } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(InvestmentPortfolioStatementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load detail data via getById', () => {
    expect(serviceSpy.getById).toHaveBeenCalled();
    expect(component.reportData).toBeTruthy();
    expect(component.isLoading).toBeFalse();
  });

  it('should render the root container as RTL', () => {
    const root: HTMLElement = fixture.nativeElement.querySelector('.container-fluid');
    expect(root).toBeTruthy();
    expect(root.getAttribute('dir')).toBe('rtl');
  });

  it('should render accepted portfolio rows from mock data', () => {
    const rows = fixture.nativeElement.querySelectorAll('.section-card table tbody tr');
    expect(rows.length).toBeGreaterThan(0);
    expect(fixture.nativeElement.textContent).toContain('شرکت الف');
    expect(fixture.nativeElement.textContent).toContain('سبد سهام شرکت‌های پذیرفته‌شده در بورس');
  });
});
