import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../../services/product.service';
import * as _ from 'lodash';
import { StorageService } from '../../../services/storage.service';
import { CartService } from '../../../services/cart.service';
import { WindowService } from '../../../services/window.service';
import { PageEvent } from '@angular/material';
import { Store } from '@ngrx/store';
import * as shopActions from '../../../store-management/actions/shop.action';
import { iShop } from '../../../store-management/models/shop.model';
import * as cartActions from '../../../store-management/actions/cart.action';



@Component({
    selector: 'product-offer',
    templateUrl: 'product-offer.component.html',
    styleUrls: ['product-offer.component.scss']
})

export class ProductOfferComponent implements OnInit {
    products;
    cartErrorMsg;
    carts$;
    inCart:boolean = false;
    document;
    offerad$= [ "assets/offer1.jpeg", "assets/offer2.jpeg",
        // {name: "offer1", photo_url: "assets/offer1.jpeg"},
        // {name: "offer1", photo_url: "assets/offer2.jpeg"}
    ];
    pageSize:number = 4;
    page:number = 1;
    length=50; pageSizeOptions=[2, 4, 12, 16, 50]; pageEvent:PageEvent;
    constructor(
        private storeService: StorageService, private productService: ProductService,
        private cartService: CartService, private windowRef: WindowService, 
        private _router: Router, private store: Store<any>
        ){
            this.document = this.windowRef.getDocumentRef();
            cartService.getCart().subscribe((carts)=>{
              this.carts$ = carts.filter(cart=>cart.postcode == this.storeService.retriveData('postcode'));
            });
 
        }
    viewProduct(product){
        this.store.dispatch({type: shopActions.PRODUCT, payload: product.id});
        this._router.navigate(["/shop/product/"+product.name]);
    }

    addToCart(product){
        this.store.dispatch({type: cartActions.CREATE, payload: this.payLoad(product) });
       
     }
     private payLoad(product) {
        return {
          name: product.name,
          pid: product.id,
          price: product.price,
          imageUrl: product.imageUrl,
          qty: 1
        }
     }
     submitPostcode(value){
        if((value == "" || value.length < 5)){
         return;
       }
       this.storeService.storeData('postcode', value);
        setTimeout(()=>{
           this.cartErrorMsg = false;
         }, 500);
      }
    ngOnInit(){
        // Retrieving Offered Products
        this.store.select('shop').subscribe((state)=> {
        // console.log(state);
        if(state.offer !== null){          
            this.productService.getStoreProducts(state.offer, {type: 'OFFER'})
                .map(snapshot => {
                    return snapshot.map(p => {
                        let id = p.payload.doc.id;
                        let data = p.payload.doc.data();
                        return {id, ...data};
                    })
                }).subscribe((data) => {
                    console.log(data);
                    this.products = data;
                });
            }
        }, (err)=> {
            console.log(err);
        });
    }
}