import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { iProduct } from '../../../models/product.model';
import { ProductService } from "app/services/product.service";
import { CartService } from '../../../services/cart.service';
import * as cart from "app/store/actions/cart.action";

@Component({
  selector: 'app-product',
  template:`
        <div class="container">
          <p><a (click)="back()" md-mini-fab ><md-icon>arrow_back</md-icon></a> {{selectedProduct.category}} > {{selectedProduct.name}}</p>
            <div class="row">
              <div class="col col-lg-9">
                <div class="row">
                  <div class="col col-lg-5">
                    <img style="width:300px" [src]="selectedProduct.imageUrl">
                  </div>
                  <div class="col col-lg-7">
                    <h1>{{selectedProduct.name}}</h1>
                    <p>Price: {{selectedProduct.price | currency: 'GBP' :true}}</p>
                    <p>( {{selectedProduct.description.size}} )</p>
                    
                    <button (click)="addToCart()" md-raised-button > Add to Cart</button>
                    

                    <div class="descriptions">
                      <br><br>
                      <p>{{selectedProduct.description.detail}}</p>
                    </div>

                  </div>
                </div>
                
              </div>
              <div class="col col-lg-3">
                <side-shop-cart></side-shop-cart>
              </div>
            </div>
            
        </div>
    `,
  styles: [``],
  
})
export class ProductViewComponent implements OnInit {
    selectedProduct;
    constructor(private store:Store<iProduct>, private _router:Router,
    private route:ActivatedRoute, private productService:ProductService,
    private location:Location, private cartService:CartService
  ) { 
    
  }
  addToCart(){
      this.cartService.createCart(this.payLoad());
      // this.store.dispatch({type: cart.ADD, payload: this.payLoad() })
 
   }
   private payLoad() {
      return {
        name: this.selectedProduct.name,
        id: this.selectedProduct.id,
        price: this.selectedProduct.price,
        imageUrl: this.selectedProduct.imageUrl,
        qty: 1
      }
   }
   back(){
     this.location.back();
   }
  ngOnInit() {
    this.route.params.forEach((param)=>{
        this.productService.getProducts().subscribe((products)=>{
           this.selectedProduct = products.find(product=> product.id == param.id)

        })
    })
    
  }

}