import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { SearchService } from "../../../services/search.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { WindowService } from '../../../services/window.service';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import * as _ from 'lodash';


@Component({
    selector: 'product-search',
    templateUrl: 'product-search.html',
    styleUrls: ['product-search.scss']
})

export class ProductSearchComponent implements OnInit {
    searchForm:FormGroup;
    searchProducts:Observable<any>;
    // typesOfShoes = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
    constructor(private _location:Location, 
        private searchService:SearchService,
        private _router:Router, private _fb:FormBuilder
    ){
        this.searchForm = _fb.group({
            search: ["", Validators.required]
          });
          this.search();
    }

    search(){
        this.searchProducts = this.searchForm.controls.search.valueChanges
        .debounceTime(300)
        .switchMap(query=> this.searchService.getQueryProduct(query))
        // .switchMap((product)=> {return product})
        .map(result => {
        //   console.log(result);
          return result.json();
        });
      }

    goback(){
        this._location.back();
    }
    findResult(result){
        setTimeout(()=>{
            this._router.navigate(["/product_view/?", {id:result._id, product: result.name}]);
        },300);
        
    }

    ngOnInit(){

    }
}