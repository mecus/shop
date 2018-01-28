import { Component, OnInit} from '@angular/core';
import { Observable } from "rxjs/Observable";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";
import { Store } from '@ngrx/store';
import { Cart } from '../../../store-management/models/cart.model';

@Component({
    selector: 'cart-total',
    templateUrl: 'carts/cart.total.component.html'
})
export class CartTotalComponent implements OnInit {
    totalPrice;

    constructor(
        private storeService:StorageService, 
        private cartService:CartService,
        private store: Store<any>
    ){
        store.select('cart').subscribe((cart: Cart[]) => {
            let total = cart.map(cart=>cart.qty * Number(cart.price));
            this.totalPrice = total.reduce(this.reducePrice, 0).toFixed(2);
        });
    }
    reducePrice(sum, num){
        return sum + num;
        
    }
    ngOnInit(){
        
    }

}