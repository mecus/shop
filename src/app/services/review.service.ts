import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http } from '@angular/http';
import * as firebase from 'firebase';

@Injectable()

export class ReviewService {

    constructor(private _afDB:AngularFireDatabase){}

    getReviews():Observable<any>{
        return this._afDB.list('/reviews');
    }
    createReview(revw):Observable<any>{
        return this._afDB.list('/reviews')
            .push(revw).then((res)=>{
            console.log('Review Saved');
        }).catch(err=>console.log(err));
    }
}