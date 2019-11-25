import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutPicturesFormDialogComponent } from './about-pictures-form-dialog.component';

describe('AboutPicturesFormDialogComponent', () => {
  let component: AboutPicturesFormDialogComponent;
  let fixture: ComponentFixture<AboutPicturesFormDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutPicturesFormDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutPicturesFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
