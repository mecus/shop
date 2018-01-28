import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { iProduct } from "../../../models/product.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import { iShop } from '../../../store-management/models/shop.model';
import  * as shopActions from '../../../store-management/actions/shop.action';
import * as cartActions from '../../../store-management/actions/cart.action';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/merge';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/share';


import { WindowService } from "../../../services/window.service";
import { PageEvent} from '@angular/material';
import { Cart } from '../../../store-management/models/cart.model';

@Component({
    selector: 'mob-product',
    templateUrl: 'mob-product.component.html',
    styleUrls: ['mob-product.component.scss']

})

export class MobileProductComponent implements OnInit {
    products$;
    categoryName;
    dialogBox;
    carts$;
    cartErrorMsg;
    openPostInput;
    counter = 0;
    constructor(
        private route:ActivatedRoute, private _router:Router, 
        private productService:ProductService, 
        private _location:Location,
        private cartService:CartService, 
        private storeService:StorageService,
        private store: Store<any>
        ){
            store.select('shop').subscribe((state)=> {
                // console.log(state);
                // db.setShopDatabase(state);
                if(state.dept_id !== null){
                  this.products$ = this.productService.getStoreProducts(state.cat_id, {type: 'CATEGORY'})
                  .map(snapshot => {
                    return snapshot.map(a => {
                      let id = a.payload.doc.id;
                      let data = a.payload.doc.data();
                      return {id, ...data};
                    })
                  });
                }
              })
              store.select('cart').subscribe((cart: Cart[]) => {
                this.carts$ = cart;
            });
    
        }


    open(){
        this.dialogBox = "open";
    }
    close(e){
        e.stopPropagation();
        if(e.target['id'] == 'link-container'){
            this.dialogBox = "close";
        }
    }
    goback(){
        this._location.back();
    }
    viewProduct(product){
        this.store.dispatch({type: shopActions.PRODUCT, payload: product.id});
        this._router.navigate(["/shop/product", product.name]);
    }
    //creating a cart payload to be sent to the database

    private payLoad(product) {
        return {
          name: product.name,
          pid: product.id,
          price: product.price,
          imageUrl: product.imageUrl,
          size: product.description.size,
          qty: 1
        }
     }
    addToCart(product){
        this.store.dispatch({type: cartActions.CREATE, payload: this.payLoad(product)});
    }
     //call function if user have not enter postcode
    openPostBox(){
        this.openPostInput = "open" + this.counter++;
    }
    ngOnInit(){    
        this.route.paramMap.subscribe((param)=>{
            this.categoryName = param.get('id');
        })

    }
}