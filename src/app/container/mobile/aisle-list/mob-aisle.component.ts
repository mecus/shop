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
    selector: 'aisle-list',
    templateUrl: 'aisle-list.component.html',
    styleUrls: ['aisle-list.component.scss']
})

export class AisleListComponent implements OnInit {
    dialogBox;
    selectedCategory;
    subcat: boolean = false;
    aisleName;
    aisle$;
    typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
    constructor(
        private _location:Location, 
        private productService:ProductService,
        private route:ActivatedRoute, 
        private _router:Router,
        private store: Store<any>
    ){
        // windowRef.getWindowObject().setTimeout(()=>{
            store.select('shop').subscribe((state)=> {
              console.log(state);
              // db.setShopDatabase(state);
              if(state.dept_id !== null){
                this.aisle$ = this.productService.getStoreIsle(state.dept_id)
                .map(snapshot => {
                  return snapshot.map(a => {
                    let id = a.payload.doc.id;
                    let data = a.payload.doc.data();
                    return {id, ...data};
                  })
                });
                
              }
            //   if(state.aisle_id !== null){
            //     this.aisleAction(state);
            //   }
            //   if(state.cat_id !== null){
            //     this.categoryAction(state);
            //   }
            });// End of Store Function
        //   },0);
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
        this.subcat = false;
        this._location.back();
    }
    // goToProducts(subCat){
    //     setTimeout(()=>{
    //         this._router.navigate(["/mob_products/?", {subCat_id:subCat._id, dept:subCat.name}]);
    //     },400)
        
    // }
    showAisles(aisle){
        this.store.dispatch({type: shopActions.AISLE, payload: aisle.id});
        this._router.navigate(["/shop/mob_aisle/"+aisle.name]);
        // setTimeout(()=>{
        //     this._router.navigate(["/shop/?", {cat_id:cat._id, dept:cat.name}]);
        // },400);
        
    }
    ngOnInit(){
        this.route.paramMap.subscribe((param)=>{
            this.aisleName = param.get('id');
        })

    }
}