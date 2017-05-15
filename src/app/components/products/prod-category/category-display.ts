import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { iProduct } from "app/models/product.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import * as cart from "app/store/actions/cart.action";
// import * as cart from '../../../actions/cart.action';

@Component({
  selector: 'cat-display',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],

  // directives: [CartComponent]
 
})
export class CategoryDisplayComponent implements OnInit {
  products;
  basket$:Observable<{}>;
  constructor(private store:Store<iProduct>, private route:ActivatedRoute,
  _router:Router, private productService:ProductService) {

    // this.store.select('cartReducer').toArray().subscribe((carts)=>{
    //   carts.find(cart=> cart[2])
    //   // console.log(carts);
    // })
   }
   private payLoad(product) {
      return {
        name: product.name,
         id: product.id,
         price: product.price,
         qty: 1
      }
   }
   addToCart(product){
     this.store.dispatch({type: cart.ADD, payload: this.payLoad(product) })
   }
   

  ngOnInit() {
   
    this.route.params.forEach((param)=>{
      console.log(param)
       this.productService.getProducts().subscribe((products)=>{
        this.products = products.filter((product)=> product.category == param['category'] )
      console.log(this.products);
      })
    
    })

    
  }

}