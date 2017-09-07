import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";

@Injectable()


export class AdvertService {
    host: string = "https://urgyshop.herokuapp.com/";
    adUrl
    constructor(private _http:Http){
        this.adUrl = this.host+"api/v1/stores/storeadvert";
    }
    getAdvert(){
        return this._http.get(this.adUrl).map((adverts)=>{
            return adverts.json();
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