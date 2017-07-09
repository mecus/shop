import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { iProduct } from "app/models/product.model";



@Injectable()
export class ProductService {
  resourceUrl;
  dataResource;
  adUrl;


  constructor( private _http:Http) {
    this.resourceUrl = "http://localhost:3000/api/v1/products";
    this.dataResource = "http://localhost:3000/api/v1/storedata";
    this.adUrl = "http://localhost:3000/api/v1/storeadvert";
   }

  getFireBaseProduct(){
    let dbRef = firebase.database().ref('/products');
      return dbRef.once('value').then((snapshot)=>{
        return snapshot.val();
      }).catch((err)=>{
        console.log(err);
      });
  }
  getStoreAd():Observable<any>{
    return this._http.get(this.adUrl).map((advert)=>{
      return advert.json();
    }).catch(this.handleError);
  }

  getProducts():Observable<any>{
    return this._http.get(this.dataResource).map((res)=>{
     return res.json();
    }).catch(this.handleError);
    
  }
  handleError(err):Observable<any>{
    if (err.status === 302 || err.status === "302"){
      return err.json();
    }else{
      return Observable.throw(new Error(err.status));
    }
  }
}
