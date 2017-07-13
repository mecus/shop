import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { iProduct } from '../../../models/product.model';
import { ProductService } from "app/services/product.service";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "app/services/storage.service";
import * as cart from "app/store/actions/cart-action";

@Component({
  selector: 'app-product',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss'],
  
})
export class ProductViewComponent implements OnInit {
    selectedProduct;
    description:boolean = true;
    review:boolean;
    constructor(private store:Store<iProduct>, private _router:Router,
    private route:ActivatedRoute, private productService:ProductService,
    private location:Location, private cartService:CartService, private storeService:StorageService
  ) { 
    
  }
  addToCart(){
      this.cartService.createCart(this.payLoad());
      // this.store.dispatch({type: cart.ADD, payload: this.payLoad() })
 
   }
   private payLoad() {
      return {
        postcode: this.storeService.retriveData('postcode'),
        name: this.selectedProduct.name,
        id: this.selectedProduct._id,
        price: this.selectedProduct.price,
        imageUrl: this.selectedProduct.imageUrl,
        qty: 1
      }
   }
   back(){
     this.location.back();
   }
   showDescription(){
    this.description = true;
    this.review = false;
   }
   showReview(){
    this.review = true;
    this.description = false;
   }
  ngOnInit() {
    this.route.params.forEach((param)=>{
        this.productService.getProducts().subscribe((products)=>{
           this.selectedProduct = products.products.find(product=> product._id === param.id)
        })
    })
    
  }

}