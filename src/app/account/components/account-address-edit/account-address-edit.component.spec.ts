import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountAddressEditComponent } from './account-address-edit.component';

describe('AccountAddressEditComponent', () => {
  let component: AccountAddressEditComponent;
  let fixture: ComponentFixture<AccountAddressEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountAddressEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountAddressEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
