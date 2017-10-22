import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Http } from '@angular/http';
import * as firebase from 'firebase';

@Injectable()

export class ReviewService {

    constructor(private _afs:AngularFirestore){}

    getReviews(){
        return this._afs.collection('reviews').valueChanges();
    }
    createReview(revw){
        return this._afs.collection('reviews')
            .add(revw).then((res)=>{
            console.log('Review Saved');
        }).catch(err=>console.log(err));
    }
}