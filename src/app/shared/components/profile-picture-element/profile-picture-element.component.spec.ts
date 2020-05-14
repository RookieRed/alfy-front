import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePictureElementComponent } from './profile-picture-element.component';

describe('ProfilePictureElementComponent', () => {
  let component: ProfilePictureElementComponent;
  let fixture: ComponentFixture<ProfilePictureElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePictureElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePictureElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
