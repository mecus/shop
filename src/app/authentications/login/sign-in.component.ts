import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { StorageService } from "app/services/storage.service";


@Component({
    selector: 'login',
    templateUrl: 'sign-in.component.html',
    styleUrls: ['sign-in.component.scss']
})

export class LoginComponent implements OnInit {
    user:FormGroup;
    errMsg;
    posterror;

    constructor(private storeService:StorageService, private authService:AuthService, private _fb:FormBuilder, private _router:Router){
        this.user = this._fb.group({
            email: ["", Validators.required],
            password: ["", Validators.required]
        }) 
    }
    logIn(user){
       this.authService.emailLogin(user).then((res)=>{
           this.storeService.storeData('user', res);
           this._router.navigate(["/"]);
        })
        .catch((err)=>{
            console.log(err);
            this.errMsg = err.message;
            // switch(err.code){

            // }
        })  
    }

    postCodeSearch(post){
        console.log(post)
        if(post == ""){
            this.posterror = "Post code must not be empty!"
        }else{
            this.storeService.storeData('postcode', post);
            this._router.navigate(["/register"]);
        }
       
    }
    facebooklogin(){
        this.authService.loginFacebook();
        this.authService.authChange();
    }
    googlelogin(){
        this.authService.loginGoogle();
        this.authService.authChange();
    }
    signOut(){
        this.authService.logout();
        this.authService.authChange();
    }
    ngOnInit(){
        
    }
}