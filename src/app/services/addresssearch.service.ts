import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';



@Injectable()


export class AddressSearchService {
    addressApiUrl: string;
    api_key: "T29bpEjr5UOyVnS7I8ldKA9589";
    api2 = "3JasqYbLr0y3NTHqObVR0Q9596";
    constructor(private _http:Http){
        this.addressApiUrl = "https://api.getAddress.io/find/";
    }

    findAddres(postcode:string):Observable<any>{
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9'})}); 
        let params: URLSearchParams = new URLSearchParams();
            params.set("api-key", "T29bpEjr5UOyVnS7I8ldKA9589");
        return this._http.get(this.addressApiUrl+postcode+"?"+params).map((address)=>{
            return address.json();
        }).catch(this.handleError);
    }

    handleError(err):Observable<any>{
    if (err.status === 404 || err.status === "404"){
      return err.json();
    }else{
      return Observable.throw(new Error(err.status));
    }
  }
}