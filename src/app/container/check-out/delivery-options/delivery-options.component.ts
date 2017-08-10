import { Component, OnInit } from '@angular/core';
import { TempOrderService } from "app/services/temp-order.service";
import { AuthService } from "app/authentications/authentication.service";
import { StorageService } from "app/services/storage.service";
import { CartService } from "app/services/cart.service";

@Component({
  selector: 'delivery-options',
  templateUrl: './delivery-options.component.html',
  styleUrls: ['./delivery-options.component.scss']
})
export class DeliveryOptionsComponent implements OnInit {
  totalPrice;
  groundTotal;
  deliveryCost;
  deliveryMeth;
  addOpacity;
  options = [
    {option: "Royal Mail 3-5 Working days", price: 2.50},
    {option: "Royal Mail 1-2 Working days", price: 3.50},
    {option: "Royal Mail Next day delivery", price: 4.90},
    {option: "Royal Mail Same days delivery", price: 5.90}
  ];
  constructor(private tempOrderService:TempOrderService,
    private authService:AuthService, private storeService:StorageService, private cartService:CartService) { }

  ngOnInit() {
    this.checkForAddress();
    this.deliveryMeth = this.options[3];
  }
  selectOption(event, opt){
    let deliveryOption = {
      delivery_option:{
        method: opt.option,
        price: opt.price.toString()
      }
    }
    let dom = document.getElementsByClassName('list-group-item');

    let i;
    for(i = 0; i < dom.length; i++){
      // dom[i]['list-group-item'] = dom[i]['list-group-item'].style.backgroundColor = "transparent";
      // console.log(dom[i]);
      event.target.style.backgroundColor = "transparent";
    }
    
    event.target.style.backgroundColor = "lightgrey";
    event.target.style.color = "slategrey";
    // console.log(event);
    // console.log(opt);
    this.deliveryMeth = opt;
    this.groundTotal = Number(opt.price) + Number(this.totalPrice);
    let total = {
      ground_total: this.groundTotal.toFixed(2)
    }
    this.authService.authState().subscribe((state)=>{
          if(state){
          this.tempOrderService.updateTempOrder(state.uid, deliveryOption, total);
          }else{
            console.log("User must be logged In");
          }
      })
    
  }

   getCatTotal(option){
        this.cartService.cartTotal().subscribe((carts)=>{
        let total = carts.filter(cart=> cart.postcode == this.storeService.retriveData('postcode'))
        .map(cart=>cart.qty * Number(cart.price));
        this.totalPrice = total.reduce(this.reducePrice, 0).toFixed(2);
        this.groundTotal= Number(this.totalPrice) + Number(option);
        // console.log(this.groundTotal);
   
        });
    }
    reducePrice(sum, num){
        return sum + num;
        
    }
    checkForAddress(){
      this.authService.authState().subscribe((user)=>{
        this.tempOrderService.getTempOrder(user.uid).subscribe((address)=>{
          if(!address.delivery_address){

            this.addOpacity = "0.2";
          }
          if(address.delivery_option){
            let sum = address.delivery_option.price;
            this.getCatTotal(sum);
          }
        })
      })
    }
}
