import { Component, OnInit, HostListener, AfterContentInit } from '@angular/core';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { iProduct } from '../../../models/product.model';
import { ProductService } from "../../../services/product.service";
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";

import { ReviewService } from "../../../services/review.service";

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
    selectedProduct;
    description:boolean = true;
    review:boolean;
    reviewForm: FormGroup;
    showForm: boolean;
    errMsg;
    userErr;
    cartErrorMsg?;
    carts$:Observable<any>;
    constructor(private _router:Router,
    private route:ActivatedRoute, private productService:ProductService,
    private location:Location, private cartService:CartService, 
    private storeService:StorageService, private _fb:FormBuilder,
    private reviewService:ReviewService
  ) { 
      this.reviewForm = _fb.group({
        'user': [null],
        'productName': [null],
        'productId': [null],
        'userName': [null, Validators.required],
        'comment': [null, Validators.required]
      });

    cartService.getCart().subscribe((carts)=>{
      this.carts$ = carts.filter(cart=>cart.postcode == this.storeService.retriveData('postcode'));
    });

  }
  @HostListener('change', ['$event']) showReviewForm($event){
    if(!this.storeService.retriveData('user')){
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
    if(!this.storeService.retriveData('user')){
      this.errMsg = "Please sign in to reviews this product";
      return;
    }
    let review = {
      'user': comment.user.uid,
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
  submitPostcode(value){
    if((value == "" || value.length < 5)){
      return;
    }
    this.storeService.storeData("postcode", value);
    setTimeout(()=>{
      this.cartErrorMsg = false;
    }, 500);
    
  }
  addToCart(){
      if(!this.storeService.retriveData('postcode')){
        this.cartErrorMsg = "Please enter your postcode to make sure we deliver to you";
        return;
        // DA17 4GH
      }
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
  ngOnInit() {
    this.route.params.forEach((param)=>{
        this.productService.getCachedData().subscribe((products)=>{
           this.selectedProduct = products.products.find(product=> product._id === param.id)
           
           this.reviewForm.patchValue({
              'productName': this.selectedProduct.name,
              'productId': this.selectedProduct._id,
              'user': this.storeService.retriveData('user')
            });
        })
    })
  }
}