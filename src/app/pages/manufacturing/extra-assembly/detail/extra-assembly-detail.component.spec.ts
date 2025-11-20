import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';

import { ExtraAssemblyDetailComponent } from './extra-assembly-detail.component';
import { ExtraAssemblyService } from 'src/app/services/extra-assembly.service';
import { ExtraAssemblyEnumService } from 'src/app/services/extra-assembly-enum.service';
import { AnnualAssemblyEnumService } from 'src/app/services/annual-assembly-enum.service';

describe('ExtraAssemblyDetailComponent', () => {
  let component: ExtraAssemblyDetailComponent;
  let fixture: ComponentFixture<ExtraAssemblyDetailComponent>;
  let mockService: jasmine.SpyObj<ExtraAssemblyService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('ExtraAssemblyService', ['getById']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ExtraAssemblyDetailComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: ExtraAssemblyService, useValue: mockService },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => (key === 'id' ? 'test-id' : null)
              }
            }
          }
        },
        ExtraAssemblyEnumService,
        AnnualAssemblyEnumService,
        ToastrService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraAssemblyDetailComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    mockService.getById.and.returnValue(of({} as any));
    expect(component).toBeTruthy();
  });

  it('should load detail on init', () => {
    const mockDetail = { symbol: 'TEST', fiscalYear: 1400 };
    mockService.getById.and.returnValue(of(mockDetail as any));

    fixture.detectChanges();

    expect(mockService.getById).toHaveBeenCalledWith('test-id');
    expect(component.detail).toEqual(mockDetail as any);
  });

  it('should handle error when loading detail', () => {
    mockService.getById.and.returnValue(throwError({ status: 404 }));

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/extra-assembly']);
  });
});
