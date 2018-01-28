import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';
import * as localForage from "localforage";
import * as cartActions from '../store-management/actions/cart.action';
import { Store } from '@ngrx/store';
import { Auth } from '../store-management/models/auth.model';
import * as authActions from '../store-management/actions/auth.action';

interface iShop {
    dept_id: string,
    aisle_id: string,
    cat_id: string,
    product_id: string
}
@Injectable()
export class DbService{
    store;
    request;
    db;
    constructor(private sTore: Store<any>){
         this.store = localForage.createInstance({
            name: "shop"
          });
          const dbName = "shopDb"
          if(window.indexedDB){
            this.request = window.indexedDB.open(dbName, 1);
            
          }else{
              alert("Your Browser does not support some features on this website!!");
          }
          
    }
    // Creating IndexedDb for Cart Services
    createDb () {
        // onupgradeneeded Only run once 
        this.request.onupgradeneeded = (event:any) => {
            this.db = null;
            this.db = event.target.result;
            console.log("INDEXDB:", this.db);
              // Create an objectStore for this database
            if(this.db){
                let objectStore = this.db.createObjectStore("carts", { keyPath: "id", autoIncrement : true });
                let objectStore1 = this.db.createObjectStore("auth", { keyPath: "id", autoIncrement : true });
                objectStore.createIndex("pid", "pid", { unique: true });
                objectStore.createIndex("id", "id", { unique: true });
                objectStore1.createIndex("uid", "uid", { unique: true });
                objectStore1.createIndex("id", "id", { unique: true });
            }else{
                console.log("ObjectStore can not be created");
            }

        };  
        this.request.onerror = (event) => {
            console.error(event);
            // Do something with request.errorCode!
        };
        this.request.onsuccess = (e:any) => {
            this.db = e.target.result;
            console.log(`
            DATABASE_NAME: ${this.db.name}
            VERSION: ${this.db.version}
            STATUS: Open for business
            `);
        }

    }
    // Create User Authentication
    getInitialAuth(){
        let transaction = this.db.transaction(["auth"], "readwrite");
        let store = transaction.objectStore("auth");
        let index = store.index("id");
        let authUser = index.openCursor();
        authUser.onsuccess = (e:any)=>{
            let cursor = e.target.result;
            if(cursor){
                // Carts$.push(cursor['value']);
                this.sTore.dispatch({type: authActions.AUTHLOAD, payload: cursor['value']});
                cursor.continue();
            }
        }
        authUser.onerror = (e) => {
            console.log(e);
        }
        
    }
    getUserSession(id){
        let transaction = this.db.transaction(["auth"], "readwrite");
        let store = transaction.objectStore("auth");
        let index = store.index("id");
        return new Promise(function(resolve, reject){
            index.get(id).onsuccess = (e) => {
                resolve(e.target.result);
            }
        });  
    }
    clearUserSession(){
        let transaction = this.db.transaction(["auth"], "readwrite");
        let store = transaction.objectStore("auth");
        return new Promise(function(resolve, reject){
            let clear = store.clear()
            clear.onsuccess = (e) => {
                resolve(e.target.source.name);
            }
            clear.onerror = (e) => {
                reject(e);
            }

        });
    }
    async createUserSession(user: Auth){
        let transaction = this.db.transaction(["auth"], "readwrite");
        let store = transaction.objectStore("auth");
        let index = store.index("uid");
        let clearUser = await new Promise(function(resolve, reject){
            let clear = store.clear()
            clear.onsuccess = (e) => {
                resolve(e.target.source.name);
            }
            clear.onerror = (e) => {
                reject(e);
            }

        });
        console.log(clearUser);
        let id = await new Promise(function(resolve, reject){
            let upRequest = store.add(user);
                upRequest.onsuccess = (e) => {
                    console.log('user session created');
                    resolve(e.target.result);
                }
                upRequest.onerror = (e)=> {
                    reject(e);
                }
        });
        return this.getUserSession(id);
    }


    // Inserting item to the cart table
    async createCart(cat){
        if(!cat.pid){
            return;
        }
        console.log("Cat To Insert Or Update", cat);
        let transaction = this.db.transaction(["carts"], "readwrite");
        let store = transaction.objectStore("carts");
        let index = store.index("pid");

        let updatCat:any = await new Promise(function(resolve, reject){
            index.get(cat.pid).onsuccess = (e) => {
                resolve(e.target.result);
            }
        });
        console.log("Found Cart:", updatCat);
        if(updatCat){
            
            let lasUp = Number(updatCat.qty) + Number(cat.qty);
            updatCat.qty = lasUp;
            let id = await new Promise(function(resolve, reject){
                let upRequest = store.put(updatCat);
                    upRequest.onsuccess = (e) => {
                        console.log('cart updated');
                        resolve(e.target.result);
                    }
                    upRequest.onerror = (e)=> {
                        reject(e);
                    }
            });
            console.log(id);
            console.log("Return One Cart:", this.getOneCart(id));
            return this.getOneCart(id);
            

        }else{
            let id = await new Promise(function(resolve, reject){
                let request = store.add(cat);
                    request.onsuccess = (e) => {
                        console.log('new cart created');
                        resolve(e.target.result);
                    }
                    request.onerror = (e)=> {
                        reject(e);
                    }
            });
            // return  updatedCart;
            console.log(id);
            console.log("Return One Cart:", this.getOneCart(id));
            return this.getOneCart(id);
            
        }
        
    }
    async updatedCart(cat){
        if(!cat.pid){
            return;
        }
        console.log("Cat To Update", cat);
        let transaction = this.db.transaction(["carts"], "readwrite");
        let store = transaction.objectStore("carts");
        let index = store.index("pid");
        // Find the cart to update
        let updatCat:any = await new Promise(function(resolve, reject){
            index.get(cat.pid).onsuccess = (e) => {
                resolve(e.target.result);
            }
        });
        if(cat.do == "increment"){
            let lasUp = Number(updatCat.qty) + 1;
            updatCat.qty = lasUp;
            let updatedId = await new Promise(function(resolve, reject){
                let upRequest = store.put(updatCat);
                    upRequest.onsuccess = (e) => {
                        console.log('Increment cart updated');
                        resolve(e.target.result);
                    }
                    upRequest.onerror = (e)=> {
                        reject(e);
                    }
            });
            return this.getOneCart(updatedId);
        }
        if(cat.do == "decrement"){
            let lasUp = Number(updatCat.qty) - 1;
            if(lasUp < 1){
                return this.removeCart(cat);
            }else{
            updatCat.qty = lasUp;
            let updatedId = await new Promise(function(resolve, reject){
                let upRequest = store.put(updatCat);
                    upRequest.onsuccess = (e) => {
                        console.log('decrement cart updated');
                        resolve(e.target.result);
                    }
                    upRequest.onerror = (e)=> {
                        reject(e);
                    }
            });
            return this.getOneCart(updatedId);
            }   
        }

        
    }
    async removeCart(cart){
        let id = cart.id;
        let request = this.db.transaction(["carts"], "readwrite")
            .objectStore("carts")
            .delete(id);
        return await new Promise((resolve, reject) => {
            request.onsuccess = (e) => {
                console.log("Deleted", cart);
                cart.qty = 0;
                resolve(cart);
            }
            request.onerror = (e) => {
                reject(e);
            }   
        });
    }
    clearCart(){
        let transaction = this.db.transaction(["carts"], "readwrite");
        let store = transaction.objectStore("carts");
        let CartDeleteRequest = store.clear();
        CartDeleteRequest.onsuccess = (e) => {
            console.log("Cart Table cleared", e);
        }
        CartDeleteRequest.onerror = (e) => {
            console.log(e);
        }
    }
    async getOneCart(id){
        let transaction = this.db.transaction(["carts"], "readwrite");
        let store = transaction.objectStore("carts");
        let index = store.index("id");

        return await new Promise(function(resolve, reject){
            index.get(id).onsuccess = (e) => {
                // console.log(e.target.result);
                resolve(e.target.result);
            }
        });
        
    }
    retrieveCart(){
        let Carts$ = [];
        let transaction = this.db.transaction(["carts"], "readonly");
        let store = transaction.objectStore("carts");
        let index = store.index("pid");
        index.openCursor().onsuccess = (e)=>{
            let cursor = e.target.result;
            if(cursor){
                Carts$.push(cursor['value']);
                cursor.continue();
            }
        }
        return Carts$;
    }
    retrieveInitialCart(){
        let transaction = this.db.transaction(["carts"], "readonly");
        let store = transaction.objectStore("carts");
        let index = store.index("pid");
        index.openCursor().onsuccess = (e:any)=>{
            let cursor = e.target.result;
            if(cursor){
                // Carts$.push(cursor['value']);
                this.sTore.dispatch({type: cartActions.INITIAL_STATE, payload: cursor['value']});
                cursor.continue();
            }
        }
        return;
    }


    // Persisting shop state in the database
    setShopDatabase(data){
        return this.store.setItem('initialState', data)
        .then(res => {
            return res;
        }).catch(err => console.log(err));
    }
    async updateShopDatabase(data){
        let newdata = await this.store.getItem('initialState')
        .then((res)=> {
            return res;
        }).catch(err => console.log(err));
        // console.log(newdata);
        if(newdata){
            return await this.store.setItem('initialState', {...newdata, ...data})
            .then(res => {
                return res;
            }).catch(err => console.log(err));
        }
        return await this.store.setItem('initialState', {...data})
        .then(res => {
            return res;
        }).catch(err => console.log(err));
 
    }
    getShopDatabase(key){
        return this.store.getItem(key);
    }
}