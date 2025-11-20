import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ExtraAnnualAssemblyListComponent } from './extra-annual-assembly-list.component';
import { ExtraAnnualAssemblyService } from 'src/app/services/extra-annual-assembly.service';

describe('ExtraAnnualAssemblyListComponent', () => {
  let component: ExtraAnnualAssemblyListComponent;
  let fixture: ComponentFixture<ExtraAnnualAssemblyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraAnnualAssemblyListComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        ExtraAnnualAssemblyService
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
