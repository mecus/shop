import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AccountService } from "../../../services/account.service";
import { Router } from '@angular/router';

@Component({
  selector: 'account-edit',
  templateUrl: 'account-edit.component.html',
  styleUrls: ['account-edit.component.scss']
})
export class AccountInfoEditComponent implements OnInit, OnChanges {
  @Input() acId;
  @Output() notify:EventEmitter<string> = new EventEmitter<string>();
  acInfo:FormGroup;
  constructor(private _fb:FormBuilder, private accountService:AccountService,
  private _router:Router) {
    this.acInfo = _fb.group({
      id: null,
      first_name: "",
      last_name: null,
      email: null,
      telephone: _fb.group({
        home: null,
        mobile: null
      })
    })
   }

  ngOnInit() {
  }
  updateAccount(update){
    // console.log(update);
    let id = update.id;
    let account = {
      first_name: update.first_name,
      last_name: update.last_name,
      email: update.email,
      telephone:{
        home: update.telephone.home,
        mobile: update.telephone.mobile
      }
    }
    // this.notify.emit("updated");
    this.accountService.updateAccount(account, update.id)
      .subscribe((response)=>{
        console.log(response);
        this.notify.emit("your information was updated");
      })
  }
  ngOnChanges(acId){
    this.accountService.getAccount(this.acId).subscribe((account)=>{
      // console.log(account);
      this.acInfo.patchValue({
        id: account._id,
        first_name: account.first_name,
        last_name: account.last_name,
        email: account.email,
        telephone: {
          home: account.telephone.home,
          mobile: account.telephone.mobile
        }
      })
    })
  }
}
