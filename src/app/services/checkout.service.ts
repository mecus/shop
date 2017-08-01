import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';



@Injectable()


export class CheckoutService {
    private urlApi;
    private patchApi;
    constructor(private _http:Http){
        this.urlApi = "http://localhost:3000/api/v1/account/";
        this.patchApi = "http://localhost:3000/api/v1/account/edit";
    }

    getAccount(id):Observable<any>{
        return this._http.get(this.urlApi+id).map((account)=>{
            return account.json();
        }).catch((error):any =>{
            console.log(error);
        });
    }
    createAccount(customer){
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        console.log(customer);
        return this._http.post(this.urlApi, customer, options).map((res)=>{
            console.log(res);
        }).catch((error):any =>{
            console.log(error);
            return;
        }).subscribe();
       
    }
    updateAccount(updates):Observable<any>{
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json', 
                'Accept': 'q=0.8;application/json;q=0.9'
            })
        });
        console.log(updates);
        return this._http.patch(this.patchApi, updates, options).map((res)=>{
            console.log(res);
        }).catch((error):Observable<any> =>{
            console.log(error);
            return;
        })
    
    }
}