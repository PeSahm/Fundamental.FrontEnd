import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { of } from 'rxjs';
import { InsuranceComprehensiveIncomeListComponent } from './insurance-comprehensive-income-list.component';
import { InsuranceComprehensiveIncomeService } from 'src/app/services/insurance-comprehensive-income.service';

// Stub child components so no NO_ERRORS_SCHEMA is needed
@Component({ selector: 'app-search-filter', template: '<ng-content></ng-content>' })
class SearchFilterStub { }

@Component({ selector: 'app-symbol-search', template: '' })
class SymbolSearchStub {
  @Input() isMulti = false;
  @Output() selectSearchSymbol = new EventEmitter<any>();
}

@Component({ selector: 'app-table', template: '' })
class TableStub {
  @Input() data: any;
  @Input() KeyName: any;
  @Input() columnName: any;
  @Input() isLoading: any;
  @Input() totalRecords: any;
  @Input() pageSize: any;
  @Input() page: any;
  @Input() isExpandable: any;
  @Input() children: any;
  @Input() columnNameChild: any;
  @Input() KeyNameChild: any;
  @Input() isLoadingChild: any;
  @Output() changePageEvent = new EventEmitter<any>();
  @Output() changeSizeEvent = new EventEmitter<any>();
  @Output() expandRowEvent = new EventEmitter<any>();
  @Output() sortEvent = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<any>();
}

describe('InsuranceComprehensiveIncomeListComponent', () => {
  let component: InsuranceComprehensiveIncomeListComponent;
  let fixture: ComponentFixture<InsuranceComprehensiveIncomeListComponent>;
  let serviceSpy: jasmine.SpyObj<InsuranceComprehensiveIncomeService>;

  const mockListResponse = {
    data: {
      items: [
        { id: 'ci-1', symbol: 'وساخت', isin: 'IRO1VSKT0001', fiscalYear: 1402, reportMonth: 6, publishDate: '1402/07/01', uri: 'https://codal.ir/1' }
      ],
      meta: { total: 1 }
    }
  };

  const mockDetailResponse = {
    data: {
      details: [
        { row: 1, codalRow: 400, description: 'سود خالص', value: 4500000 },
        { row: 2, codalRow: 401, description: 'سایر اقلام سود جامع', value: 300000 },
      ]
    }
  };

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj('InsuranceComprehensiveIncomeService', ['getAll', 'getById']);
    serviceSpy.getAll.and.returnValue(of(mockListResponse as any));
    serviceSpy.getById.and.returnValue(of(mockDetailResponse as any));

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, NgxMaskDirective, NgxMaskPipe],
      declarations: [
        InsuranceComprehensiveIncomeListComponent,
        SearchFilterStub,
        SymbolSearchStub,
        TableStub,
      ],
      providers: [
        { provide: InsuranceComprehensiveIncomeService, useValue: serviceSpy },
        provideNgxMask(),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InsuranceComprehensiveIncomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getAll on init and populate reports', () => {
    expect(serviceSpy.getAll).toHaveBeenCalled();
    expect(component.reports?.length).toBe(1);
    expect(component.totalRecords).toBe(1);
  });

  it('should configure master columns without an operations column', () => {
    const names = component.columnName.map(c => c.name);
    expect(names.every(n => n != null)).toBeTrue();
    expect(names).toContain('symbol');
    expect(names).toContain('isin');
    expect(names).toContain('fiscalYear');
    expect(names).toContain('uri');
  });

  it('should configure child columns with value pipe:number', () => {
    expect(component.columnNameChild).toEqual(['ردیف', 'کدال ردیف', 'شرح', 'مقدار']);
    const valueKey = component.KeyNameChild.find(k => k.name === 'value');
    expect(valueKey).toBeTruthy();
    expect(valueKey?.pipe).toBe('number');
  });

  it('getDetailRow should call getById and set children when expanding', () => {
    const fakeRow = { id: 'ci-1', symbol: 'وساخت', isin: 'IRO1VSKT0001', fiscalYear: 1402, reportMonth: 6, publishDate: '1402/07/01', uri: 'https://codal.ir/1' };
    component.getDetailRow({ expand: true, rowData: fakeRow });
    expect(serviceSpy.getById).toHaveBeenCalledWith('ci-1');
    expect(component.children?.length).toBe(2);
  });

  it('getDetailRow should NOT call getById when collapsing', () => {
    const fakeRow = { id: 'ci-1', symbol: 'وساخت', isin: 'IRO1VSKT0001', fiscalYear: 1402, reportMonth: 6, publishDate: '1402/07/01', uri: 'https://codal.ir/1' };
    component.getDetailRow({ expand: false, rowData: fakeRow });
    expect(serviceSpy.getById).not.toHaveBeenCalled();
  });
});
