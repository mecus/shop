import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Injectable()

export class SearchService {
    productUrl;
    constructor(private _http:Http, private storageService:LocalStorageService){
        this.productUrl = "http://localhost:3000/api/v1/productsonly";
    }

    searchProduct(query){
        return this._http.get(this.productUrl).map(products=> products)
            .map(product=> product.json())
            .map(data=> data.filter(product=> product.name.toLowerCase().includes(query)));
            
    }
}