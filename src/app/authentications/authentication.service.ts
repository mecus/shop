import { Injectable } from '@angular/core'
import { AngularFireAuth } from 'angularfire2/auth';
import { StorageService } from "app/services/storage.service";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
    user: Observable<firebase.User>;
    constructor(public AF: AngularFireAuth, private storeService:StorageService, private _router:Router){
        this.user = AF.authState;
    }

    authState(){
       return this.AF.authState;
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
}
