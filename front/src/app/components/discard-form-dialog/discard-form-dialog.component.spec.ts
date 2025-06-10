import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscardFormDialogComponent } from './discard-form-dialog.component';

describe('DiscardFormDialogComponent', () => {
  let component: DiscardFormDialogComponent;
  let fixture: ComponentFixture<DiscardFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiscardFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiscardFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
