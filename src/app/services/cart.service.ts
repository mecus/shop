import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import * as firebase from 'firebase';
import { iCart } from '../models/cart.model';

@Injectable()

export class CartService {
    constructor(private _af:AngularFireDatabase){}

    createCart(cart):Observable<iCart>{
        return this._af.list('/carts')
         .push(cart).then(res=> console.log(res))
                     .catch(err=> console.log(err));
    }
    getCart():Observable<any>{
        return this._af.list('/carts');
    }
    incrementCart(cart):Observable<iCart>{
        let data = {
            qty: cart.qty + 1
        }

        let cartRef = firebase.database().ref('/carts/'+cart.key$);
            cartRef.update(data).then((res)=>console.log(res))
                                .catch((error)=> console.log(error));
        return;
    }
    decrementCart(cart):Observable<iCart>{
         let data = {
            qty: cart.qty - 1
        }
       
        let cartRef = firebase.database().ref('/carts/'+cart.key$);
            cartRef.update(data).then((res)=>console.log(res))
                                .catch((error)=> console.log(error));
        return;
    }
    removeCart(cart):Observable<iCart>{
        let cartRef = firebase.database().ref('/carts/'+cart.key$);
            cartRef.remove().then((res)=>console.log(res))
                                .catch((error)=> console.log(error));
        return;
    }

    
    cartTotal(){
        return this._af.list('/carts');
    }


}