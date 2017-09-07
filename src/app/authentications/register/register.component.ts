import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../authentication.service';
import { StorageService } from "../../services/storage.service";
import { Router } from '@angular/router';
import { AddressSearchService } from "../../services/addresssearch.service";
import { AccountService } from "../../services/account.service";


function passwordMather(c:AbstractControl){
    return c.get('password').value === c.get('confirmpassword').value
    ? null : {'nomatch': true};
}


@Component({
  selector: 'app-register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUser: FormGroup;
  errMsg;
  setPostcode;
  searchResult;
  searchResultErr;
  searchNotFound;
  posterror;
  setTempcode;
  progressOn:boolean = false;
  titles;
  color = 'Accent';
  mode = 'indeterminate';

  constructor(private storeService:StorageService, private _router:Router, private _fb:FormBuilder, 
  private authService:AuthService, private addressService:AddressSearchService,
  private accountService:AccountService) {
    
    this.newUser = _fb.group({
      title: [null, Validators.required],
      email: [null, Validators.required],
      password: [null, Validators.required, Validators.minLength(8)],
      confirmpassword: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      telephone: _fb.group({
        home: null,
        mobile: null
      }),
      billing_address: _fb.group({
          address: null,
          address2: null,
          post_code: null,
          city: null,
          country: "United Kingdom"
      }),
      terms: null,
      age_limit: null,
      contact_permission: null,
    }, {validator: passwordMather})

  this.getTitle();
  }
  getTitle(){
    this.titles = this.accountService.getTitle();
  }
   @HostListener('change', ['$event']) onChnage($event){
     $event.preventDefault;
     this.newUser.patchValue({
       contact_permission: $event.value
     });
   }
  register(customer){
    let user = {
      email: customer.email,
      password: customer.password
    }
    let address = {
        account_id: "",
        address_type: "billing",
        full_name: customer.first_name+" "+customer.last_name,
        address: customer.billing_address.address,
        address2: customer.billing_address.address2,
        post_code: customer.billing_address.post_code,
        city: customer.billing_address.city,
        country: customer.billing_address.country
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
      uid: ""
    }
    // console.log(registration);
    // console.log(user);
    if(user.email){
       this.authService.createUser(user).then((ruser)=>{
        account.uid = ruser.uid;
       this.storeService.storeData('user', ruser);
       this.storeService.storeData('email', ruser.email);
       this.accountService.createAccount(account, address);
       this._router.navigate(["/"]);
     }).catch((err)=>{
       this.errMsg = err.message;
      console.log(err);
     })
    }
   }
   postCodeSearch(postcode){
    let code = postcode.toUpperCase();
     if(postcode == ""){
          this.posterror = "Post code must not be empty!";
          return;
     }else{
       this.progressOn = true;
      // this.storeService.storeData('postcode', postcode);
      this.addressService.findAddres(postcode).subscribe((address)=>{
        console.log(address.addresses[0]);
        if(address.addresses[0].includes('London')){
          this.setPostcode = code;
          this.storeService.storeData('postcode', code);
          this.storeService.cleardata('tempcode');
          setTimeout(()=>{
            this.progressOn = false;
            this.searchNotFound = false;
            this.searchResultErr = false;
            this.searchResult = true;
          }, 1000); 
        }else{
          this.progressOn = false;
          this.searchResult = false;
          this.searchNotFound = false;
          this.searchResultErr = true;
          return;
        }
      },(err)=>{
        console.log(err.message);
        this.progressOn = false;
        this.searchResult = false;
        this.searchResultErr = false;
        this.searchNotFound = true;
      });
     }  
  }

  ngOnInit() {
    this.setPostcode = this.storeService.retriveData('postcode');
    if(this.setPostcode){
      this.searchResult = true;
    }
    if(!this.storeService.retriveData('tempcode')){
      this.setTempcode = this.storeService.retriveData('postcode');
    }else{
    this.setTempcode = this.storeService.retriveData('tempcode');
    }
    
    this.newUser.patchValue({
      billing_address: {
        post_code: this.storeService.retriveData('postcode')
      }
    })
  }

}
