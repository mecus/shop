import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';
import { PaymentService } from "app/services/payment.service";


@Injectable()

export class StorageService {

    constructor(private storageService:LocalStorageService,
        private paymentService:PaymentService){

    }
    storeData(key:string,  data){
        this.storageService.store(key, data);
    }
    retriveData(key:string):Observable<any>{
        return this.storageService.retrieve(key);
    }
    cleardata(key:string){
        this.storageService.clear(key)
    }

    getPaymentToken(){
        this.paymentService.getClientToken().subscribe((token)=>{
          console.log(token.clientToken);
          this.storeData('token', token.clientToken);
        })
        return;
    }
}