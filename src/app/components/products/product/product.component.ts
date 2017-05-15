import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { iProduct } from '../../../models/product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  
})
export class ProductComponent implements OnInit {
  products:Observable<iProduct>;
  constructor(private store:Store<iProduct>) { 
    // this.products = this.store.select('productReducer');
  }
  remove(){
    this.store.dispatch({type:"REMOVE_PRODUCT", payload:20});
  }
  ngOnInit() {
     this.products = this.store.select('products');
  //  console.log(this.products);
    
  }

}