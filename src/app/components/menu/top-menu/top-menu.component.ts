import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { iProduct } from "app/models/product.model";
import { Router } from '@angular/router';
import * as product from "../../../store/actions/product.action";
import * as cart from '../../../store/actions/cart.action';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {
  loginWindow: boolean = false;
  constructor(private store:Store<iProduct>, private router:Router) {
    store.dispatch({type:product.LOAD_PRODUCT});
    // store.dispatch({type:cart.LOAD_CART});
   }
   authenticate(){
    this.loginWindow = true;
   }
   closeWindow(){
     this.loginWindow = false;
   }
   routing(){
    this.router.navigate(['/products', {products: 'all-category'}]);
    // this.store.dispatch({type:'NAVIGATE', payload: {products: 'all-category'}});
   }
  ngOnInit() {
  }

}
