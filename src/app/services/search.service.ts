import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Injectable()

export class SearchService {
    host:string = "http://localhost:3000/";
    productUrl;
    queryProductUrl;
    constructor(private _http:Http, private storageService:LocalStorageService){
        this.productUrl = this.host+"api/v1/stores/productsonly";
        this.queryProductUrl = this.host+"api/v1/stores/products/query/?";
    }

    searchProduct(query){
        return this._http.get(this.productUrl).map(products=> products)
            .map(product=> product.json())
            .map(data=> data.filter(product=> product.name.toLowerCase().includes(query)));
            
    }

    getQueryProduct(query){
        if(query){
            let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9'})}); 
            let params: URLSearchParams = new URLSearchParams();
            params.set("name", query);
            return this._http.get(this.queryProductUrl+params, options).map((product)=>{
                return product.json();
            }).catch(this.handleError);
        }else{ 
            return [{}];
        }
        
  }

  handleError(err):Observable<any>{
    if (err.status === 302 || err.status === "302"){
      return err.json();
    }else{
      return Observable.throw(new Error(err.status));
    }
  }
}