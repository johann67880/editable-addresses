/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LazyComponent1Component } from './lazy-component-1.component';

describe('LazyComponent-1Component', () => {
  let component: LazyComponent1Component;
  let fixture: ComponentFixture<LazyComponent1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyComponent1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyComponent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('lazy loading component is created', () => {
    expect(component).toBeTruthy();
  });
});
