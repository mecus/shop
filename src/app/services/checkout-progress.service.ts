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
import { AuthService } from '../authentications/authentication.service';
// import * as firebase from 'firebase';
// import 'firebase/firestore';

@Injectable()


export class ProgressService {
    progress$;
    currentUser;
    progress;
    constructor(private AFs:AngularFirestore, private store:StorageService, private authService:AuthService ){
        authService.authState().subscribe(user=>{
            if(user){
                this.currentUser = user;
                this.progress$ = AFs.collection('progress').doc(user.uid).collection('checkprogress/');

                this.progress$.snapshotChanges().map(snapshot=>{
                    this.progress = snapshot.map(doc=>{
                        const data = doc.payload.doc.data()
                        const id = doc.payload.doc.id
                        return {id, data};
                    });
                    // console.log(this.progress);
                }).subscribe();
            }
        })
        
    }

    setProgress(prog){
       this.progress$
            .add(prog).then(res=>res).catch(err=>console.log(err));
    }

    getProgress(){
        let db = this.progress$.valueChanges();
        return db;
    
    }
    deleteProgress(){
        this.progress.forEach(doc=>{
            if(doc){
                let prog = this.AFs.collection('progress').doc(this.currentUser.uid).collection('checkprogress');
                prog.doc(doc.id).delete().then(res=>console.log(res)).catch(err=>console.log(err));
            }else{
                return;
            }
        });

    }
}