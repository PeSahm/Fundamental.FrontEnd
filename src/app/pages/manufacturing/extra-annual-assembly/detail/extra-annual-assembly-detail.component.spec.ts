import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { ExtraAnnualAssemblyDetailComponent } from './extra-annual-assembly-detail.component';
import { ExtraAnnualAssemblyService } from 'src/app/services/extra-annual-assembly.service';
import { AnnualAssemblyEnumService } from 'src/app/services/annual-assembly-enum.service';

describe('ExtraAnnualAssemblyDetailComponent', () => {
  let component: ExtraAnnualAssemblyDetailComponent;
  let fixture: ComponentFixture<ExtraAnnualAssemblyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraAnnualAssemblyDetailComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ExtraAnnualAssemblyService,
        AnnualAssemblyEnumService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: (key: string) => key === 'id' ? 'test-id' : null
              }
            }
          }
        },
        {
          provide: 'ToastrService',
          useValue: {
            error: jasmine.createSpy('error'),
            success: jasmine.createSpy('success')
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraAnnualAssemblyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
