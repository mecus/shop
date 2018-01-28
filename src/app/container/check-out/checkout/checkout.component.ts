import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { AuthService } from "../../../authentications/authentication.service";
import { AccountService } from "../../../services/account.service";
import { StorageService } from "../../../services/storage.service";
import { WindowService } from "../../../services/window.service";
import { ProgressService } from '../../../services/checkout-progress.service';

@Component({
  selector: 'app-checkout',
  templateUrl: 'checkout.component.html',
  styleUrls: ['checkout.component.scss']
})

export class CheckoutComponent implements OnInit, OnDestroy {
    register:boolean;
    loginErrMsg;
    loginForm: FormGroup;
    checkOutProg;
    constructor(private _fb:FormBuilder, private authService:AuthService,
    private accountService:AccountService, private _router:Router,
    private storeService:StorageService, private windowService:WindowService,
    private progressService:ProgressService){
        this.loginForm = _fb.group({
            email: "",
            password: ""
        })
    }
    checkContinue(e){
        let bill = {name: "billing"}
        this.register = e.checked;
        if(e.checked == true){
            setTimeout(()=>{
                window.scrollTo(0, 420);
            }, 100);
            // this.progressService.setProgress(bill);
            // this._router.navigate(["/payment_method"]);
            
        }
        // this.progressService.setProgress(bill);
    }

    userLogin(user){
       
        if(!user.email && !user.password){
            return this.loginErrMsg = "fields must not be empty!";
        }
        this.authService.authState().subscribe((state)=>{
            if(state){
                return this.loginErrMsg = `A user has already logged on with ${state.email}`;
            }else{
                this.authService.emailLogin(user).then((res)=>{
                    this.storeService.storeData('user', res);
                    this.storeService.storeData('email', res.email);
                    this.storeService.storeData('uid', res.uid);
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
        });
        
    }

    ngOnInit(){
        // this.progressService.deleteProgress();
        if(!this.storeService.retriveData('token')){
            this.storeService.getPaymentToken();
        }
       this.authService.authState().subscribe((state)=>{
           if(state){
            let bill = {name: "billing"}
            this.progressService.setProgress(bill);
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