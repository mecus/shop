import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../../services/account.service';
import { StorageService } from '../../../services/storage.service';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from "../../../services/payment.service";
import { WindowService } from "../../../services/window.service";
import { AuthService } from "../../../authentications/authentication.service";
import { TempOrderService } from "../../../services/temp-order.service";
import { OrderService } from "../../../services/order.service";
import { CartService } from "../../../services/cart.service";
import { TempOrder, tempOtype } from "../../../models/tempOrder.model";
import * as _ from 'lodash';
import { ProgressService } from '../../../services/checkout-progress.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: 'payment-method.component.html',
  styleUrls: ['payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit, AfterViewInit {
  document;
  paymentMethod;
  userId;
  user;
  paymentAdded;
  grayPage;
  cardform;
  card;
  notice:string;
  paypal;
  temporder:tempOtype;
  constructor(private accountService:AccountService, private authService:AuthService, 
    private storeService:StorageService, private _fb:FormBuilder, private _router:Router,
    private paymentService:PaymentService, private windowService:WindowService, private cartService:CartService,
    private tempOrderService:TempOrderService, private orderService:OrderService, private progressService: ProgressService) {
      this.document = this.windowService.getDocumentRef();
      this.temporder = {
        userid: null,
        delivery_address: {
          full_name: null,
          address: null,
          address2: null,
          city: null,
          post_code: null,
          country: null
        },
        delivery_method: {
          method: null,
          price: null
        },
        payment_method: null,
        token: null,
        ground_total: null
      }
     }
  @HostListener('change', ['$event']) selectedMethod($event){
    $event.preventDefault;
    if($event){
      this.authService.authState().subscribe((state)=>{
        if(state){
          if($event.value == "paypal"){
            this.temporder.userid = state.uid;
            this.temporder.payment_method = $event.value;
            this.temporder.token = this.paypal.token;
            this.paymentMethod = true;
          }else if($event.value == "card"){
            this.temporder.userid = state.uid;
            this.temporder.payment_method = $event.value;
            this.temporder.token = this.card.token;
            this.paymentMethod = true;
          }
        
        // console.log(this.temporder);
        this.tempOrderService.createTempOrder(state.uid, this.temporder);
        }else{
          console.log("User must be logged In");
        }
    })
    }
    // console.log($event);
  }
  paymentMethodResult(event){
    console.log(event);
    this.paymentAdded = "Your payment method was successfully added, select it to continue";
    this.checkForCardPresent(this.user.email);
  }

  showCardForm(){
    let cardform = this.document.querySelector('#pay-card');
    if(cardform.style.display == "block"){
      cardform.style.display = "none";
    }else{
      cardform.style.display = "block";
    }
    
  }
  goToDeliveryMethod(){
    let paymethod = {name: 'payment'}
    if(this.paymentMethod == true){
      this._router.navigate(["/delivery_method"]);
      this.progressService.setProgress(paymethod);
    }else{
      this.notice = "Please select payment method to proceed"
    }
  }

  ngOnInit() {
    this.authService.authState().subscribe((user)=>{
      if(!user){return null;}
      this.userId = user.uid;
      this.user = user;
      this.checkForCardPresent(user.email);
    })
  }
  ngAfterViewInit(){

  }
 
  checkForCardPresent(email){
    this.accountService.getAccount(email)
    .subscribe((account)=>{
       this.paymentService.fetchCard(account.ac_no).subscribe((pmethod)=>{
        this.card = _.last(pmethod.card);
        this.paypal = _.last(_.take(pmethod.paypal));
        let ld = _.last(_.take(pmethod.paypal));
        // console.log(ld);
      });
    })
    
  }
}
