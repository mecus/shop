import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ProductService } from "app/services/product.service";
import * as firebase from 'firebase';
import { AdItem } from '../../components/advert/ad-item';
import { SearchService } from "app/services/search.service";



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  ads: AdItem[];
  list:Observable<{}>;
  counter:Observable<number>;
  title;
  imageUrl;
  constructor(private searchService:SearchService, private PS:ProductService, title:Title) {
    title.setTitle('Welcome to our shop');
    
    // console.log(this.user);

   }
   
  //  add(){
  //    this.store.dispatch({type: 'ADD'});
  //  }
  //  reset(){
  //    this.store.dispatch({type: 'RESET'});
  //  }

   onButtonClick() {
        this.title = 'Hello from Kendo UI!';
    }


  ngOnInit() {
    this.ads = this.PS.getAds();
    // console.log(this.ads);
    // console.log(window.location);
    // this.PS.getProducts().subscribe(res=> console.log(res));
    this.PS.getNewAd().subscribe((res)=> {
      this.ads = res;
      // console.log(res)
    });
  }

}
