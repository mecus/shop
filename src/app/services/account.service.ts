import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';



@Injectable()


export class AccountService {
    urlApi;
    patchApi;
    addressApi; 
    constructor(private _http:Http){
        this.urlApi = "http://localhost:3000/api/v1/customers/account/";
        this.patchApi = "http://localhost:3000/api/v1/customers/account/";
        this.addressApi = "http://localhost:3000/api/v1/customers/address/"
    }

    getAccount(id):Observable<any>{
        return this._http.get(this.urlApi+id).map((account)=>{
            return account.json();
        }).catch((error):any =>{
            console.log(error);
        });
    }
    createAccount(account, address?){
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        console.log(account);
        return this._http.post(this.urlApi, account, options).map((res)=>{
            address.account_id = res.json().id;
            this.postAddress(address);
            console.log(res);
        }).catch((error):any =>{
            console.log(error);
            return;
        }).subscribe();
       
    }
    updateAccount(updates:any, uid?){
        let id = uid;
        let idParam:URLSearchParams = new URLSearchParams();
        idParam.set("id", uid);
        let options: RequestOptionsArgs = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'Method': 'PUT'
            })
        });
        console.log(this.urlApi+id, updates, options);
        return this._http.put(this.urlApi+id, updates, options)
        .map((res:Response)=>{
            console.log(res);
            return res.json();
        }).catch((error):any =>{
            console.log(error);
            
        });
        // Need to subscribe in the component
    }
    //suspended for now as structure changes
    postBillingAddress(address){
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        console.log(address);
        return this._http.post(this.urlApi, address, options).map((res)=>{
            console.log(res);
        }).catch((error):any =>{
            console.log(error);
            return;
        }).subscribe();
    }

    postAddress(address){
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        console.log(address);
        return this._http.post(this.addressApi, address, options).map((res)=>{
            console.log(res);
        }).catch((error):any =>{
            console.log(error);
            return;
        }).subscribe();
    }
    getAddress(id){
        return this._http.get(this.addressApi+id).map((addresses)=>{
            return addresses.json();
        }).catch((error):any=>{console.log(error)});
    }
    updateAddress(id, address){
        let options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return this._http.put(this.addressApi+id, address, options).map((res)=>{
            return res.json();
        }).catch((err):any=>{
            console.log(err);
        })
    }
    deleteAddress(id){
        return this._http.delete(this.addressApi+id).map((res)=>{
            return res.json();
        }).catch((error):any=>{console.log(error)});
    }
}