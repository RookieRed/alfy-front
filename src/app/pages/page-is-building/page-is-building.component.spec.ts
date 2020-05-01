import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageIsBuildingComponent} from './page-is-building.component';

describe('PageIsBuildingComponent', () => {
  let component: PageIsBuildingComponent;
  let fixture: ComponentFixture<PageIsBuildingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PageIsBuildingComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageIsBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
