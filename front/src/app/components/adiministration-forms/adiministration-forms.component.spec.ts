import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdiministrationFormsComponent } from './adiministration-forms.component';

describe('AdiministrationFormsComponent', () => {
  let component: AdiministrationFormsComponent;
  let fixture: ComponentFixture<AdiministrationFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdiministrationFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdiministrationFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
