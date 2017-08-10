import { Component, OnInit } from '@angular/core';
import { iCart } from "../../../models/cart.model";
import { Observable } from "rxjs/Observable";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "app/services/storage.service";

@Component({
    selector: 'cart-total',
    template: `
    
            <span>{{totalPrice | currency: "GBP" :true}}</span>
           
    `,
    styles: ['']
})
export class CartTotalComponent implements OnInit {
    cart$:Observable<iCart>;
    totalPrice;

    constructor(private storeService:StorageService, private cartService:CartService){
        
       this.getCatTotal();
    }

    getCatTotal(){
        this.cartService.cartTotal().subscribe((carts)=>{
        let total = carts.filter(cart=> cart.postcode == this.storeService.retriveData('postcode'))
        .map(cart=>cart.qty * Number(cart.price));
        this.totalPrice = total.reduce(this.reducePrice, 0).toFixed(2);
        });
    }
    reducePrice(sum, num){
        return sum + num;
        
    }
    ngOnInit(){
        
    }

}