import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';


@Injectable()
export class StoreService {
    private depart: AngularFirestoreCollection<any>;
    private aisles: AngularFirestoreCollection<any>;
    private products: AngularFirestoreCollection<any>;
    private brands: AngularFirestoreCollection<any>;
    private categorys: AngularFirestoreCollection<any>;
    private url: string = 'http://localhost:3000/api_v1/';
;
    constructor(private afs: AngularFirestore, private _http: HttpClient){
        this.depart = afs.collection<any>('departments');
        this.aisles = afs.collection<any>('aisles');
        this.products = afs.collection<any>('products');
        this.brands = afs.collection<any>('brands');
        this.categorys = afs.collection<any>('category');
    }

    // Department Section
    getDepartment(){
        return this.depart.snapshotChanges();
    }
    getOneDepartment(id){
        return this.depart.doc(id).valueChanges();
    }
    saveDepartment(data){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+"departments", data, {headers: option});
        // return this.depart.add(data); 
    }
    deleteDepartment(id){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(
            this.url+"departments", { params: new HttpParams().set('id', id), headers: option }
        );
    }
    getQueryAisles(id){
        return this.afs.collection('aisles', (ref => ref.where('department_id', '==', id))).snapshotChanges();
    }
    
    // Aisles Section
    saveAisle(data){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+"aisles", data, {headers: option} );
    }
    getOneAisle(id){
        return this.aisles.doc(id).valueChanges();
    }
    
    deleteAisle(id){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(
            this.url+"aisles", { params: new HttpParams().set('id', id), headers: option }
        );
    }
    
    // Category Section
    getQueryCategory(id){
        return this.afs.collection<any>('category', (ref)=> ref.where('aisle_id', '==', id)).snapshotChanges();
    }
    getOneCategory(id){
        return this.categorys.doc(id).snapshotChanges();
    }
    saveCategory(data){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+"category", data, {headers: option});
    }
    deleteCategory(id){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(
            this.url+"category", { params: new HttpParams().set('id', id), headers: option }
        );
    }

    // Product Section
    getOneProduct(id){
        return this.products.doc(id).valueChanges();
    }
    getQueryProducts(){
        return this.products.snapshotChanges();
    }
    saveProduct(data){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+"products", data, {headers: option});
    }
    updateProduct(id, data){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.patch(
            this.url+"products", data, { params: new HttpParams().set('id', id), headers: option }
        );
    }
    deleteProduct(id){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(
            this.url+"products", { params: new HttpParams().set('id', id), headers: option }
        );
    }

    // Brands Section
    getBrands(){
        return this.brands.snapshotChanges();
    }
    saveBrands(data){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.post(this.url+"brands", data, {headers: option});
    }
    deleteBrand(id){
        let option = new HttpHeaders().set('Content-Type', 'application/json');
        return this._http.delete(
            this.url+"brands", { params: new HttpParams().set('id', id), headers: option }
        );
    }

    
}