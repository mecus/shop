import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';

@Injectable()

export class ShopService {

    constructor(){

    }

    termsCondition(){
        return this.terms;
    }

    terms = `
        <h1>1. DEFINITION OF TERMS</h1>
        <p>
        "You" and "Your" means the person ordering Goods from ASDA, who must be over 18 years of age.
        
        "URGY" or "We" or "Us" or "Our" means URGY Stores Limited whose registered office is at ASDA House, Southbank, Great Wilson Street, Leeds, LS11 5AD except for customers making payment with a Visa or MasterCard credit card, in which case it means ASDA Home Shopping Cards Limited whose registered office is at 3 Burlington Road, Dublin 4, Ireland.
        </p>
        <h1>2. TERMS OF USE</h1>
        <strong> 2.1 Use of and access to the Site </strong>
        <p>
        <small>2.1.1 From time to time it will be necessary for us to carry out maintenance on the Site which may result in occasional periods of downtime.</small><br>
        <small>2.1.2 We can't promise that the Site will be uninterrupted or error-free or that defects in the Site will be corrected.</small><br>
        "You" and "Your" means the person ordering Goods from ASDA, who must be over 18 years of age.
        
        "URGY" or "We" or "Us" or "Our" means URGY Stores Limited whose registered office is at ASDA House, Southbank, Great Wilson Street, Leeds, LS11 5AD except for customers making payment with a Visa or MasterCard credit card, in which case it means ASDA Home Shopping Cards Limited whose registered office is at 3 Burlington Road, Dublin 4, Ireland.
        </p>
    `

}