import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Store } from '@ngrx/store';
import { iShop } from '../../../store-management/models/shop.model';
import  * as shopActions from '../../../store-management/actions/shop.action';


@Component({
    selector: 'cat-list',
    templateUrl: 'category-list.component.html',
    styleUrls: ['category-list.component.scss']
})

export class CategoryListComponent implements OnInit {
    dialogBox;
    Category$;
    categoryName;
    typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
    constructor(
        private _location:Location, 
        private productService:ProductService,
        private route:ActivatedRoute, 
        private _router:Router,
        private store: Store<any>
    ){
        store.select('shop').subscribe((state)=> {
            console.log(state);
            // db.setShopDatabase(state);
            if(state.dept_id !== null){
              this.Category$ = this.productService.getStoreCategory(state.aisle_id)
              .map(snapshot => {
                return snapshot.map(a => {
                  let id = a.payload.doc.id;
                  let data = a.payload.doc.data();
                  return {id, ...data};
                })
              });
            }
          })
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
    goback(){
        this._location.back();
    }
    goToProducts(cat){
        this.store.dispatch({type: shopActions.CATEGORY, payload: cat.id});
        this._router.navigate(["/shop/mob_category/"+cat.name]);
        
    }
    // showCategory(cat){
    //     this.store.dispatch({type: shopActions.CATEGORY, payload: cat.id});
    //     this._router.navigate(["/shop/mob_category/"+cat.name]);
    //     // setTimeout(()=>{
    //     //     this._router.navigate(["/product_category/?", {cat_id:cat._id, dept:cat.name}]);
    //     // },400);
        
    // }
    ngOnInit(){
        this.route.paramMap.subscribe((param)=>{
            this.categoryName = param.get('id');
        })

    }
}