import { Injectable } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { StorageService } from "../services/storage.service";
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserType } from '../models/user.model';
import { Store } from '@ngrx/store';
import * as authAction from '../store-management/actions/auth.action';
export type Actions = authAction.All;


@Injectable()

export class AuthService {
    user;
    accounts:AngularFirestoreCollection<any>;
    //authUrl + password_reset or password_email
    authUrl: string = "http://localhost:3000/api_v1/users/";
    authToken: string = "http://localhost:3000/api/authentication/client_token";
    constructor(
        public afa: AngularFireAuth, 
        private afs: AngularFirestore,
        private storeService: StorageService,
        private _router: Router, 
        private store: Store<Actions>, 
        private _http: HttpClient
    ){
        this.accounts = afs.collection('accounts');
        this.user = afa.authState;
    }

    authState(){
       return this.afa.authState;
    }
    updateUserAccount(key, user){
        // let AccRef = this.DB.object('users/'+key);
        // return AccRef.set(user).then((res)=>{
        //     return res;
        // }).catch(err=> console.log(err));
    }

    createUser(user){
        let header = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.authUrl, user, {headers: header});
    }

    emailLogin(user){
        return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    loginFacebook() {
        this.afa.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res=>{console.log(res.user.providerData)})
        .catch(error=>{console.log(error)});
    }

    loginGoogle() {
        this.afa.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res=>{console.log(res)})
        .catch(error=>{console.log(error)});
    }

    logout() {
        return this.afa.auth.signOut(); 
    }
    loginWithCustomToken(token){
        this.afa.auth.signInWithCustomToken(token).then((user)=>{
            console.log(user);
            this.getClientToken();
        })
        .catch((err)=>{
            console.log(err);
        });
    }

    //User access control to the api resources
    clientRegistration(user){
        let Option:RequestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return this._http.post(this.authUrl, user).map((data)=>{
            return data;
        }, (err)=>{console.error(err.message)});
    }
    async getClientToken(){
        let token:any = await new Promise((resolve, reject) => {
            this.afa.idToken.subscribe((token)=> {
                resolve(token);
            }, (err) => {
                reject(err);
            });
        });
        
        let currentuser = JSON.parse(this.b64DecodeUnicode(token.split('.')[1]))

        let user =  {
            type: 'auth',
            displayName: currentuser.name,
            email: currentuser.email,
            phone: currentuser.phone_number,
            status: 'USER LOGGED IN',
            timeIn: currentuser.auth_time,
            photoURL: currentuser.picture,
            token: token,
            uid: currentuser.user_id,
            who: currentuser.privilege,
            emailVerified: currentuser.email_verified
        }

        this.store.dispatch({type: authAction.LOGIN, payload: user});
    }
    b64DecodeUnicode(str: string): string {
        if (window
            && "atob" in window
            && "decodeURIComponent" in window) {
            return decodeURIComponent(Array.prototype.map.call(atob(str), (c) => {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
        } else {
            console.warn("b64DecodeUnicode requirements: window.atob and window.decodeURIComponent functions");
            return null;
        }
      }
}
