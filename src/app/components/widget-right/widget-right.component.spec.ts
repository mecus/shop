import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetRightComponent } from './widget-right.component';

describe('WidgetRightComponent', () => {
  let component: WidgetRightComponent;
  let fixture: ComponentFixture<WidgetRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
