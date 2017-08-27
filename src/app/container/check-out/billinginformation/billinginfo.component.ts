import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { iCustomer } from 'app/models/customer.model';
import { Router } from '@angular/router';
import { AccountService } from "app/services/account.service";
import { AuthService } from "app/authentications/authentication.service";
import { StorageService } from "app/services/storage.service";

@Component({
  selector: 'billing-address',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})

export class BillingInfoComponent implements OnInit {
    BForm: FormGroup;
    sameAddress:boolean;
    differentAddress:boolean;
    errorMsg;
    titles = ["Mr", "Mrs", "Miss", "Rev."];
    constructor(private _fb:FormBuilder, private _router:Router,
    private accountService:AccountService, private authService:AuthService,
    private storeService:StorageService){
        this.BForm = _fb.group({
            title: null,
            first_name: [null, Validators.required],
            last_name: null,
            email: null,
            telephone: _fb.group({
                home: null,
                mobile: null
            }),
            billing_address: _fb.group({
                address: null,
                address2: null,
                post_code: null,
                city: null,
                country: null
            }),
            age_limit: null,
            terms: null,
            password: null,
            passwordrepeat: null,
            contact_permission: null,
            address_type: null
           
        })
    }
    createCustomer(customer):void{
        if(!customer.email && !customer.first_name){
            this.errorMsg = "Please fill all required fields";
            this._router.navigate(["/payment_method"]);
            return;
        }
        let user = {
            email: customer.email,
            password: customer.password

        }
        let accountUser = {
            name: customer.first_name+" "+customer.last_name,
            email: customer.email,
            status: "unknown",
            createdAt: Date.now()
        }
        let address = {
            account_id: "",
            address_type: "Billing",
            full_name: customer.first_name+" "+customer.last_name,
            address: customer.billing_address.address,
            address2: customer.billing_address.address2,
            post_code: customer.billing_address.post_code,
            city: customer.billing_address.city,
            country: customer.billing_address.country,
        }
        let account = {
            title: customer.title,
            email: customer.email,
            first_name: customer.first_name,
            last_name: customer.last_name,
            telephone: {
                home: customer.telephone.home,
                mobile: customer.telephone.mobile
            },
            terms: customer.terms,
            age_limit: customer.age_limit,
            contact_permission: customer.contact_permission,
            uid: ""
        }
        if(customer){
            if(user){
                this.authService.createUser(user).then((res)=>{
                    account.uid = res.uid;
                    console.log(res);
                    this.storeService.storeData('user', res);
                    //Remove this line later
                    this.storeService.storeData('postcode', customer.billing_address.post_code);
                    this.storeService.storeData('email', customer.email);
                    this.accountService.createAccount(account, address);
                    this.authService.createUserAccount(res.uid, accountUser);
                    setTimeout(()=>{
                        this._router.navigate(["/payment_method"]);
                    }, 500)
                }).catch((error)=>{
                    console.log(error);
                })
            }

        }
        
    }
    // @HostListener('change', ['$event']) onChange($event){
    //     $event.preventDefault;
    //     switch($event.value){
    //         case 'Deliver to this Address':
    //             this.sameAddress = true;
    //             this.differentAddress = false;
    //             break;
    //         case 'Deliver to different address':
    //             this.differentAddress = true;
    //             this.sameAddress = false;
    //             break;
    //         default: 
    //             this.differentAddress = true;
    //             break;
    //     }
    //     this.BForm.patchValue({
    //         selected_address: $event.value
    //     })

    // }
     @HostListener('change', ['$event']) onChnage($event){
     $event.preventDefault;
     this.BForm.patchValue({
       contact_permission: $event.value
     });
   }
    patchFormData():void{
        this.BForm.patchValue({
            billing_address:{ 
                post_code: this.storeService.retriveData('postcode'),
                country: "United Kingdom"
            }
        })
    }
    ngOnInit(){
        this.patchFormData();
    }
}