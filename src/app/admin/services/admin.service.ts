import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class AdminService {
    private depart: AngularFirestoreCollection<any>;
    private url: string = 'http://localhost:3000/api_v1/departments';
    constructor(private afs: AngularFirestore, private _http: HttpClient){
        this.depart = afs.collection<any>('departments');
    }
    getDepartment(){
        return this.depart.snapshotChanges();
    }
    saveDepartment(data){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url, data, {headers: option});
        // return this.depart.add(data);
        
    }
}