import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService } from "../../../services/account.service";
import { StorageService } from "../../../services/storage.service";
import { PaymentService } from "../../../services/payment.service";
import { AuthService } from "../../../authentications/authentication.service";
import { Router } from "@angular/router";
import { CartService } from "../../../services/cart.service";
import { OrderService } from "../../../services/order.service";
import { TempOrderService } from "../../../services/temp-order.service";
import { WindowService } from "../../../services/window.service";
import * as _ from 'lodash';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  ordForm;
  document;
  grayPage;
  user;
  existingOrder;
  saveProg = new Array();
  constructor(private accountService:AccountService, private authService:AuthService, 
    private storeService:StorageService, private _fb:FormBuilder, private _router:Router,
    private paymentService:PaymentService, private windowService:WindowService, private cartService:CartService,
    private tempOrderService:TempOrderService, private orderService:OrderService) { 
      this.document = this.windowService.getDocumentRef();
      this.orderForm();
    }
    orderForm(){
      this.ordForm = this._fb.group({
        order_no: null,
        customer_name: null,
        customer_no: null,
        account_id: null,
        amount: null,
        note: null,
        email: null,
        telephone:null,
        delivery_method: null,
        status: null,
        ip_address: null
      })
    }


  //Craeting Customer Order here
  createOrder(order){
    //Checking for existing order status
    // if(this.existingOrder.status == 'pending' || null){
    //   alert('Pending Order');
    //   return;
    // }
  
    this.grayPage = true;
    //Generate Order number
    let order_no = order.customer_no * 100 + Math.floor((Math.random() * 10) + 1);
    let nowDate = Date.now().toString().slice(8);//5 digit
    let cm_no = order_no.toString().slice(5);//7 digit
    order.order_no = 9+nowDate+cm_no;
    // console.log(order);
    this.orderService.postOrder(order).subscribe((res)=>{
      //get temp order address to be saved in the permanent database
      if(res){
        this.tempOrderService.updateTempOrder(this.user.uid, {return_orderId: res.order_no});
        this.accountService.getAccount(this.user.email).subscribe((account)=>{
          this.tempOrderService.getTempOrder(this.user.uid).subscribe((tempO)=>{
            if(tempO.delivery_address){
              let address = {
                full_name: tempO.delivery_address.full_name,
                address: tempO.delivery_address.address,
                post_code: tempO.delivery_address.post_code,
                city: tempO.delivery_address.city,
                country: tempO.delivery_address.country,
                address_type: "delivery",
                customer_id: account.ac_no,
                account_id: account._id
              }
              // console.log(address);
              this.accountService.postAddress(address);
            }
          });
        });
      
        this.cartService.getCart().subscribe((carts)=>{
          let Carts = carts.filter(cart=>cart.postcode == this.storeService.retriveData('postcode'));
          //Call Create Order Items function here to create individual item
            Carts.forEach((item)=>{
              let itemToSave = {
                order_no: res.order_no,
                order_id: res.order_id,
                name: item.name,
                price: item.price,
                qty: item.qty,
                image: item.imageUrl,
                product_id: item.product_id
              }
              // console.log(itemToSave);
              this.orderService.createOrderItems(itemToSave)
              .subscribe((data)=>{
                this.saveProg.push(data);
                
              });
            })
        });
      }//If res ends here
    });

    //Don't forget to delete the carts associated to the order
    setTimeout(()=>{
      this.grayPage = false;
      console.log(this.saveProg);
        this._router.navigate(["/review_and_payment"]);
    }, 5000);
  
  }

  patchOrderForm(){
    this.authService.authState().subscribe((user)=>{
      if(user){
        this.accountService.getAccount(user.email)
        .subscribe((account)=>{
          // console.log(account);
          this.ordForm.patchValue({
            customer_name: account.first_name+ " " +account.last_name,
            email: account.email,
            account_id: account._id,
            customer_no: account.ac_no,
            telephone: account.telephone.mobile,
            status: "pending"
          })
        });

        this.tempOrderService.getTempOrder(user.uid)
        .subscribe((temporders)=>{
          console.log(temporders.token);
          this.ordForm.patchValue({
            amount: temporders.ground_total,
            delivery_method: temporders.delivery_option.method,
            ip_address: this.storeService.retriveData('ip')
          })
        });

        
      }
      
    })
  }
  getCurrentUser(){
    this.authService.authState().subscribe((user)=>{
      this.user = user;
    })
  }
  ngOnInit() {
    this.patchOrderForm();
    this.getCurrentUser();
    
    setTimeout(()=>{
      this.getExistingOrder();
    }, 1000);
     //query order with customer no
    // this.orderService.getOrders("655706564").subscribe((orders)=>{
    //   console.log(orders);
    // });
  }
  getExistingOrder(){
    this.accountService.getAccount(this.user.email).subscribe((account)=>{
      this.orderService.getOrders(account.ac_no).subscribe((orders)=>{
        this.existingOrder = _.last(_.filter(orders, {"status": "pending"}));
      });
    });
  }
}
