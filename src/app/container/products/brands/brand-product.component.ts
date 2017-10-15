import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ProductService } from '../../../services/product.service';
import * as _ from 'lodash';
import { StorageService } from '../../../services/storage.service';
import { CartService } from '../../../services/cart.service';
import { WindowService } from '../../../services/window.service';
import { PageEvent, MdPaginator } from '@angular/material';



@Component({
    selector: 'brand-product',
    templateUrl: 'brand-product.component.html',
    styleUrls: ['brand-product.component.scss']
})

export class BrandProductComponent implements OnInit {
    products$;
    cartErrorMsg;
    carts$:Observable<any>;
    inCart:boolean = false;
    document;
    offerad$= [
        {name: "offer1", photo_url: "assets/offer1.jpeg"},
        {name: "offer1", photo_url: "assets/offer2.jpeg"}
    ];
    length=50; pageSize=4; pageSizeOptions=[4, 8, 12, 16, 50]; pageEvent:PageEvent;
    constructor(private storeService:StorageService, private productService:ProductService,
        private cartService:CartService, private windowRef:WindowService, private _router:Router){
            this.document = this.windowRef.getDocumentRef();
            cartService.getCart().subscribe((carts)=>{
              this.carts$ = carts.filter(cart=>cart.postcode == this.storeService.retriveData('postcode'));
            }); 
    }
    viewProduct(product){
        this._router.navigate(["/product", {id:product._id, product: product.name}]);
    }

    addToCart(product){
        // this.state = (this.state == 'small'? 'large': 'small');
        if(!this.storeService.retriveData('postcode')){
          this.cartErrorMsg = "Please enter your postcode to make sure we deliver to you";
          return;
        }
        this.cartService.createCart(this.payLoad(product));
        // this.store.dispatch({type: cart.ADD, payload: this.payLoad(product) });
       
     }
     private payLoad(product) {
        return {
          postcode: this.storeService.retriveData('postcode'),
          name: product.name,
          product_id: product._id,
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
        this.productService.getCachedData().subscribe((data)=>{
            // console.log(data.products);
            this.products$ = _.filter(data.products, {'offer': 'yes'});
        });
    }
}