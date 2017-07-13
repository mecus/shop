import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideAdComponent } from './side-ad.component';

describe('SideAdComponent', () => {
  let component: SideAdComponent;
  let fixture: ComponentFixture<SideAdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideAdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
