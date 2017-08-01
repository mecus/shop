import { Component, OnInit } from '@angular/core';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { iProduct } from "../../../models/product.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { Store } from '@ngrx/store';
import { StorageService } from "app/services/storage.service";


import * as cart from '../../../store/actions/cart-action';
import { WindowService } from "app/services/window.service";

@Component({
  selector: 'shop-products',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  animations: [
    trigger('loadproduct', [
     
      transition('* => *', [ 
        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('200ms', [
          animate('.3s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-20px)', offset: 0}),
            style({opacity: 0.5, transform: 'translateY(10px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]))
      ]),
    ])
  ]
 
})
export class ProductComponent implements OnInit {
  products;
  category;
  subCategory;
  department;
  advert;
  cartErrorMsg?;
  carts$:Observable<any>;
  inCart:boolean = false;
  document;

  constructor(private route:ActivatedRoute, private storeService:StorageService,
  private _router:Router, private store:Store<any>, private productService:ProductService, 
  private cartService:CartService, private windowRef:WindowService) {
    this.document = this.windowRef.getDocumentRef();
    cartService.getCart().subscribe((carts)=>{
      this.carts$ = carts.filter(cart=>cart.postcode == this.storeService.retriveData('postcode'));
    }); //cart pulled out from the database to indicate selection
  
   }


   //creating a cart payload to be sent to the database
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
   //Adding Item to the cart
   addToCart(product){
      if(!this.storeService.retriveData('postcode')){
        this.cartErrorMsg = "Please enter your postcode to make sure we deliver to you";
        return;
      }
      this.cartService.createCart(this.payLoad(product));
      // this.store.dispatch({type: cart.ADD, payload: this.payLoad(product) });
     
   }

   //Displaying a single product
   viewProduct(product){
     this._router.navigate(["/product", {id:product._id, product: product.name}]);
   }
   showSubCat(cat, event){
     this.clearMenu();
      event.target.style.backgroundColor = "#000";
      event.target.style.color = "#f5f5f5";
     this._router.navigate(["/products/?", {dept_id:cat.department_id, cat_id: cat._id, selected: true, code_number: "17889789"}]);
   }
   displayProduct(subcat, event){
    let i;
      let subL = this.document.getElementsByClassName('sub-list');
      for (i = 0; i < subL.length; i++) {
          // tab[i].className = tab[i].className.replace("active", "");
          subL[i].style.backgroundColor = "transparent";
          subL[i].style.color = "#000"; 
      }
    event.target.style.backgroundColor = "#000";
    event.target.style.color = "#f5f5f5";
    this._router.navigate(["/products/?", {dept_id:subcat.department_id, cat_id: subcat.category_id, subCat_id: subcat._id, selected: true, code_number: "17889789"}]);
   }
   

  ngOnInit() {
    //Retrieving Products from the database
      this.route.params.forEach((param)=>{
        this.store.dispatch({type: "ACTIVE", payload: param});
        this.productService.getCachedData().subscribe((data)=>{
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

        this.productService.getCachedDeptAd().subscribe((Ad)=>{
          this.advert = Ad.filter(ad=> ad.department_id === param['dept_id']);
        });

      })

      
  }//ngOnInit end here 

  clearMenu(){
    let i;
      let catL = this.document.getElementsByClassName('cat-list');
      for (i = 0; i < catL.length; i++) {
          // tab[i].className = tab[i].className.replace("active", "");
          catL[i].style.backgroundColor = "transparent";
          catL[i].style.color = "#000"; 
      }
  }
}