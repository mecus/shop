import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProductService } from "app/services/product.service";
import * as firebase from 'firebase';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list:Observable<{}>;
  counter:Observable<number>;
  title;
  imageUrl;
  constructor(private store:Store<{}>, private PS:ProductService) {

    this.list = this.store.select("reducer");
    this.counter = this.store.select('counter');
    // console.log(this.user);

   }
  
   
   add(){
     this.store.dispatch({type: 'ADD'});
   }
   reset(){
     this.store.dispatch({type: 'RESET'});
   }

   onButtonClick() {
        this.title = 'Hello from Kendo UI!';
    }


  ngOnInit() {
    // console.log(this.list);
    // this.PS.getProducts().subscribe(res=> console.log(res));
  }

}
