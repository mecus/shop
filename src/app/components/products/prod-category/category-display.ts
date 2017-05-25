import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import { iProduct } from "app/models/product.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { TaxanomyService } from '../../../services/taxanomy.service';
import { CartService } from '../../../services/cart.service';
import * as cart from "app/store/actions/cart.action";

// import * as cart from '../../../actions/cart.action';

@Component({
  selector: 'cat-display',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
 
})
export class CategoryDisplayComponent implements OnInit {
  products;
  carts;
  inCart:boolean = false;
  category;
  frozen:boolean;
  drink:boolean;
  dry:boolean;
  

  constructor(private store:Store<iProduct>, private route:ActivatedRoute,
  private _router:Router, private productService:ProductService, private cartService:CartService,
  private _ts:TaxanomyService) {
    this.carts = cartService.getCart(); //cart pulled out from the database to indicate selection
    // this.carts = this.store.select('cartReducer') //Retrieving cart from the store
   }


   //creating a cart payload to be sent to the database
   private payLoad(product) {
      return {
        name: product.name,
         id: product.id,
         price: product.price,
         imageUrl: product.imageUrl,
         qty: 1
      }
   }

   //Adding Item to the cart
   addToCart(product){
     this.cartService.createCart(this.payLoad(product));
    //  this.store.dispatch({type: cart.ADD, payload: this.payLoad(product) });
     
   }

   //Displaying a single product
   viewProduct(product){
     this._router.navigate(["/product", {id:product.id, product: product.name}]);
   }
   

  ngOnInit() {
   
    //Retrieving Products from the database
      this.route.params.forEach((param)=>{
        this.productService.getProducts().subscribe((products)=>{
          this.products = products.filter((product)=> product.category == param['category'] )

        })
        //Displaying Category list
        this._ts.getCategory().subscribe((group)=>{
          this.category = group.filter((cat)=> cat.category == param['category'])
        })
        let category
        this.showAdvert(category = param['category'])
    })

  }//ngOnInit end here

  showAdvert(category){
    switch(category){
      case "Frozen Food": {
        this.frozen = true
        this.drink = false
        this.dry = false
        break
      }
      case "Drinks": {
        this.drink = true
        this.dry = false
        this.frozen = false
        break
      }
      case "Dry Food": {
        this.dry = true
        this.frozen = false
        this.drink = false
        break
      }
      default:{
        return;
      }
    }
  }//End of Switch case function

}