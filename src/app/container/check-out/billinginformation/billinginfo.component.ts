import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { iCustomer } from 'app/models/customer.model';
import { Router } from '@angular/router';
import { CheckoutService } from "app/services/checkout.service";
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
    titles = ["Mr", "Mrs", "Miss", "Rev."];
    constructor(private _fb:FormBuilder, private _router:Router,
    private checkoutService:CheckoutService, private authService:AuthService,
    private storeService:StorageService){
        this.BForm = _fb.group({
            title: "",
            first_name: [null, Validators.required],
            last_name: null,
            email: null,
            telephone: null,
            billing_address: _fb.group({
                address: null,
                address2: null,
                post_code: null,
                city: null,
                country: null
            }),
            selected_address: null,
            age_limit: null,
            terms: null,
            password: null,
            passwordrepeat: null,
            contact_permission: null,
            delivery_address: _fb.group({
                full_name: null,
                address: null,
                address2: null,
                post_code: null,
                city: null,
                country: null,
            })
        })
    }
    createCustomer(customer):void{
        let user = {
            email: customer.email,
            password: customer.password

        }
        let deliveryTo = {
            full_name: customer.delivery_address.full_name,
            address: customer.delivery_address.address,
            address2: customer.delivery_address.address2,
            post_code: customer.delivery_address.post_code,
            city: customer.delivery_address.city,
            country: customer.delivery_address.country

        }
        let billingTo = {
            address: customer.billing_address.address,
            address2: customer.billing_address.address2,
            post_code: customer.billing_address.post_code,
            city: customer.billing_address.city,
            country: customer.billing_address.country,
        }
        let registration = {
            title: customer.title,
            email: customer.email,
            first_name: customer.first_name,
            last_name: customer.last_name,
            telephone: customer.telephone,
            billing_address: billingTo,
            terms: customer.terms,
            age_limit: customer.age_limit,
            contact_permission: customer.contact_permission,
            uid: "",
            selected_address: customer.selected_address,
            delivery_address: deliveryTo
        }
        if(customer){
            if(user){
                this.authService.createUser(user).then((res)=>{
                    registration.uid = res.uid;
                    console.log(res);
                    this.storeService.storeData('user', res);
                    this.storeService.storeData('email', customer.email);
                    this.checkoutService.createAccount(registration);
                    setTimeout(()=>{
                        this._router.navigate(["/account_update"]);
                    }, 500)
                }).catch((error)=>{
                    console.log(error);
                })
            }

        }
        // this.checkoutService.createCustomer(registration);
        
    }
    @HostListener('change', ['$event']) onChange($event){
        $event.preventDefault;
        switch($event.value){
            case 'Deliver to this Address':
                this.sameAddress = true;
                this.differentAddress = false;
                break;
            case 'Deliver to different address':
                this.differentAddress = true;
                this.sameAddress = false;
                break;
            default: 
                this.differentAddress = true;
                break;
        }
        this.BForm.patchValue({
            selected_address: $event.value
        })

    }
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
            },
            delivery_address: {
                country: "United Kingdom"
            }
        })
    }
    ngOnInit(){
        this.patchFormData();
        // this.checkoutService.getAccount("yUUuLRxV53bhNKd6a3S2weOPa852")
        // .subscribe((account)=>{
        //     console.log(account);
        // })

    }
}