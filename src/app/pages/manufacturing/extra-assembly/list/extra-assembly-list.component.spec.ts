import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ExtraAssemblyListComponent } from './extra-assembly-list.component';
import { ExtraAssemblyService } from 'src/app/services/extra-assembly.service';
import { SearchFilterComponent } from 'src/app/components/search-filter/search-filter.component';
import { SymbolSearchComponent } from 'src/app/components/symbol-search/symbol-search.component';
import { TableComponent } from 'src/app/components/table/table.component';

describe('ExtraAssemblyListComponent', () => {
  let component: ExtraAssemblyListComponent;
  let fixture: ComponentFixture<ExtraAssemblyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ExtraAssemblyListComponent,
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
        ExtraAssemblyService,
        provideNgxMask()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraAssemblyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
