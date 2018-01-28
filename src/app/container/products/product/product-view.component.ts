import { Component, OnInit, HostListener, AfterContentInit } from '@angular/core';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { iProduct } from '../../../models/product.model';
import { ProductService } from "../../../services/product.service";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";
import { ReviewService } from "../../../services/review.service";

import * as _ from 'lodash';
import { WindowService } from '../../../services/window.service';
import * as cartActions from '../../../store-management/actions/cart.action';
import { Cart } from '../../../store-management/models/cart.model';

@Component({
  selector: 'app-product',
  templateUrl: 'product-view.component.html',
  styleUrls: ['product-view.component.scss'],

  animations: [
    trigger('IcomponentIn', [
     
      transition('* => *', [ 
        query(':enter', style({opacity: 0}), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-70px)', offset: 0}),
            style({opacity: .5, transform: 'translateY(30px)', offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1})
          ]))
        ]))
      ]),
    ])
  ]
  
})
export class ProductViewComponent implements OnInit {
    openPostInput;
    counter = 0;
    selectedProduct;
    description:boolean = true;
    review:boolean;
    reviewForm: FormGroup;
    showForm: boolean;
    errMsg;
    userErr;
    dialogBox;
    cartErrorMsg?;
    carts$;
    reconmendProduct$;
    constructor(
      private _router: Router,
      private route: ActivatedRoute, private productService: ProductService,
      private location: Location, private cartService: CartService, 
      private storeService: StorageService, private _fb: FormBuilder,
      private reviewService: ReviewService, private windowRef: WindowService,
      private store: Store<any>,

  ) { 
      this.reviewForm = _fb.group({
        'user': [null],
        'productName': [null],
        'productId': [null],
        'userName': [null, Validators.required],
        'comment': [null, Validators.required]
      });

      store.select('cart').subscribe((cart: Cart[]) => {
        this.carts$ = cart;
    });

    // Store Management source of truth
    windowRef.getWindowObject().setTimeout(()=> {
      store.select('shop').subscribe(state => {
        if(state.product_id !== null){
          this.selectedProduct = 
          this.productService.getStoreSingleProduct(state.product_id)
          .map(product => {
            let data = product.payload.data();
            let id = product.payload.id;
            return {id, ...data};
          });
        }      
      });
    }, 100);
  

  }
  @HostListener('change', ['$event']) showReviewForm($event){
    if(!this.storeService.retriveData('uid')){
      this.userErr = "Please sign in to reviews this product";
      return;
    }
    if($event.checked == false){
      this.showForm = false;
      return;
    }
    this.showForm = true;
    return;
  }
  addReviews(comment){
    if(!comment.comment){
      this.errMsg = "Please fill in all fields";
      return;
    }
    if(!this.storeService.retriveData('uid')){
      this.errMsg = "Please sign in to reviews this product";
      return;
    }
    let review = {
      'user': comment.user,
      'productName': comment.productName,
      'productId': comment.productId,
      'userName': comment.userName,
      'comment': comment.comment,
      'postedOn': Date.now()
    }
    this.reviewService.createReview(review);
    this.reviewForm.patchValue({
      'userName': '',
      'comment': ''
    });
    
  }
  //to be removed later
  submitPostcode(value){
    if((value == "" || value.length < 5)){
      return;
    }
    this.storeService.storeData("postcode", value);
    setTimeout(()=>{
      this.cartErrorMsg = false;
    }, 500);
    
  }
  
  openPostBox(){
    this.openPostInput = "open" + this.counter++;
  }
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
      this.store.dispatch({type: cartActions.CREATE, payload: this.payLoad(product)})
   }

   redirectLogin(){
     this._router.navigate(["/login"]);
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
  reconmendFunction(reconmend){
    this._router.navigate(["/product", {id:reconmend._id, product: reconmend.name}]);
  }
  goback(){
    this.location.back();
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
  ngOnInit() {
  }
}