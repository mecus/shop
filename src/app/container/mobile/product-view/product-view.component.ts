import { Component, OnInit, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { iProduct } from "../../../models/product.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";
import * as _ from 'lodash';
import { ReviewService } from '../../../services/review.service';

@Component({
    selector: 'view-product',
    templateUrl: 'product-view.component.html',
    styleUrls: ['product-view.component.scss']
})

export class ProductViewComponent implements OnInit {
    reviewForm:FormGroup;
    errMsg;
    productName;
    product;
    carts$ 
    cartErrorMsg;
    dialogBox;
    openPostInput;
    counter = 0;
    showForm;
    userErr;
    constructor(private _location:Location, 
                private productService:ProductService,
                private route: ActivatedRoute,
                private _router:Router, private cartService:CartService,
                private storeService:StorageService,
                private reviewService:ReviewService,
                private _fb:FormBuilder
    ){
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

    goback(){
        this._location.back();
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
    //creating a cart payload to be sent to the database
    private payLoad(product) {
        return {
        postcode: this.storeService.retriveData('postcode'),
        name: product.name,
        product_id: product._id,
        price: product.price,
        imageUrl: product.imageUrl,
        qty: 1,
        id: null
        }
    }
    addToCart(product){
        if(!this.storeService.retriveData('postcode')){
            this.cartErrorMsg = "Please enter your postcode to make sure we deliver to you";
            this.openPostBox();
            return;
          }
          this.cartService.createCart(this.payLoad(product));
    }
    //call function if user have not enter postcode
    openPostBox(){
        this.openPostInput = "open" + this.counter++;
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
    ngOnInit(){
        //Get Authentication service to check for current user
        this.route.params.forEach((param)=>{
            this.productName = param['product'];
            this.productService.getCachedData().subscribe((data)=>{
                this.product = _.last(_.filter(data.products, {'_id': param['id']}));
                
            })
        });

    }
}