import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiePrivacyComponent } from './cookie-privacy.component';

describe('CookiePrivacyComponent', () => {
  let component: CookiePrivacyComponent;
  let fixture: ComponentFixture<CookiePrivacyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CookiePrivacyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiePrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
