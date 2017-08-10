import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountService } from 'app/services/account.service';
import { StorageService } from 'app/services/storage.service';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from "app/services/payment.service";
import { WindowService } from "app/services/window.service";
import { AuthService } from "app/authentications/authentication.service";


@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss']
})
export class PaymentMethodComponent implements OnInit, AfterViewInit {
  document;
  userId;
  constructor(private accountService:AccountService, private authService:AuthService, 
    private storeService:StorageService, private _fb:FormBuilder,
    private paymentService:PaymentService, private windowService:WindowService) {
      this.document = this.windowService.getDocumentRef();
     }

  ngOnInit() {
    // this.getPaymentToken();
    this.authService.authState().subscribe((user)=>{
      this.userId = user.uid;
    })
  }
  ngAfterViewInit(){

  }
}
