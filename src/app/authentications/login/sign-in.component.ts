import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { StorageService } from "app/services/storage.service";
import { AccountService } from "app/services/account.service";



@Component({
    selector: 'login',
    templateUrl: 'sign-in.component.html',
    styleUrls: ['sign-in.component.scss']
})

export class LoginComponent implements OnInit {
    user:FormGroup;
    errMsg;
    posterror;

    constructor(private storeService:StorageService, private location:Location, 
    private authService:AuthService, private accountService:AccountService,
    private _fb:FormBuilder, private _router:Router){
        this.user = this._fb.group({
            email: [null, Validators.required],
            password: [null, Validators.required]
        }) 
    }
    logIn(user):void{
       this.authService.emailLogin(user).then((res)=>{
           this.storeService.storeData('user', res);
           this.storeService.storeData('email', res.email);
           //Note! Query account with the ac_no of the customer 
           this.accountService.getAccount(res.email).subscribe((account)=>{
               this.storeService.storeData('postcode', account.billing_address.post_code);
               
           })
           this._router.navigate(['/']);
        // this.location.back();
        })
        .catch((err)=>{
            console.log(err);
            this.errMsg = err.message;
            // switch(err.code){

            // }
        })  
    }

    postCodeSearch(post):void{
        console.log(post)
        if(post == ""){
            this.posterror = "Post code must not be empty!"
        }else{
            this.storeService.storeData('tempcode', post);
            this._router.navigate(["/register"]);
        }
       
    }
    facebooklogin(){
        this.authService.loginFacebook();
        this.authService.authState();
    }
    googlelogin(){
        this.authService.loginGoogle();
        this.authService.authState();
    }
    signOut():void{
        this.authService.logout();
        this.authService.authState();
    }
    ngOnInit(){
        
    }
}