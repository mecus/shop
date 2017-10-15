import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService } from "../../../services/account.service";
import { StorageService } from "../../../services/storage.service";
import { WindowService } from "../../../services/window.service";

@Component({
  selector: 'app-update-account',
  templateUrl: 'update-account.component.html',
  styleUrls: ['update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {
  showDeliveryAddress;
  updateForm: FormGroup;
  constructor(private _fb:FormBuilder, private accountService:AccountService,
  private storeService:StorageService, private windowService:WindowService) {
    this.updateForm = _fb.group({
      id: null,
      title: null,
      first_name: null,
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
      delivery_address: _fb.group({
          full_name: null,
          address: null,
          address2: null,
          post_code: null,
          city: null,
          country: null
      }),

    })
   }
  
  //Saving the update in the database
   updateAccount(update){
    //  console.log(update.id);
    this.accountService.updateAccount(update, update.id)
      .subscribe((response)=>{
        console.log(response);
      })
   }
   accountBroughtForward(){
     this.accountService.getAccount(this.storeService.retriveData('email')).subscribe((account)=>{
       this.updateForm.patchValue({
        id: account._id,
        title: account.title,
        first_name: account.first_name,
        last_name: account.last_name,
        email: account.email,
        telephone: {
            home: account.telephone.home,
            mobile: account.telephone.mobile
        },
        billing_address:{
            address: account.billing_address.address,
            address2: account.billing_address.address2,
            post_code: account.billing_address.post_code,
            city: account.billing_address.city,
            country: account.billing_address.country
        },
        delivery_address: {
            full_name: account.delivery_address.full_name,
            address: account.delivery_address.address,
            address2: account.delivery_address.address2,
            post_code: account.delivery_address.post_code,
            city: account.delivery_address.city,
            country: account.delivery_address.country
        },
       })
     })
   }


  @HostListener('change', ['$event']) onChanges($event){
    let domE = this.windowService.getDocumentRef().getElementById('delivery-address');
    if($event.checked == true){
      domE.style.display = "block";
    }else{
      domE.style.display = "none";
    }
   
  }
  ngOnInit() {
    this.accountBroughtForward();
  }

}
