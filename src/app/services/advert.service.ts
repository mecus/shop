import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { ReplaySubject } from "rxjs/ReplaySubject";
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()


export class AdvertService {
    host: string = "https://urgyshop.herokuapp.com/";
    adUrl;
    advertCached$;
    constructor(private _http:Http){
        this.adUrl = this.host+"api/v1/stores/storeadvert";
        this.advertCached$ = new ReplaySubject(1);
    }
    getAdvert(){
        return this._http.get(this.adUrl).map((adverts)=>{
            return adverts.json();
       }).catch(this.handleError);
     }
    getAdvertCached(){
      if(!this.advertCached$.observers.length){
        console.log("Advert fatching");
        this.getAdvert().subscribe(
          ad=> this.advertCached$.next(ad),
          error=> {
            if(error){
              this.advertCached$.error(error);
              this.advertCached$ = new ReplaySubject(1);
            } 
          }
        )
      }
      return this.advertCached$;
    }

     handleError(err):Observable<any>{
        if (err.status === 302 || err.status === "302"){
          return err.json();
        }else{
          return Observable.throw(new Error(err.status));
        }
      }
}