import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksPublishedFormComponent } from './links-published-form.component';

describe('LinksPublishedFormComponent', () => {
  let component: LinksPublishedFormComponent;
  let fixture: ComponentFixture<LinksPublishedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksPublishedFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksPublishedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
