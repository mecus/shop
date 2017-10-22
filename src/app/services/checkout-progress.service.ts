import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import * as Rx from 'rxjs';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/merge';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/share';
import { StorageService } from './storage.service';
// import * as firebase from 'firebase';
// import 'firebase/firestore';

@Injectable()


export class ProgressService {
    progress$;
    constructor(private AFs:AngularFirestore, private store:StorageService ){
        this.progress$ = AFs.collection('progress').doc(this.store.retriveData('uid') || null).collection('checkprogress');
    }

    setProgress(prog){
        let DBRef = this.progress$;
            DBRef.add(prog).then(res=>res).catch(err=>console.log(err));
    }

    getProgress(){
        let DBRef = this.progress$.valueChanges();
        return DBRef;

    }
    deleteProgress(){
        let DBRef = this.progress$.doc(this.store.retriveData('uid') || null);
        return DBRef;
    }
}