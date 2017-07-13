import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CartService } from '../../services/cart.service';
import * as firebase from 'firebase';
import { AuthService } from '../authentication.service';
import { StorageService } from "app/services/storage.service";

@Component({
  selector: 'notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit {
  totalPrice:Observable<number>;
  authenticated:boolean = false;
  constructor(private cartService:CartService, private authService:AuthService, private storeService:StorageService) {
    this.authChange();
    
   }
   authChange(){
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.authenticated = true;
      }else{
        this.authenticated = false;
      }
        console.log(user)
    })
   }
  logOut(){
    this.authService.logout();
  }
  ngOnInit() {}

}
