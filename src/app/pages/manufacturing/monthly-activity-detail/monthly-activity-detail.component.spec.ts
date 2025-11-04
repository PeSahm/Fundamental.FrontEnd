import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MonthlyActivityDetailComponent } from './monthly-activity-detail.component';
import { MonthlyActivityService } from '../../../services/monthly-activity.service';

describe('MonthlyActivityDetailComponent', () => {
  let component: MonthlyActivityDetailComponent;
  let fixture: ComponentFixture<MonthlyActivityDetailComponent>;
  let mockMonthlyActivityService: jasmine.SpyObj<MonthlyActivityService>;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(async () => {
    const monthlyActivityServiceSpy = jasmine.createSpyObj('MonthlyActivityService', ['getMonthlyActivityById']);
    const activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: {
        paramMap: {
          get: jasmine.createSpy('get').and.returnValue('test-id')
        }
      }
    });

    await TestBed.configureTestingModule({
      declarations: [MonthlyActivityDetailComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: MonthlyActivityService, useValue: monthlyActivityServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MonthlyActivityDetailComponent);
    component = fixture.componentInstance;
    mockMonthlyActivityService = TestBed.inject(MonthlyActivityService) as jasmine.SpyObj<MonthlyActivityService>;
    mockActivatedRoute = TestBed.inject(ActivatedRoute) as jasmine.SpyObj<ActivatedRoute>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load monthly activity detail on init', () => {
    const mockResponse = {
      data: {
        id: 'test-id',
        symbol: 'TEST',
        isin: 'TEST123',
        title: 'Test Company',
        fiscalYear: 1404,
        reportMonth: 6,
        productionAndSalesItems: [],
        buyRawMaterialItems: [],
        energyItems: [],
        currencyExchangeItems: [],
        descriptions: []
      }
    };

    mockMonthlyActivityService.getMonthlyActivityById.and.returnValue(of(mockResponse));

    component.ngOnInit();

    expect(mockMonthlyActivityService.getMonthlyActivityById).toHaveBeenCalledWith({ id: 'test-id' });
    expect(component.activityData).toBeDefined();
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error when loading data', () => {
    mockMonthlyActivityService.getMonthlyActivityById.and.returnValue(of(null));

    component.ngOnInit();

    expect(component.error).toBe('داده‌های فعالیت ماهانه یافت نشد');
    expect(component.isLoading).toBeFalse();
  });

  it('should format numbers correctly', () => {
    expect(component.formatNumber(1234567)).toBe('۱,۲۳۴,۵۶۷');
    expect(component.formatNumber(null)).toBe('—');
    expect(component.formatNumber(undefined)).toBe('—');
  });

  it('should separate data and summary rows for production and sales', () => {
    const mockData = {
      id: 'test-id',
      symbol: 'TEST',
      productionAndSalesItems: [
        { rowCode: -1, productName: 'Product A' },
        { rowCode: 5, productName: 'جمع فروش داخلی' },
        { rowCode: 16, productName: 'جمع کل' }
      ],
      buyRawMaterialItems: [],
      energyItems: [],
      currencyExchangeItems: [],
      descriptions: []
    };

    component.activityData = mockData as any;

    const dataRows = component.getProductionSalesDataRows();
    const summaryRows = component.getProductionSalesSummaryRows();

    expect(dataRows.length).toBe(1);
    expect(summaryRows.length).toBe(2);
  });

  it('should apply correct row classes', () => {
    expect(component.getProductionSalesRowClass({ rowCode: 16 } as any)).toBe('total-sum-row');
    expect(component.getProductionSalesRowClass({ rowCode: 5 } as any)).toBe('internal-sum-row');
    expect(component.getProductionSalesRowClass({ rowCode: 8 } as any)).toBe('export-sum-row');
    expect(component.getProductionSalesRowClass({ rowCode: -1 } as any)).toBe('data-row');
  });

  it('should handle missing ID parameter', () => {
    (mockActivatedRoute.snapshot.paramMap.get as jasmine.Spy).and.returnValue(null);

    component.ngOnInit();

    expect(component.error).toBe('شناسه فعالیت ماهانه مشخص نشده است');
    expect(component.isLoading).toBeFalse();
  });
});