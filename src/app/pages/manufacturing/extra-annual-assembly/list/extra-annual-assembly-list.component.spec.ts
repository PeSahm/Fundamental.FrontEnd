import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExtraAnnualAssemblyListComponent } from './extra-annual-assembly-list.component';

describe('ExtraAnnualAssemblyListComponent', () => {
  let component: ExtraAnnualAssemblyListComponent;
  let fixture: ComponentFixture<ExtraAnnualAssemblyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraAnnualAssemblyListComponent ]
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
