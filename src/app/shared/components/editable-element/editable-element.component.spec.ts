import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableElementComponent } from './editable-element.component';

describe('EditableElementComponent', () => {
  let component: EditableElementComponent;
  let fixture: ComponentFixture<EditableElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditableElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
