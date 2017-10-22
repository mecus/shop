import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';

@Injectable()

export class OrderService {
    host: string = "https://urgyshop.herokuapp.com/";
    itemUrl: string = "items/";
    url;
    options:RequestOptions;
    constructor(private _http:Http){
        this.url = this.host+"api/v1/stores/orders/";

        this.options = new RequestOptions({
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
    }
    getOrders(customer_no){
        return this._http.get(this.url+customer_no).map((orders)=>{
            return orders.json();
        },(err)=>console.log(err));
    }

    postOrder(order){
        return this._http.post(this.url, order, this.options).map((res)=>{
            return res.json();
        }, (err)=>console.log(err));
        // .subscribe();
    }
    createOrderItems(item){
       return this._http.post(this.url+this.itemUrl, item, this.options)
        .map((data)=>{
            return data.json();
        },(err)=>console.log(err));
        // .subscribe();
    }
}