import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { TempOrderService } from "../../../services/temp-order.service";
import { AuthService } from "../../../authentications/authentication.service";
import { TempOrder, tempOtype } from "../../../models/tempOrder.model";
import { AccountService } from "../../../services/account.service";
import * as _ from 'lodash';
import { StorageService } from "../../../services/storage.service";

@Component({
  selector: 'delivery-method',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})

export class DeliveryMethodComponent implements OnInit {
    trueAddress:boolean = false; trueMsg:string;
    user;
    certify:boolean = false;
    address;
    address2;
    postCode;
    deliveryForm;
    selectAddress;
    errorMsg;
    toggles:boolean = false;
    temOrder;
    notify;
    grayPage;
    addresses;
    constructor(private _fb:FormBuilder, private tempOrderService:TempOrderService,
    private authService:AuthService, private _router:Router, private accountService:AccountService,
    private storeService:StorageService){
      this.deliveryForm = _fb.group({
        full_name: null,
        address: null,
        address2: null,
        city: null,
        post_code: null,
        country: "United Kingdom"
      })
    }
  useAsdevivery(check){
    console.log(check);
    this.authService.authState().subscribe((user)=>{
      this.user = user;
      
      this.accountService.getAccount(user.email).subscribe((account)=>{
        this.accountService.getAddress(account._id).subscribe((address)=>{
          this.addresses = _.last(_.filter(address, {"address_type":"billing"}));
          // console.log(this.addresses);
          this.deliveryForm.patchValue({
            full_name: this.addresses.full_name,
            address: this.addresses.address,
            address2: this.addresses.address2,
            city: this.addresses.city,
            post_code: this.addresses.post_code,
            country: this.addresses.country

          });
          // let dom = document.querySelector('button[type="submit"]');
          // dom.setAttribute('submit', 'true');
        });
      });
    })
  }
  goToOrder(){
    this.tempOrderService.getTempOrder(this.user.uid).subscribe((torder)=>{
      if(_.isNaN(torder.ground_total) || _.isNull(torder.ground_total)){
        this.trueMsg = "Please select delivery method from the one listed above..";
        return;
      }else if(this.trueAddress == true){
        return this._router.navigate(["/place_order"]);
      }else{
        return this.trueMsg = "please make sure you have fill in the delivery address and also select delivery method"
      }
    });
    
  }
  deliveryAddress(address){
    this.grayPage = true;
    // console.log(dAddress);
    if(!address.full_name){
      this.errorMsg = "Please fill in all required feild";
      this.grayPage = false;
      return;
    }
    this.temOrder = {
      userid: "",
      delivery_address: {
        full_name: address.full_name,
        address: address.address,
        address2: address.address2 || null,
        city: address.city,
        post_code: address.post_code,
        country: address.country
      }
    }
    this.authService.authState().subscribe((state)=>{
           if(state){
            this.temOrder.userid = state.uid;
            this.tempOrderService.updateTempOrder(state.uid, this.temOrder);
            this.toggles = false;
            setTimeout(()=>{
              this.notify = true;
              this.grayPage = false;
            }, 1000)
           }else{
             console.log("User must be logged In");
             this.grayPage = false;
           }
       })
    
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
  getDeliveryAddress(){
    this.authService.authState().subscribe((user)=>{
      this.user = user;
      this.tempOrderService.getTempOrder(user.uid).subscribe((address)=>{
        this.selectAddress = address.delivery_address;
        this.toggles = address.delivery_address;
        if(address.delivery_address && address.delivery_option){
          this.certify = true;
        }else{ this.certify = false; }
        if(address.delivery_address){
          this.trueAddress = true;
          this.deliveryForm.patchValue({
            full_name: address.delivery_address.full_name,
            address: address.delivery_address.address,
            address2: address.delivery_address.address2,
            city: address.delivery_address.city,
            post_code: address.delivery_address.post_code,
            country: address.delivery_address.country
          })
        }else{
          // alert("You can now load address from the server");
        }
      })
      
    })
  }
  //Checking for existence on delivery addresses
  checkForExistingAddress(){
    this.accountService.getAccount(this.storeService.retriveData('email'))
      .subscribe((account)=>{
        this.accountService.getAddress(account._id).subscribe((addresses)=>{
          this.selectAddress =_.last(addresses.filter(address=>address.address_type == "delivery"));
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
    this.checkForExistingAddress();
      this.authService.authState().subscribe((user)=>{
        this.user = user;
        this.tempOrderService.getTempOrder(user.uid).subscribe((order)=>{
          if(order.delivery_option){
            this.notify = true;
          }else{
            this.notify = false;
          }
        })
      })

  }

}