import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { AuthService } from "../../../authentications/authentication.service";
import { AccountService } from "../../../services/account.service";
import { StorageService } from "../../../services/storage.service";
import { WindowService } from "../../../services/window.service";

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {
    register:boolean;
    guest:boolean;
    showCard:boolean = false;
    loginErrMsg;
    loginForm: FormGroup;
    constructor(private _fb:FormBuilder, private authService:AuthService,
    private accountService:AccountService, private _router:Router,
    private storeService:StorageService, private windowService:WindowService){
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
            this.showCard = true;
            return;
        }
        if($event.value == "guest"){
            this.register = false;
            this.guest = true;
            this.showCard = true;
            return;
        }
        
    }
    userLogin(user){
        console.log(user)
        if(!user.email && !user.password){
            return this.loginErrMsg = "fields must not be empty!";
        }

        this.authService.emailLogin(user).then((res)=>{
           this.storeService.storeData('user', res);
           this.storeService.storeData('email', res.email);
           this.accountService.getAccount(res.email).subscribe((account)=>{
               this.accountService.getAddress(account._id).subscribe((addresses)=>{
                    this.storeService.storeData('postcode', addresses[0].post_code);
                    this._router.navigate(["/payment_method"]);
               });
           });
     
        },(err)=>{
            console.log(err)
            this.loginErrMsg = err.message;
        })
    }

    ngOnInit(){
        if(!this.storeService.retriveData('token')){
            this.storeService.getPaymentToken();
        }
       this.authService.authState().subscribe((state)=>{
           if(state){
            
            if(!this.storeService.retriveData('token')){
                this.storeService.getPaymentToken();
                this.windowService.getWindowObject().setTimeout(()=> {
                    this._router.navigate(["/payment_method"]);
                }, 1000);
              }else{
                this._router.navigate(["/payment_method"]);
              } 
           }
       })
       
    }
    ngOnDestroy(){
        
    }
}