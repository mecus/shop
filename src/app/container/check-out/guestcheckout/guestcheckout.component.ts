import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { Router } from '@angular/router';
import { iCustomer } from 'app/models/customer.model';
import { AuthService } from "app/authentications/authentication.service";
import { CheckoutService } from "app/services/checkout.service";

@Component({
  selector: 'guest-checkout',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss']
})

export class GuestCheckoutComponent implements OnInit {
    BForm: FormGroup;
    sameAddress:boolean;
    differentAddress:boolean;
    titles = ["Mr", "Mrs", "Miss", "Rev."];
    constructor(private _fb:FormBuilder, private _router:Router,
    private authService:AuthService, private checkoutService:CheckoutService){
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
   createCustomer(customer){
   
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
        // this.checkoutService.createAccount(registration);
        console.log(registration);
        this._router.navigate(["/checkout"]);
    }
    ngOnInit(){

    }
}