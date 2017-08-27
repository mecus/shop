import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WindowService } from 'app/services/window.service';
import { StorageService } from 'app/services/storage.service';
import { AccountService } from 'app/services/account.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-account-setting',
  templateUrl: './account-setting.component.html',
  styleUrls: ['./account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit, OnChanges {
  userAccount;
  userAddress;
  pInfoEdit;
  addressEdit;
  datacard:boolean = false;
  accountID;
  accountIDE;
  showPersonalInfo:boolean;
  updatedNotify;
  addNewCard: boolean = false;
  customerID;
  constructor(private accountService:AccountService, 
    private storeService:StorageService, private windowService:WindowService) {
    
    this.getAccount();
  }
  getAccount(){
    this.accountService.getAccount(this.storeService.retriveData('user')['email']).subscribe((account)=>{
      // console.log(account);
      this.userAccount = account;
      this.customerID = account.ac_no;
      this.accountService.getAddress(account._id).subscribe((addresses)=>{
        this.userAddress = _.last(_.filter(addresses, {"address_type":"billing"}));
      });
    });
  }
  addCardDetail(){
    this.addNewCard = true;
    let donE = this.windowService.getDocumentRef().querySelector('#cardButton');
    donE.style.display = "none";
  }
  pInfoEditForm(email){
    if(!this.pInfoEdit){
      this.pInfoEdit = true;
      this.addressEdit = false;
      this.accountIDE = email;
      this.showPersonalInfo = true;
    }else{
      this.pInfoEdit = false;
      this.addressEdit = false;
      this.showPersonalInfo = false;
    }
    
  }
  addressEditForm(accountId){
    if(!this.addressEdit){
      this.accountID = accountId;
      this.addressEdit = true;
      this.datacard = true;
      this.pInfoEdit = false;
      this.showPersonalInfo = false;
    }else{
      this.addressEdit = false;
      this.pInfoEdit = false;
      this.datacard = false;
    }
  }
  onInfoUpdate(event){
    this.getAccount();
    this.pInfoEdit = false;
    this.showPersonalInfo = false;

    setTimeout(()=>{this.updatedNotify = event;},500);
    
  }
  onAddressUpdate(event){
    this.getAccount();
    this.addressEdit = false;
    this.datacard = false;
    this.updatedNotify = event;
    setTimeout(()=>{this.updatedNotify = false;},500);
    
  }
  ngOnInit() {
  }
  ngOnChanges(){

  }

}
