import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricPage } from './historic.page';

describe('HistoricPage', () => {
  let component: HistoricPage;
  let fixture: ComponentFixture<HistoricPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
