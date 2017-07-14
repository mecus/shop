import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../authentication.service';
import { StorageService } from "app/services/storage.service";


function passwordMather(c:AbstractControl){
    return c.get('password').value === c.get('confirmpassword').value
    ? null : {'nomatch': true};
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  newUser: FormGroup;
  errMsg;
  setPostcode;
  searchResult;
  posterror;
  constructor(private storeService:StorageService , private _fb:FormBuilder, private authService:AuthService) {
    this.newUser = _fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required, Validators.minLength(8)],
      confirmpassword: [null, Validators.required]
    }, {validator: passwordMather})
   }
   register(user){
    //  console.log(user);
     this.authService.createUser(user).then((ruser)=>{
       console.log(ruser);
     }).catch((err)=>{
       this.errMsg = err.message;
      console.log(err);
     })
   }
   postCodeSearch(postcode){
     if(postcode == ""){
            this.posterror = "Post code must not be empty!"
     }else{
      this.storeService.storeData('postcode', postcode);
     }
     
   }

  ngOnInit() {
    this.setPostcode = this.storeService.retriveData('postcode');
  }

}
