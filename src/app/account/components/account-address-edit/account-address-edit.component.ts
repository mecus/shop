import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AccountService } from "app/services/account.service";

@Component({
  selector: 'account-address-edit',
  templateUrl: './account-address-edit.component.html',
  styleUrls: ['./account-address-edit.component.scss']
})
export class AccountAddressEditComponent implements OnInit, OnChanges {
  @Input() acId;
  @Output() notify:EventEmitter<string> = new EventEmitter<string>();
  addForm:FormGroup;
  constructor(private _fb:FormBuilder, private accountService:AccountService) { 
    this.addForm = _fb.group({
      id: null,
      address: null,
      address2: null,
      city: null,
      post_code: null,
      country: null
    })
  }

  ngOnInit() {
  }
  updateAddress(update){
    let address = {
      address: update.address,
      address2: update.address2,
      city: update.city,
      post_code: update.post_code,
      country: update.country
    }

    this.accountService.updateAddress(update.id, address)
      .subscribe((update)=>{
        this.notify.emit("your information was updated");
      })
  }
  ngOnChanges(acId){
    this.accountService.getAddress(this.acId).subscribe((address)=>{
      // console.log(account);
      let res = address[0];
      this.addForm.patchValue({
        id: res._id,
        address: res.address,
        address2: res.address2,
        city: res.city,
        post_code: res.post_code,
        country: res.country
      })
    })
  }
}
