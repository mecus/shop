import { Component, OnInit, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { WindowService } from '../../services/window.service';
import { StorageService } from '../../services/storage.service';
import { AccountService } from '../../services/account.service';
import { PaymentService } from '../../services/payment.service';
import * as _ from 'lodash';


@Component({
  selector: 'app-account-setting',
  templateUrl: 'account-setting.component.html',
  styleUrls: ['account-setting.component.scss']
})
export class AccountSettingComponent implements OnInit, OnChanges {
  userAccount;
  userAddress;
  deliveryAddress;
  pInfoEdit;
  addressEdit;
  datacard:boolean = false;
  accountID;
  accountIDE;
  showPersonalInfo:boolean;
  updatedNotify;
  addNewCard: boolean = false;
  customerID;
  card;paypal;
  changePassword:boolean = false;
  constructor(private accountService:AccountService, 
    private storeService:StorageService, private windowService:WindowService,
    private paymentService:PaymentService) {
    
    this.getAccount();
  }
  getAccount(){
    this.accountService.getAccount(this.storeService.retriveData('email')).subscribe((account)=>{
      console.log(account);
      if(account){
        this.getPaymentMethod(account);
        this.userAccount = account;
        this.customerID = account.ac_no;
        this.accountService.getAddress(account._id).subscribe((addresses)=>{
          this.userAddress = _.last(_.filter(addresses, {"address_type":"billing"}));
          this.deliveryAddress = _.last(_.filter(addresses, {"address_type":"delivery"}));
          console.log(this.deliveryAddress);
        });
      }
    });
  }
  addCardDetail(){
    this.addNewCard = (this.addNewCard == false? true : false);
  }
  passwordChange(){
    this.changePassword = (this.changePassword == false? true : false);
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
  getPaymentMethod(account){
      this.paymentService.fetchCard(account.ac_no).subscribe((pmethod)=>{
        // console.log(pmethod);
      this.card = _.last(pmethod.card);
      this.paypal = _.last(_.take(pmethod.paypal));
      let ld = _.last(_.take(pmethod.paypal));
      // console.log(ld);
    });

  }
  ngOnInit() {
  }
  ngOnChanges(){

  }


}
