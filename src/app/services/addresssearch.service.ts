import { Injectable } from '@angular/core';
import { PostcodeApiConfig } from '../environment-var';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';



@Injectable()


export class AddressSearchService {
    constructor(private _http:Http){

    }

    findAddres(postcode:string):Observable<any>{
        let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9'})}); 
        let params: URLSearchParams = new URLSearchParams();
            params.set("api-key", PostcodeApiConfig.api_key);
        return this._http.get(PostcodeApiConfig.url+postcode+"?"+params).map((address)=>{
            return address.json();
        }).catch(this.handleError);
    }

    handleError(err):Observable<any>{
        if (err.status === 404 || err.status === "404"){
        return err.json();
        }else if(err.status == 400 || 404){
            console.log(`
            Status: 400
            Error: ${err}
            `)
            
        }else{
            return Observable.throw(new Error(err.status));
        }
    }
    getMyIp(){
        return this._http.get("https://api.ipify.org?format=json")
            .map((ip)=>{
                return ip.json();
            },
            (err)=>console.log(err));
    }

}