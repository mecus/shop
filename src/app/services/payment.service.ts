import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AccountService } from './account.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';

@Injectable()

export class PaymentService {
    url:string;
    cardUrl: string;
    transactionUrl: string;
    constructor(private _http:Http){
       this.url = "http://localhost:3000/api/payment/checkout";
       this.cardUrl = "http://localhost:3000/api/payment/customer/";
       this.transactionUrl = "http://localhost:3000/api/payment/transaction";
    }

    public getClientToken():Observable<any>{
        return this._http.get(this.url).map((token)=>{
            return token.json();
        }).catch((error):any => console.log(error));
       
    }
    //Creating customer with payment method
    public createPaymentMethod(payload, id?, methd?){
        let data = {"nonce": payload, "uid": id, "method": methd};
        let options:RequestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        return this._http.post(this.url, data, options).map((res)=>{
            console.log(res);
            return res.json();
        }).catch((error):any=>console.log(error));
        // .subscribe();
    }
    //fatching customer with payment method
    fetchCard(key){
        return this._http.get(this.cardUrl+key).map((card)=>{
            return card.json();
        },(err)=>{
            console.log(err);
        });
    }
    //Creating payment transaction
    paymentTransaction(payment){
        let options:RequestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
    
       return this._http.post(this.transactionUrl, payment, options)
        .map((res)=>{
            return res.json();
        },(err)=>console.log(err));
    }
}