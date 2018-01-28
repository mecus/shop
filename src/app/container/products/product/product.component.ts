import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { iProduct } from "../../../models/product.model";
import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import * as shopActions from '../../../store-management/actions/shop.action';
import * as cartActions from '../../../store-management/actions/cart.action';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";
import * as _ from 'lodash';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';


import { WindowService } from "../../../services/window.service";
import { PageEvent } from '@angular/material';
import { DbService } from '../../../services/db.service';


@Component({
  selector: 'shop-products',
  templateUrl: 'product.component.html',
  styleUrls: ['product.component.scss'],
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
    ]),

    trigger('zoom', [
      state('small', style({
        transform: 'scale(1)'
      })),
      state('large', style({
        transform: 'scale(1.2)'
      })),
      transition('small => large, large => small', animate('300ms ease-out', style({
        transform: 'translateY(40px)',
        backgroundColor: '#cfd8dc'
      })))
    ])

  ]
 
})
export class ProductComponent implements OnInit, OnDestroy {
  openPostInput;
  counter = 0;
  state:string = 'small';
  productCount:Number;
  mobileProduct;
  products;
  category$;
  aisle$;
  department;
  storeMgt$;
  adverts;
  cartErrorMsg?;
  carts$;
  inCart:boolean = false;
  document;
  groupName;
  page: Number = 1;
  pageSize=5;
  loopSpeed:Number = 8000;
  sorting = ['Sort by', 'Popularity', 'Low to High Price', 'High to Low Price'];
  length=50; pageSizeOptions=[2, 4, 12, 16, 50]; pageEvent:PageEvent;
  
  constructor(
    private route:ActivatedRoute, private storeService:StorageService,
    private _router:Router, private productService:ProductService, 
    private cartService:CartService, private windowRef:WindowService,
    private store: Store<any>,
    private db: DbService
    ) {
      // let cats = db.retrieveCart();
      // console.log(cats);

      windowRef.getWindowObject().setTimeout(()=>{
        this.storeMgt$ = store.select('shop');
        this.storeMgt$.subscribe((state)=> {
          console.log(state);
          // db.setShopDatabase(state);
          if(state.dept_id !== null){
            this.departmentAction(state);
          }
          if(state.aisle_id !== null){
            this.aisleAction(state);
          }
          if(state.cat_id !== null){
            this.categoryAction(state);
          }
        });// End of Store Function
      },0);
      this.document = this.windowRef.getDocumentRef();
      cartService.getCart().subscribe((carts)=>{
        this.carts$ = carts.filter(cart=>cart.postcode == this.storeService.retriveData('postcode'));
      }); //cart pulled out from the database to indicate selection
   }
   productsCount(product = []){
      let numb = product.length + 1;
      let interval = Rx.Observable.interval(100).take(numb);
      interval.subscribe(val=> this.productCount = val);
   }

   // Functions for each action, starting from department
   departmentAction(state){
      // Display Aisles
      this.productService.getStoreIsle(state.dept_id)
      .map(snapshot => {
        return snapshot.map(a => {
          let id = a.payload.doc.id;
          let data = a.payload.doc.data();

          return {id, ...data};
        })
      })
      .subscribe(ai => {
        // console.log(ai);
        this.aisle$ = ai;
        this.category$ = null;
      });
      // Display Matching products
      this.productService.getStoreProducts(state.dept_id, {type: 'DEPARTMENT'})
      .map(snapshot => {
        return snapshot.map(p => {
          let id = p.payload.doc.id;
          let data = p.payload.doc.data();
          return {id, ...data};
        })
      })
      .subscribe(product => {
        // console.log(product);
        this.products = product;
        this.productsCount(product);
      });
   }
   // Function for Aisle and matching products
   aisleAction(state){
    this.productService.getStoreCategory(state.aisle_id)
    .map(snapshot => {
      return snapshot.map(a => {
        let id = a.payload.doc.id;
        let data = a.payload.doc.data();
        return {id, ...data};
      })
    })
    .subscribe(cat => {
      // console.log(cat);
      this.category$ = cat;
    });
    // Display Matching products
    this.productService.getStoreProducts(state.aisle_id, {type: 'AISLE'})
    .map(snapshot => {
      return snapshot.map(p => {
        let id = p.payload.doc.id;
        let data = p.payload.doc.data();
        return {id, ...data};
      })
    })
    .subscribe(product => {
      // console.log(product);
      this.products = product;
      this.productsCount(product);
    });
   }

   // Function for Category
   categoryAction(state){
    this.productService.getStoreProducts(state.cat_id, {type: 'CATEGORY'})
    .map(snapshot => {
      return snapshot.map(p => {
        let id = p.payload.doc.id;
        let data = p.payload.doc.data();
        return {id, ...data};
      })
    })
    .subscribe(product => {
      // console.log(product);
      this.products = product;
      this.mobileProduct = product;
      this.productsCount(product);
    });
     
   }

   // Products Actions
   displayCategory(cat, event){

    this.store.dispatch({type: shopActions.AISLE, payload: cat.id});
    this.clearMenu();
     // event.target.style.backgroundColor = "#000";
     event.target.style.color = "#00796B";
    // this._router.navigate(["/shop/products/?", {dept_id:cat.department_id, cat_id: cat._id, selected: true, dept: cat.name}]);
  }
  displayProducts(cat, event){

    this.store.dispatch({type: shopActions.CATEGORY, payload: cat.id});
    let i;
    let subL = this.document.getElementsByClassName('sub-list');
    for (i = 0; i < subL.length; i++) {
        // tab[i].className = tab[i].className.replace("active", "");
      
        subL[i].style.backgroundColor = "transparent";
        subL[i].style.color = "#000"; 
    }
    // event.target.style.backgroundColor = "#000";
    event.target.style.color = "#00796B";
    // this._router.navigate(["/shop/products/?", {dept_id:subcat.department_id, cat_id: subcat.category_id, subCat_id: subcat._id, selected: true, dept: subcat.name }]);
   }
    //Displaying a single product
  viewProduct(product){
    this.store.dispatch({type: shopActions.PRODUCT, payload: product.id});
    this._router.navigate(["/shop/product", product.name]);
  }









 
   //creating a cart payload to be sent to the database
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
   //remove this method and replace with postcode module
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
    //  this.db.createCart(this.payLoad(product));
      this.store.dispatch({type: cartActions.CREATE, payload: this.payLoad(product)});
   }
   openPostBox(){
    this.openPostInput = "open" + this.counter++;
  }


 
  
   
  sortProduct(sort){
    switch (sort) {
      case 'Low to High Price':
        this.products = _.sortBy(this.products, [(product)=>{return Math.floor(product.price)}]);
        
        break;
      case 'Popularity':
        this.products = _.sortBy(this.products, [(product)=>{return Math.floor(product.price)}]);
        
        break;

      case 'High to Low Price':
        this.products = _.reverse(_.sortBy(this.products, [(product)=>{return Math.floor(product.price)}]));
        
        break;
    
      default:
        this.products = this.products;
        break;
    }
  }

  ngOnInit() {
    //Retrieving Products from the database
      this.route.paramMap.subscribe((param)=>{
        if(param.get('dept_id')){
          console.log("Found dept id");
          this.productService.getStoreIsle(param.get('dept_id'))
          .map(snapshot => {
            return snapshot.map(a => {
              let id = a.payload.doc.id;
              let data = a.payload.doc.data();
              return {id, ...data};
            })
          }).subscribe(ai => {
            // console.log(ai);
          });
        }

        


        // this.store.dispatch({type: "ACTIVE", payload: param});
        // this.productService.getCachedData().subscribe((data)=>{
        //   console.log(data)
        //   if(param.get('dept_id') && (!param.get('cat_id')) && (!param.get('subCat_id'))){
        //     this.products = _.takeRight(data.products.filter((product)=> product.department_id === param['dept_id']), 10);
        //     let numb = this.products.length + 1;
        //     let interval = Rx.Observable.interval(100).take(numb);
        //     interval.subscribe(val=> this.productCount = val);
        //   }
          
        //   this.category  = data.category.filter((cat)=>cat.department_id == param['dept_id']);
        //   this.groupName = param['dept'];
        //   this.subCategory = data.subcategory.filter((subcat)=> subcat.category_id == param['cat_id']);
        //   if(param['cat_id'] && !param['subCat_id']){
        //     this.products = data.products.filter((product)=> product.category_id === param['cat_id']);
        //     let numb = this.products .length + 1;
        //     let interval = Rx.Observable.interval(100).take(numb);
        //     interval.subscribe(val=> this.productCount = val);
        //   }
        //   if(param['subCat_id']){
        //     this.products = data.products.filter((product)=> product.subcategory_id === param['subCat_id']);
        //     let numb = this.products.length + 1;
        //     let interval = Rx.Observable.interval(100).take(numb);
        //     interval.subscribe(val=> this.productCount = val);
        //   } 
        // });

        this.productService.getCachedDeptAd().subscribe((Ad)=>{
     
          this.adverts = _.map(Ad.filter(ad=> ad.department_id === param.get('dept_id')), 'photo_url');
          // console.log(this.adverts);
        });

      })
    // console.log(window.PaymentRequest);
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
  renderSortInput(){
    let domE = document.querySelector('#sortBox');
    // domE.setAttribute('id', 'p-2');
    domE.innerHTML = `
      <mat-select class="p-2" (change)="sortByLowPrice($event.value)" placeholder="Sort by">
      <mat-option *ngFor="let sort of sorting" [value]="sort">
        {{ sort }}
      </mat-option>
    </mat-select>
    `
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // this.storeMgt$.unsubscribe();
  }
}