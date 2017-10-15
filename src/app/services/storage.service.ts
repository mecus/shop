import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaymentService } from "./payment.service";


const storageService = function (){
    return window.localStorage;
}

@Injectable()

export class StorageService {

    constructor(private paymentService:PaymentService){

    }
    storeData(key:string,  data){
        if(typeof data === "object"){
            storageService().setItem(key, JSON.stringify(data));
            return;
        }else{
            storageService().setItem(key, data);
            return;
        }
    }
    retriveData(key:string){
        return storageService().getItem(key);  
    }
    cleardata(key:string){
        storageService().removeItem(key);
    }

    getPaymentToken(){
        this.paymentService.getClientToken().subscribe((token)=>{
          console.log(token.clientToken);
          this.storeData('token', token.clientToken);
        })
        return;
    }
}