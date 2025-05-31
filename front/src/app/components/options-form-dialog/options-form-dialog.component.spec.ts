import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFormDialogComponent } from './options-form-dialog.component';

describe('OptionsFormDialogComponent', () => {
  let component: OptionsFormDialogComponent;
  let fixture: ComponentFixture<OptionsFormDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsFormDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
