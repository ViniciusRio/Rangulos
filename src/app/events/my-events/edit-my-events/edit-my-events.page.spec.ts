import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyEventsPage } from './edit-my-events.page';

describe('EditMyEventsPage', () => {
  let component: EditMyEventsPage;
  let fixture: ComponentFixture<EditMyEventsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyEventsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
