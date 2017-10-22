import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { 
    AngularFirestore, 
    AngularFirestoreCollection, 
    AngularFirestoreDocument 
} from 'angularfire2/firestore';
import { Http } from '@angular/http';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { iCart } from '../models/cart.model';
import { StorageService } from './storage.service';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';


@Injectable()

export class CartService {
    db = firebase.firestore();
    private oneCart;
    cartSum = 200;
    private cartCollection: AngularFirestoreCollection<iCart>;
    constructor(private _afs:AngularFirestore,
    private storeService:StorageService){
        this.cartCollection = _afs.collection<iCart>('carts');
    }


    createCart(cart:iCart){
        let postcode = this.storeService.retriveData('postcode');
        let carts = this.db.collection("carts").where('postcode', '==', postcode).where('name', '==', cart.name);

        carts.get().then((querySnapshot) => {
            
            if(querySnapshot.docs.length){
                const data = {id: querySnapshot.docs[0].id, data: querySnapshot.docs[0].data()}
                this._afs.doc('carts/'+ data.id)
                .update({qty: data.data.qty + 1});
            }else{
                this.cartCollection.add(cart);
            }
        });
    }
    getCart(){
        return this.cartCollection.valueChanges();
    }
    getListCart(){
        return this.cartCollection.snapshotChanges();
    }

    incrementCart(cart){
        console.log(cart);
        let data = {
            qty: cart.data.qty + 1
        }
        let catRef = this._afs.doc('carts/'+ cart.id);
        catRef.update(data);
        return;
    }
    decrementCart(cart):Observable<iCart>{
         let data = {
            qty: cart.data.qty - 1
        }
        let catRef = this._afs.doc('carts/'+ cart.id);
        catRef.update(data);
        return;
    }
    removeCart(cart):Observable<iCart>{
        let catRef = this._afs.doc('carts/'+ cart.id);
        catRef.delete();
        return;
    }

    removeBatchCart(postcode){
        this.getListCart().map((cartList)=>{
            const extCart = cartList.map(cart=>{
               const data = cart.payload.doc.data() as iCart
               const id = cart.payload.doc.id
               return {id, data}
            });
            if(!extCart){return null;}
            extCart.filter(res=>res.data.postcode == postcode)
            .forEach((cat)=>{
                this._afs.doc('carts/'+cat.id)
                    .delete().then((res)=>console.log(res))
                        .catch((error)=> console.log(error));
                });
        }).subscribe();
    
    }

    
    cartTotal(){
        return this.cartCollection.valueChanges();
    }
    
    getTotal(){
       this.cartTotal().subscribe((carts)=>{
        let total = carts.filter(cart=> cart.postcode == this.storeService.retriveData('postcode'))
        .map(cart=>cart.qty * Number(cart.price));
         this.cartSum = total.reduce(this.reducePrice, 0).toFixed(2);
        });
        return this.cartSum;
    }
    reducePrice(sum, num){
        return sum + num;
        
    }


}