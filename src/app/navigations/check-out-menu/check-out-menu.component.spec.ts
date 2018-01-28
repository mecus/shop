import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckOutMenuComponent } from './check-out-menu.component';

describe('CheckOutMenuComponent', () => {
  let component: CheckOutMenuComponent;
  let fixture: ComponentFixture<CheckOutMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckOutMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckOutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
