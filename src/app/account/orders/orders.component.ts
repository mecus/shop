import { Component, OnInit } from '@angular/core';
import { OrderService } from "../../services/order.service";
import { AccountService } from "../../services/account.service";
import { AuthService } from "../../authentications/authentication.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'customer-order',
    templateUrl: 'orders.component.html',
    styleUrls: ['order.component.scss']

})

export class OrdersComponent implements OnInit {
    orders$:Observable<any>;
    constructor(
        private orderService:OrderService, private accountService:AccountService,
        private authService:AuthService){}
    step = 0;
    
    setStep(index: number) {
    this.step = index;
    }

    nextStep() {
    this.step++;
    }

    prevStep() {
    this.step--;
    }
    
    getOrder(){
       this.orders$ = this.authService.authState().switchMap((user)=>{
            return this.accountService.getAccount(user.email).switchMap((account)=>{
                return this.orderService.getOrders(account.ac_no);
            })
        });
    }
    ngOnInit(){
        this.getOrder();
    }
}