import { Injectable } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { StorageService } from "../services/storage.service";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { UserType } from '../models/user.model';

@Injectable()

export class AuthService {
    user: Observable<firebase.User>;
    authUr: string = "http://localhost:3000/api/authentication/clients";
    authToken: string = "http://localhost:3000/api/authentication/client_token";
    constructor(public AF: AngularFireAuth, private storeService:StorageService, 
        private _router:Router, private DB:AngularFireDatabase, private _http:Http){
        this.user = AF.authState;
    }

    authState(){
       return this.AF.authState;
    }
    createUserAccount(key, user){
        let AccRef = this.DB.object('users/'+key);
            return AccRef.set(user).then((res)=>{
                return res;
            }).catch(err=> console.log(err));
    }

    createUser(user){
        if(user){
       return this.AF.auth.createUserWithEmailAndPassword(user.email, user.password);
        }
    }

    emailLogin(user){
        if(user){
            return this.AF.auth.signInWithEmailAndPassword(user.email, user.password);
        }
    }

    loginFacebook() {
        this.AF.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res=>{console.log(res.user.providerData)})
        .catch(error=>{console.log(error)});
    }

    loginGoogle() {
        this.AF.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(res=>{console.log(res)})
        .catch(error=>{console.log(error)});
    }

    logout() {
        this.AF.auth.signOut()
            .then((res)=> {
                this.storeService.cleardata('user');
                setTimeout(()=>{this._router.navigate(["/login"]);}, 500)
                
            })
            .catch(error=> console.log(error));
    }
    //User access control to the api resources
    clientRegistration(user){
        let Option:RequestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return this._http.post(this.authUr, user, Option).map((data)=>{
            return data.json();
        }, (err)=>{console.error(err.message)});
    }
    getClientToken(user){
        let Option:RequestOptions = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });
        return this._http.post(this.authToken, user, Option).map((data)=>{
            return data.json();
        }, (err)=>{console.error(err.message)});
    }
}
