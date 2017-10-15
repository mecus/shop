import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from "../../../authentications/authentication.service";
import { TempOrderService } from "../../../services/temp-order.service";
import { OrderService } from "../../../services/order.service";
import { AccountService } from '../../../services/account.service';
import { StorageService } from '../../../services/storage.service';
import { PaymentService } from "../../../services/payment.service";
import { WindowService } from "../../../services/window.service";
import { CartService } from "../../../services/cart.service";
import * as _ from 'lodash';
import { ProgressService } from '../../../services/checkout-progress.service';

@Component({
  selector: 'app-payment',
  templateUrl: 'payment.component.html',
  styleUrls: ['payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  order;
  address;
  document;
  grayPage;
  declineMsg;
  acceptedMsg;
  processMsg:string;
  status:string = "unknown";
  constructor(private orderService:OrderService, 
    private accountService:AccountService, private authService:AuthService,
    private storeService:StorageService, private paymentService:PaymentService,
    private windowService:WindowService, private tempOrderService:TempOrderService,
    private cartService:CartService, private progressService:ProgressService) { 
      this.document = windowService.getDocumentRef();
  }
  finishOrder(pay, c_id, ord_no){
    this.grayPage = true;

    let payment = {
      amount: pay,
      customer_no: c_id,
      order_no: ord_no,
      token: null,
      payment_method: null,
      deviceData: this.storeService.retriveData('deviceData') || ""
    }
    // console.log(payment);
    this.tempOrderService.getTempOrder(this.storeService.retriveData('user')['uid'])
    .subscribe((temporder)=>{
      payment.token = temporder.token;
      payment.payment_method = temporder.payment_method;
      this.runPaymentOrder(payment);
    });

  }
  runPaymentOrder(payobject){
    let final = {name: "finish"};
    this.paymentService.paymentTransaction(payobject)
    .subscribe((response)=>{
      if(response.success == 'true' || response.success == true){
         //Do cleanup here
        // this.cleanUp();
        this.progressService.setProgress(final);
        let result = this.document.querySelector('.payment-completed');
        let container = this.document.querySelector('.main-container');
        this.windowService.getWindowObject().setTimeout(()=>{
          this.grayPage = false;
          result.style.display = "block";
          container.style.display = "none";
          this.status = response.payment_status;
          this.acceptedMsg = "Thanks for completing your order, payment has been taken from your account."
        }, 3000)
        console.log(response);
      }else if(response.success == 'false' || response.success == false){
        let result = this.document.querySelector('.payment-completed');
        let container = this.document.querySelector('.main-container');
        this.windowService.getWindowObject().setTimeout(()=>{
          this.grayPage = false;
          result.style.display = "block";
          container.style.display = "none";
          this.processMsg = response.message || null;
          this.status = response.payment_status;
          this.declineMsg = "Your payment was delined.. please try again possibly with a different payment method";
          
        }, 3000)

      }else{
        return null; //do something here
      }
     
    });
    return false;
  }
  getOrders(){
    //Retrieve the last order associated to the customer
    this.accountService.getAccount(this.storeService.retriveData('user')['email']).subscribe((account)=>{
      this.orderService.getOrders(account.ac_no).subscribe((orders)=>{
        if(orders){this.order = _.last(orders);}
        console.log(orders);
        this.accountService.getAddress(account._id).subscribe((address)=>{
          this.address = address.filter(add=>add.address_type == "delivery")[0];
          // console.log(this.address)
        })
      })
    }) 
  }
  ngOnInit() {
   this.getOrders();
  }
  ngAfterViewInit(){
   
  }
  cleanUp(){
    //delete tempoder
    //delete cart items
    //remove token from local storage
    //delete progress service
    this.tempOrderService.deleteTemOrder(this.storeService.retriveData('user')['uid'])
      .then((res)=>{
        console.log("Deleting TempOrder");
        this.cartService.removeBatchCart(this.storeService.retriveData('postcode'));
        this.storeService.cleardata('token');
        this.storeService.cleardata('deviceData');
        // this.progressService.deleteProgress();
      },(err)=>console.log(err));
  }

}
