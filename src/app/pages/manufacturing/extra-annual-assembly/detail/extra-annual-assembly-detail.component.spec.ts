import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraAnnualAssemblyDetailComponent } from './extra-annual-assembly-detail.component';

describe('ExtraAnnualAssemblyDetailComponent', () => {
  let component: ExtraAnnualAssemblyDetailComponent;
  let fixture: ComponentFixture<ExtraAnnualAssemblyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraAnnualAssemblyDetailComponent ]
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
