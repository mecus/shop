import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { TempOrderService } from "app/services/temp-order.service";
import { AuthService } from "app/authentications/authentication.service";

@Component({
  selector: 'delivery-method',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})

export class DeliveryMethodComponent implements OnInit {
    certify:boolean = false;
    address;
    address2;
    postCode;
    deliveryForm;
    selectAddress;
    errorMsg;
    toggles:boolean = false;
    constructor(private _fb:FormBuilder, private tempOrderService:TempOrderService,
    private authService:AuthService, private _router:Router){
      this.deliveryForm = _fb.group({
        full_name: null,
        address: null,
        address2: null,
        city: null,
        post_code: null,
        country: "United Kingdom"
      })
    }
  goToPaymentMethod(){
    this._router.navigate(["/payment_method"]);
  }
  deliveryAddress(address){
    // console.log(dAddress);
    if(!address.full_name){
      this.errorMsg = "Please fill in all required feild"
      return;
    }
    let temOrder = {
      userid: "",
      delivery_address: {
        full_name: address.full_name,
        address: address.address,
        address2: address.address2,
        city: address.city,
        post_code: address.post_code,
        country: address.country
      }
    }
    this.authService.authState().subscribe((state)=>{
           if(state){
            temOrder.userid = state.uid;
            this.tempOrderService.createTempOrder(state.uid, temOrder);
            this.toggles = false;
           }else{
             console.log("User must be logged In");
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
      this.tempOrderService.getTempOrder(user.uid).subscribe((address)=>{
        this.selectAddress = address.delivery_address;
        this.toggles = address.delivery_address;
        if(address.delivery_address && address.delivery_option){
          this.certify = true;
        }else{ this.certify = false; }
        if(address.delivery_address){
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
    ngOnInit(){
      this.getDeliveryAddress();
    }
}