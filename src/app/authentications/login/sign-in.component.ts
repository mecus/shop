import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../authentication.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { User } from 'app/models/user.model';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { StorageService } from "../../services/storage.service";
import { AccountService } from "../../services/account.service";
import { DbService } from '../../services/db.service';
import { WindowService } from '../../services/window.service';


@Component({
    selector: 'login',
    templateUrl: 'sign-in.component.html',
    styleUrls: ['sign-in.component.scss']
})

export class LoginComponent implements OnInit {
    hide = true;
    user:FormGroup;
    errMsg;
    posterror;
    toggForm;
    postcode;


    constructor(
        private storeService:StorageService, 
        private location:Location, 
        private authService:AuthService, 
        private accountService:AccountService,
        private _fb:FormBuilder, private _router:Router,
        private db: DbService,
        private windowService: WindowService,
    ){
        
        this.user = this._fb.group({
            email: [null, Validators.required],
            password: [null, Validators.required]
        }) 
    }

    logIn(user):void{  
       this.authService.emailLogin(user).then((res)=>{
            this.authService.getClientToken();
            this.windowService.getWindowObject().setTimeout(()=>{
                this.location.back();
            },500);
        })
        .catch((err)=>{
            console.log(err);
            this.errMsg = err.message;
            // switch(err.code){

            // }
        })  
    }

    postCodeSearch(post):void{
        // console.log(post)
        if(this.postcode){
            this._router.navigate(["/register"]);
        }else{
            let pcode = post.toUpperCase();
            if(post == ""){
                this.posterror = "Post code must not be empty!"
            }else{
                this.storeService.storeData('tempcode', pcode);
                this._router.navigate(["/register"]);
            }
        }
       
    }
    passwordRequest(){
        // this.toggForm = true;
        if(this.toggForm == true){
            this.toggForm = false;
        }else{
            this.toggForm = true;
        }
    }
    signOut():void{
        this.authService.logout();
        this.authService.authState();
    }
    goBack(){
        this.location.back();
    }
    ngOnInit(){
        this.db.createDb();
        // this.postcode = this.storeService.retriveData('postcode');

    }
}