import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoEditComponent } from './account-info-edit.component';

describe('AccountEditComponent', () => {
  let component: AccountInfoEditComponent;
  let fixture: ComponentFixture<AccountInfoEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountInfoEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
