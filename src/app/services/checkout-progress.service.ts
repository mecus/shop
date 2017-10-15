import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as Rx from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/merge';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/share';
import { StorageService } from './storage.service';

@Injectable()


export class ProgressService {

    constructor(private AF:AngularFireDatabase, private store:StorageService ){
        
    }

    setProgress(prog){
        let DBRef = this.AF.list('/progress/'+this.store.retriveData('user')['uid']);
        DBRef.push(prog);
    }

    getProgress():Observable<any>{
        let DBRef = this.AF.list('/progress/'+this.store.retriveData('user')['uid']);
        return DBRef;
    }
    deleteProgress(){
        let DBRef = this.AF.list('/progress/'+this.store.retriveData('user')['uid']);
        return DBRef.remove();
    }
}