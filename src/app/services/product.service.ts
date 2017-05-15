import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { iProduct } from "app/models/product.model";



@Injectable()
export class ProductService {
  public products = [];
  dataUrl = "app/shared/products-data.json";

  constructor(private _af:AngularFireDatabase, private _http:Http) { }

  createProduct(product){
    return this._af.list('/products')
      .push(product).then((res)=>{console.log(res)}).catch(error=>console.log(error));
  }
  getProducts():Observable<iProduct[]>{
    return this._af.list('/products');

  }
}
