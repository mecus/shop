import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import * as firebase from 'firebase';


@Injectable()

export class TaxanomyService {

    constructor(private _AFdb:AngularFireDatabase){}

    createCategory(cat){
        return this._AFdb.list('/category')
            .push(cat).then((res)=>console.log(res))
                      .catch((error)=>console.log(error));

    }
    getCategory():Observable<any>{
        return this._AFdb.list('/category');
    }
    removeCategory($key){
        return this._AFdb.list('/category/'+$key)
            .remove().then(res=> console.log).catch(error=>console.log(error));
    }

    createDepartment(dept){
        return this._AFdb.list('/department')
            .push(dept).then((res)=>console.log(res))
                      .catch((error)=>console.log(error));
    }
    getDepartment(){
        return this._AFdb.list('/department');
    }
    removeDepartment($key){
        return this._AFdb.list('/department/'+$key)
            .remove().then(res=>console.log(res)).catch(error=>console.log(error));
    }

}