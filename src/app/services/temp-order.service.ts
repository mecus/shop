import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http, URLSearchParams, RequestOptions, RequestOptionsArgs, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import { TempOrderType } from "../models/tempOrder.model";
import { AuthService } from '../authentications/authentication.service';


@Injectable()

export class TempOrderService {
    orderDoc:AngularFirestoreDocument<TempOrderType>;
    constructor(private _AFs:AngularFirestore, private authService: AuthService){
        authService.authState().subscribe(user=>{
            this.orderDoc = _AFs.doc<TempOrderType>('tempOrder/'+user.uid);
        });
        
    }
    getTempOrder(key){
        return this.orderDoc.valueChanges();
        
    }
    createTempOrder(key, order:TempOrderType){
           return this.orderDoc.set(order).then((res)=>{
                console.log(res);
            },
        (error)=>{
            if(error) console.log(error); return;
        });
    }
    updateTempOrder(key, order?, total?){
        if(order){
            this.orderDoc.update(order);
        }
        if(total){
            this.orderDoc.update(total).then((res)=>{console.log(res)}).catch(err=>console.log(err));
        }
        
    }
    deleteTemOrder(key){
       return this.orderDoc.delete().then((res)=>{
           return res;
        },(err)=>console.log(err));
    }

}