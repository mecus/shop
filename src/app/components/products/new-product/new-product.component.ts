import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { iProduct } from '../../../models/product.model';
import { Store } from '@ngrx/store';
import * as productA from "../../../store/actions/product.action";


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  private pForm:FormGroup;
  constructor(private _fb:FormBuilder, private store:Store<iProduct>, private _router:Router) { }

  saveProduct(product){
    console.log(product);
    this.store.dispatch({type:productA.NEW_PRODUCT, payload: product});
    // setTimeout(()=>{this._router.navigate(["/products"])}, 500)
    

  }
  ngOnInit() {
    this.pForm = this._fb.group({
      name: 'Tomato',
      price: '',
      id: '1',
      code: '234',
      imageUrl: 'www.image.com/image.png',
      category: 'foods',
      description: this.descriptions()
    });
  }
  descriptions(){
    return this._fb.group({
      detail: '',
      nutrition: ''
    })
  }

}
