import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProductService } from "app/services/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list:Observable<{}>;
  counter:Observable<number>;
  title;
  constructor(private store:Store<{}>, private PS:ProductService) {

    this.list = this.store.select("reducer");
    this.counter = this.store.select('counter');
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
