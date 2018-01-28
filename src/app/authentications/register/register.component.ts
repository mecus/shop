import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../authentication.service';
import { StorageService } from "../../services/storage.service";
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AddressSearchService } from "../../services/addresssearch.service";
import { AccountService } from "../../services/account.service";
import { WindowService } from '../../services/window.service';


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
  hide;
  errMsg;
  setPostcode;
  searchResult;
  searchResultErr;
  searchNotFound;
  posterror;
  setTempcode;
  progressOn:boolean = false;
  titles;

  constructor(
    private storeService:StorageService, 
    private _router:Router, private _fb:FormBuilder, 
    private authService:AuthService, 
    private addressService:AddressSearchService,
    private accountService:AccountService, 
    private _location:Location,
    private windowService: WindowService,
  ) {
    
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
      // billing_address: _fb.group({
      //     address: null,
      //     address2: null,
      //     post_code: null,
      //     city: null,
      //     country: "United Kingdom"
      // }),
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
  registerUser(customer){
    if(this.newUser.status == "INVALID"){
      window.scrollTo(0, 0);
      return this.errMsg = "Please fill in all required field";
    }
    let users = {
      email: customer.email,
      password: customer.password,
      emailVerified: false,
      phoneNumber: customer.telephone.mobile,
      displayName: customer.first_name,
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false
    }
    // let address = {
    //     account_id: null,
    //     address_type: "billing",
    //     full_name: customer.first_name+" "+customer.last_name,
    //     address: customer.billing_address.address,
    //     address2: customer.billing_address.address2,
    //     post_code: customer.billing_address.post_code,
    //     city: customer.billing_address.city,
    //     country: customer.billing_address.country
    // }

    let accounts = {
      title: customer.title,
      email: customer.email,
      first_name: customer.first_name,
      last_name: customer.last_name,
      telephone: {
        home: customer.telephone.home,
        mobile: customer.telephone.mobile
      },
      contact_permission: customer.contact_permission,
      terms: customer.terms,
      age_limit: customer.age_limit,
      uid: null
    }
    let customER = {
      user: users,
      account: accounts
    }
    this.authService.createUser(customER).subscribe((user:any)=>{
      // Handle errors
      if(user.error){
        return console.log(user.error);
      }
      // authenticate user and push to state management
      // Handle errors in the ui
      if(user.accountStatus == "success"){
        // send to ui
      }
      console.log(user);
    
      if(user.token){
        this.authService.loginWithCustomToken(user.token);
      }

      this.windowService.getWindowObject().setTimeout(()=>{
        this._location.back();
      }, 500);
      
    }, (err)=>{
      console.log(err);
    });
 
   }
   postCodeSearch(postcode){
    this.searchNotFound = false;
    this.searchResultErr = false;
    this.searchResult = false;
    let code = postcode.toUpperCase();
    // console.log(code);
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
  goBack(){
    this._location.back();
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
