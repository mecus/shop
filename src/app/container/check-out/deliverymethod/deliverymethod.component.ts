import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { TempOrderService } from "../../../services/temp-order.service";
import { AuthService } from "../../../authentications/authentication.service";
// import { TempOrderType } from "../../../models/tempOrder.model";
import { AccountService } from "../../../services/account.service";
import * as _ from 'lodash';
import { StorageService } from "../../../services/storage.service";
import { ProgressService } from '../../../services/checkout-progress.service';

@Component({
  selector: 'delivery-method',
  templateUrl: 'delivery.component.html',
  styleUrls: ['delivery.component.scss']
})

export class DeliveryMethodComponent implements OnInit {
    trueAddress:boolean = false; trueMsg:string;
    currentUser;
    certify:boolean = false;
    address;
    address2;
    postCode;
    deliveryForm;
    selectAddress;
    errorMsg;
    toggles:boolean = false;
    tempOrder;
    notify;
    grayPage;
    billingAddresses;
    constructor(private _fb:FormBuilder, private tempOrderService:TempOrderService,
    private authService:AuthService, private _router:Router, private accountService:AccountService,
    private storeService:StorageService, private progressService:ProgressService){
      this.deliveryForm = _fb.group({
        full_name: null,
        address: null,
        address2: null,
        city: null,
        post_code: null,
        country: "United Kingdom"
      })
    }
  //Set billing address as delivery address
  useAsdevivery(check){
    console.log(check);
    if(this.billingAddresses && check){
      console.log(check); 
      this.deliveryForm.patchValue({
        full_name: this.billingAddresses.full_name,
        address: this.billingAddresses.address,
        address2: this.billingAddresses.address2,
        city: this.billingAddresses.city,
        post_code: this.billingAddresses.post_code,
        country: this.billingAddresses.country
  
      });
    }

    // let dom = document.querySelector('button[type="submit"]');
    // dom.setAttribute('submit', 'true');
  }
  //After every condition is met then go to order page
  goToOrder(){
    let delivery = { name: "delivery"}
      if(_.isNaN(this.tempOrder.ground_total) || _.isNull(this.tempOrder.ground_total) || this.tempOrder.ground_total == NaN){
        this.trueMsg = "Please select delivery method from the one listed above..";

      }else if(this.trueAddress == true){
        this.progressService.setProgress(delivery);
        return this._router.navigate(["/place_order"]);
      }else{
        return this.trueMsg = "please make sure you have fill in the delivery address and also select delivery method"
      }
  }
  //Saving temp order address to firebase
  deliveryAddress(address){
    this.grayPage = true;
    // console.log(this.currentUser);
    if(!address.full_name){
      this.errorMsg = "Please fill in all required feild";
      this.grayPage = false;
      return;
    }
    let temOrder = {
      // userid: this.currentUser.uid,
      delivery_address: {
        full_name: address.full_name,
        address: address.address,
        address2: address.address2 || null,
        city: address.city,
        post_code: address.post_code,
        country: address.country
      }
    }

    if(this.currentUser){
    // this.temOrder.userid = this.currentUser.uid;
    this.tempOrderService.updateTempOrder(this.currentUser.uid, temOrder);
    this.toggles = false;
    setTimeout(()=>{
      this.notify = true;
      this.grayPage = false;
    }, 1000)
    }else{
      console.log("User must be logged In");
      this.grayPage = false;
    }
  }

  editAddress(){
    if(this.toggles){
      this.toggles = false;
    }else{
      this.toggles = true;
    }

  }
  addressFound(event){
    this.address = event.addresPick;
    this.postCode = event.postCode;
    this.deliveryForm.patchValue({
      address: event.addresPick,
      post_code: event.postCode
    })
  }
  //Retrieve temp order from firebase
  getDeliveryAddress(){
      this.tempOrderService.getTempOrder(this.currentUser.uid).subscribe((address)=>{
        if(address){
          console.log(address['delivery_option']);
          this.selectAddress = address['delivery_address'];
          this.toggles = true; //address['delivery_address'];
          if(address['delivery_address'] && address['delivery_option']){
            this.certify = true;
          }else{ this.certify = false; }
          if(address['delivery_address']){
            this.trueAddress = true;
            this.deliveryForm.patchValue({
              full_name: address['delivery_address'].full_name,
              address: address['delivery_address'].address,
              address2: address['delivery_address'].address2,
              city: address['delivery_address'].city,
              post_code: address['delivery_address'].post_code,
              country: address['delivery_address'].country
            })
          }else{
            alert("You can now load address from the server");
          }

        }
      })
  }
  //Checking for existence on delivery addresses
  checkForExistingAddress(){
    this.accountService.getAccount(this.storeService.retriveData('email'))
      .subscribe((account)=>{
        this.accountService.getAddress(account._id).subscribe((addresses)=>{
          this.selectAddress =_.last(_.filter(addresses, {"address_type":"delivery"}));
          this.billingAddresses = _.last(_.filter(addresses, {"address_type":"billing"}));
          if(!this.selectAddress){
            console.log("No Old address found");
            this.getDeliveryAddress();
          }
          if(this.selectAddress){
            this.toggles = true;
            this.trueAddress = true;
            this.notify = true;
            this.deliveryForm.patchValue({
              full_name: this.selectAddress.full_name,
              address: this.selectAddress.address,
              address2: this.selectAddress.address2,
              city: this.selectAddress.city,
              post_code: this.selectAddress.post_code,
              country: this.selectAddress.country
            })
          }
        })
      });
  }
  ngOnInit(){
    // this.getDeliveryAddress();
    
      this.authService.authState().subscribe((user)=>{
        if(user){
          this.currentUser = user;
          this.checkForExistingAddress();
          
          this.tempOrderService.getTempOrder(user.uid).subscribe((order)=>{
            if(order){
              this.tempOrder = order;
              this.notify = true;
            }else{
              this.notify = false;
            }
          })
        }else{
          console.log("No user logged in");
          this._router.navigate(["/login"]);
        }
      });

  }

}