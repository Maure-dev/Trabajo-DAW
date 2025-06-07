import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrationFormsComponent } from './administration-forms.component';

describe('AdministrationFormsComponent', () => {
  let component: AdministrationFormsComponent;
  let fixture: ComponentFixture<AdministrationFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministrationFormsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdministrationFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
