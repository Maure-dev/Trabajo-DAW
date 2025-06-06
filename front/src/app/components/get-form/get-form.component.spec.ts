import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFormComponent } from './get-form.component';

describe('GetFormComponent', () => {
  let component: GetFormComponent;
  let fixture: ComponentFixture<GetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
