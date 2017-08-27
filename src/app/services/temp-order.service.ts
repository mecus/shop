import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http, URLSearchParams, RequestOptions, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';



@Injectable()

export class TempOrderService {

    constructor(private _AF_db:AngularFireDatabase){

    }
    getTempOrder(key):Observable<any>{
        return this._AF_db.object('/tempOrder/'+key);
        
    }
    createTempOrder(key, order){
        let dbRef = this._AF_db.object('/tempOrder/'+key);
           return dbRef.set(order).then((res)=>{
                console.log(res);
                return res;
            },
        (error)=>{
            if(error) console.log(error); return;
        });
    }
    updateTempOrder(key, order?, total?){
        let dbRef = this._AF_db.object('/tempOrder/'+key);
        if(order){
            dbRef.update(order).then((res)=>{console.log(res); return res}, (err)=>console.log(err));
        }
        if(total){
            dbRef.update(total).then((res)=>{console.log(res); return res}, (err)=>console.log(err));
        }
        
    }
    deleteTemOrder(key){
       let dbRef = this._AF_db.object('/tempOrder/'+key);
       return dbRef.remove().then((res)=>{
           console.log(res);
           return res;
        },(err)=>console.log(err));
    }

}