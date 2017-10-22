import { Component, OnInit } from '@angular/core';
import { SearchService } from "../../services/search.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { WindowService } from '../../services/window.service';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import * as _ from 'lodash';


@Component({
  selector: 'product-search',
  templateUrl: 'product-search.component.html',
  styleUrls: ['product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  searchForm:FormGroup;
  searchProducts:Observable<any>;
  document;
  constructor(private _fb:FormBuilder, private _router:Router, 
    private searchService:SearchService, private windowService:WindowService){
      this.searchForm = _fb.group({
        search: ["", Validators.required]
      })

    this.search()
    this.document = windowService.getDocumentRef();
  }

  
  search(){
    this.searchProducts = this.searchForm.controls.search.valueChanges
    .debounceTime(300)
    .switchMap(query=> this.searchService.getQueryProduct(query))
    // .switchMap((product)=> {return product})
    .map(result => {
      // console.log(result);
      return result.json();
    });
  }

  findResult(result){
    this.searchForm.patchValue({
      search: ""
    });
    this._router.navigate(["/product", {id:result._id, product: result.name}]);
    // console.log(result);
  }
  closeResult(){
    let domE = this.document.querySelector('.search-result-list');
    // domE.style.height = "0px";
  }

  ngOnInit() {
   
    // console.log( this.searchForm.dirty);
    let domE1 = this.document.querySelector('#top-screen');
    let domE = this.document.querySelector('.search-result-list');
    // domE1.addEventListener('click', ()=>{
    //   // console.log("Page clicked");
    //   // domE.style.display = "none";
    // });

  }

}
