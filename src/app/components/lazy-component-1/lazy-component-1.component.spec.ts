/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LazyComponent-1Component } from './lazy-component-1.component';

describe('LazyComponent-1Component', () => {
  let component: LazyComponent-1Component;
  let fixture: ComponentFixture<LazyComponent-1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyComponent-1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyComponent-1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
