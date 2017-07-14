import { Component, OnInit } from '@angular/core';
import { SearchService } from "app/services/search.service";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';


@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {
  searchForm:FormGroup;
  searchProducts:Observable<any>;
  constructor(private _fb:FormBuilder, private _router:Router, private searchService:SearchService){
      this.searchForm = _fb.group({
        search: ""
      })
    this.search()
      
  }
  
  search(){
    this.searchProducts = this.searchForm.controls.search.valueChanges
    .debounceTime(300)
    .switchMap(query=> this.searchService.searchProduct(query || "$"))
    .map(product=> product);

  }

  findResult(result){
    this.searchForm.patchValue({
      search: ""
    });
    this._router.navigate(["/product", {id:result._id, product: result.name}]);
    // console.log(result);
  }

  ngOnInit() {

  }

}
