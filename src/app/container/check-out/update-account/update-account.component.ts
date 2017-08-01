import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CheckoutService } from "app/services/checkout.service";
import { StorageService } from "app/services/storage.service";
import { WindowService } from "app/services/window.service";

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.scss']
})
export class UpdateAccountComponent implements OnInit {
  showDeliveryAddress;
  updateForm: FormGroup;
  constructor(private _fb:FormBuilder, private checkoutService:CheckoutService,
  private storeService:StorageService, private windowService:WindowService) {
    this.updateForm = _fb.group({
      title: null,
      first_name: null,
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
   updateAccount(update){
     console.log(update);
   }
   accountBroughtForward(){
     this.checkoutService.getAccount(this.storeService.retriveData('email')).subscribe((account)=>{
       this.updateForm.patchValue({
        title: account.title,
        first_name: account.first_name,
        last_name: account.last_name,
        email: account.email,
        telephone: account.telephone,
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
