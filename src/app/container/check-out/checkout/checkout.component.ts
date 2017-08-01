import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { AuthService } from "app/authentications/authentication.service";
import { CheckoutService } from "app/services/checkout.service";
import { StorageService } from "app/services/storage.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {
    register:boolean;
    guest:boolean;
    loginForm: FormGroup;
    constructor(private _fb:FormBuilder, private authService:AuthService,
    private checkoutService:CheckoutService, private _router:Router,
    private storeService:StorageService){
        this.loginForm = _fb.group({
            email: "",
            password: ""
        })
    }
    @HostListener('change', ['$event']) onChnage($event){
        $event.preventDefault;
        if($event.value == "register"){
            this.guest = false;
            this.register = true;
            return;
        }
        if($event.value == "guest"){
            this.register = false;
            this.guest = true;
            return;
        }
        
    }
    userLogin(user){
        console.log(user)
        if(!user.email && !user.password){
            return;
        }
        this.authService.emailLogin(user).then((res)=>{
            console.log(res);
        this.storeService.storeData('email', user.email);
        this._router.navigate(["/account_update"]);
        }).catch(err=>console.log(err));
    }

    ngOnInit(){
       this.authService.authState().subscribe((state)=>{
           if(state.uid){
            this._router.navigate(["/account_update"]);
           }
       })
    }
    ngOnDestroy(){
        
    }
}