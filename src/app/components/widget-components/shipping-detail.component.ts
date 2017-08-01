import { Component, OnInit } from '@angular/core';
import { StorageService } from "app/services/storage.service";

@Component({
  selector: 'shippong-detail',
  template: `
    <div class="shopping-container">
      <p class="cart-head">Your Basket <md-icon>shopping_cart</md-icon></p>
      <div class="shopping-total">
        <h2 id="shop-total">Shopping Total: </h2>
        <h2><cart-total></cart-total></h2>
      </div>
      <div><p><strong>Your Postcode: </strong> {{postCode}}</p></div>
      <p>£40 minimum order</p>
      <a routerLink="/basket">See full basket</a>
      <a  role="button" md-raised-button routerLink="/checkout">CHECK OUT</a>
    </div>
  `,
  styles: [`
    div.shopping-container{
      padding:0px;
      margin:0px;
      background-color: lightgreen;
      
    }
    div.shopping-total{
      display: flex;
    }
    h2#shop-total{
      margin-right: 20px;
    }
     p.cart-head{
        padding: 0px;
        color:#fff;
        font-weight: bold;
    }
  `]
})
export class ShippingDetailComponent implements OnInit {
  postCode;
  constructor(private storeService:StorageService) {
    this.postCode = this.storeService.retriveData('postcode');
   }

  ngOnInit() {
  }

}
