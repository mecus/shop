import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetLeftComponent } from './widget-left.component';

describe('WidgetLeftComponent', () => {
  let component: WidgetLeftComponent;
  let fixture: ComponentFixture<WidgetLeftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetLeftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
