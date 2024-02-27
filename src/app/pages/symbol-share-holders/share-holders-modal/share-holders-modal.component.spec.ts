import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareHoldersModalComponent } from './share-holders-modal.component';

describe('ShareHoldersModalComponent', () => {
  let component: ShareHoldersModalComponent;
  let fixture: ComponentFixture<ShareHoldersModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShareHoldersModalComponent]
    });
    fixture = TestBed.createComponent(ShareHoldersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
