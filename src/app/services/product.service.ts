import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';

import { iProduct } from "app/models/product.model";

import { AdItem } from '../components/advert/ad-item';
import { NewProdComponent } from '../components/advert/dynamic-components/newprod.component';
import { NewCatComponent } from '../components/advert/dynamic-components/newcat.component';



@Injectable()
export class ProductService {
  host:string = "http://localhost:3000/";
  resourceUrl;
  dataResource;
  adUrl;
  storeData$;
  storeDeptAd$;
  queryProductUrl;


  constructor( private _http:Http) {
    this.resourceUrl = this.host+"api/v1/stores/products";
    this.dataResource = this.host+"api/v1/stores/storedata";
    this.adUrl = this.host+"api/v1/stores/storeadvert";
    this.queryProductUrl = this.host+"api/v1/stores/products/query/?";
    this.storeData$ = new ReplaySubject(1);
    this.storeDeptAd$ = new ReplaySubject(1);
   }

  getFireBaseProduct(){
    let dbRef = firebase.database().ref('/products');
      return dbRef.once('value').then((snapshot)=>{
        return snapshot.val();
      }).catch((err)=>{
        console.log(err);
      });
  }
  getDeptAd():Observable<any>{
    return this._http.get(this.adUrl).map((advert)=>{
      return advert.json();
    }).catch(this.handleError);
  }

  getProducts():Observable<any>{
    return this._http.get(this.dataResource).map((res)=>{
     return res.json();
    }).catch(this.handleError);
    
  }
  getQueryProduct(query){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9'})}); 
    let params: URLSearchParams = new URLSearchParams();
    params.set("name", query);
    return this._http.get(this.queryProductUrl+params, options).map((product)=>{
      return product.json();
    }).catch(this.handleError);
  }
  handleError(err):Observable<any>{
    if (err.status === 302 || err.status === "302"){
      return err.json();
    }else{
      return Observable.throw(new Error(err.status));
    }
  }

  getStoreAd(){
     return this._http.get(this.adUrl).map((res)=>{
     let ad = res.json().filter(ads=>ads.tag == "alpha");
     return ad.map((data)=>{
       return new AdItem(NewProdComponent, data);
     });
    }).catch(this.handleError);
  }

  getAds() {
    // used for getSoreAd() supplements
    // need to be removed later
    return [
      new AdItem(NewProdComponent, {title: 'Bombasto', snipet: 'Brave as they come'}),

      new AdItem(NewCatComponent,   {headline: 'Hiring for several positions',
                                        body: 'Submit your resume today!'}),

      new AdItem(NewProdComponent, {title: 'Dr IQ', snipet: 'Smart as they come'}),

      new AdItem(NewCatComponent,   {headline: 'Openings in all departments',
                                        body: 'Apply today'}),
    ];
  }

  //Caching data functions
  getCachedData(forceRefresh?:boolean){
    if(!this.storeData$.observers.length || forceRefresh){
      console.log("Http Request Service for Products");
      this.getProducts().subscribe(
        data=> this.storeData$.next(data),
        error=>{
          if(error){
            this.storeData$.error(error);
            this.storeData$ = new ReplaySubject(1);
          }
        }
      )
    }
    return this.storeData$;
  }
  getCachedDeptAd(refreshData?:boolean){
    if(!this.storeDeptAd$.observers.length || refreshData){
      console.log("New Http Request for Advert");
      this.getDeptAd().subscribe(
        data=> this.storeDeptAd$.next(data),
        error=>{
          this.storeDeptAd$.error(error);
          this.storeDeptAd$ = new ReplaySubject(1);
        },
        ()=>console.log("Request Completed")
      )
    }
    return this.storeDeptAd$;
  }
}
