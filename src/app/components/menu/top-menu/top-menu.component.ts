import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { iProduct } from "app/models/product.model";
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  constructor(private store:Store<iProduct>, private router:Router) {
    store.dispatch({type:'LOAD_PRODUCT'});
   }
   routing(){
    // this.router.navigate(['/products', {products: 'all-category'}]);
    this.store.dispatch({type:'NAVIGATE', payload: {products: 'all-category'}});
   }
  ngOnInit() {
  }

}
