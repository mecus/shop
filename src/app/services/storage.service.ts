import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService, SessionStorageService } from 'ng2-webstorage';

@Injectable()

export class StorageService {

    constructor(private storageService:LocalStorageService){

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
}