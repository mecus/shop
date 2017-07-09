import { Component, OnInit } from '@angular/core';
import { iProduct } from "../../../models/product.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Store } from '@ngrx/store';


import * as cart from '../../../store/actions/cart-action';

@Component({
  selector: 'shop-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
 
})
export class ProductComponent implements OnInit {
  products;
  category;
  subCategory;
  department;
  advert;

  carts;
  inCart:boolean = false;
  

  constructor(private route:ActivatedRoute,
  private _router:Router, private store:Store<any>, private productService:ProductService, private cartService:CartService) {
    this.carts = cartService.getCart(); //cart pulled out from the database to indicate selection
    // this.carts = this.store.select('cart') //Retrieving cart from the store
    // console.log(this.carts);
   }


   //creating a cart payload to be sent to the database
   private payLoad(product) {
      return {
        name: product.name,
        product_id: product._id,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1
      }
   }

   //Adding Item to the cart
   addToCart(product){
      this.cartService.createCart(this.payLoad(product));
      // this.store.dispatch({type: cart.ADD, payload: this.payLoad(product) });
     
   }

   //Displaying a single product
   viewProduct(product){
     this._router.navigate(["/product", {id:product._id, product: product.name}]);
   }
   showSubCat(cat){
     this._router.navigate(["/products/?", {dept_id:cat.department_id, cat_id: cat._id, selected: true, code_number: "17889789"}]);
   }
   displayProduct(subcat){
     this._router.navigate(["/products/?", {dept_id:subcat.department_id, cat_id: subcat.category_id, subCat_id: subcat._id, selected: true, code_number: "17889789"}]);
   }
   

  ngOnInit() {
    //Retrieving Products from the database
      this.route.params.forEach((param)=>{
        this.productService.getProducts().subscribe((data)=>{
          this.products = data.products.filter((product)=> product.department_id === param['dept_id']);
          this.category  = data.category.filter((cat)=>cat.department_id == param['dept_id']);
          this.subCategory = data.subcategory.filter((subcat)=> subcat.category_id == param['cat_id']);
          if(param['cat_id']){
            this.products = data.products.filter((product)=> product.category_id === param['cat_id']);
          }
          if(param['subCat_id']){
            this.products = data.products.filter((product)=> product.subcategory_id === param['subCat_id']);
          }
          
        
        });

        this.productService.getStoreAd().subscribe((Ad)=>{
          this.advert = Ad.find(ad=> ad.department_id === param['dept_id']);
        });

      })

      
  }//ngOnInit end here 
}