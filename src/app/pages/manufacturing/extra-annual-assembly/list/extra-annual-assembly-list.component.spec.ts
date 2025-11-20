import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ExtraAnnualAssemblyListComponent } from './extra-annual-assembly-list.component';
import { ExtraAnnualAssemblyService } from 'src/app/services/extra-annual-assembly.service';
import { SearchFilterComponent } from 'src/app/components/search-filter/search-filter.component';
import { SymbolSearchComponent } from 'src/app/components/symbol-search/symbol-search.component';
import { TableComponent } from 'src/app/components/table/table.component';

describe('ExtraAnnualAssemblyListComponent', () => {
  let component: ExtraAnnualAssemblyListComponent;
  let fixture: ComponentFixture<ExtraAnnualAssemblyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExtraAnnualAssemblyListComponent,
        SearchFilterComponent,
        SymbolSearchComponent,
        TableComponent
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        NgxMaskDirective,
        NgxMaskPipe
      ],
      providers: [
        ExtraAnnualAssemblyService,
        provideNgxMask()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraAnnualAssemblyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
