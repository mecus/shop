import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
// import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import * as Rx from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/merge';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/share';
import 'rxjs/add/operator/filter';

import { iProduct } from "../models/product.model";
import { tDepartment } from '../models/department';
import { tAisle } from '../models/aisle';

// import { AdItem } from '../components/advert/ad-item';
// import { NewProdComponent } from '../components/advert/dynamic-components/newprod.component';
// import { NewCatComponent } from '../components/advert/dynamic-components/newcat.component';


@Injectable()
export class ProductService {
  departmentCol: AngularFirestoreCollection<tDepartment>;

  host:string = "https://urgyshop.herokuapp.com/";
  resourceUrl;
  dataResource;
  adUrl;
  storeData$;
  storeDeptAd$;
  queryProductUrl;
  graphql;
  departmentItem$;
  departmentUrl: string;

  constructor( private _http:Http, private afs: AngularFirestore) {
    this.graphql = this.host+"graphql?";
    this.departmentUrl = this.host+"api/v1/stores/departments";
    this.resourceUrl = this.host+"api/v1/stores/products";
    this.dataResource = this.host+"api/v1/stores/storedata";
    this.adUrl = this.host+"api/v1/stores/storeadvert";
    this.queryProductUrl = this.host+"api/v1/stores/products/query/?";

    this.storeData$ = new ReplaySubject(1);
    this.storeDeptAd$ = new ReplaySubject(1);
    this.departmentItem$ = new ReplaySubject(1);

    this.departmentCol = afs.collection<tDepartment>('departments');
   
   }

   getStoreDepartment(){
     return this.departmentCol.snapshotChanges();
   }
   getStoreIsle(key){
    return this.afs.collection<tAisle>('aisles', ref => ref.where('department_id', '==', key)).snapshotChanges();
   }
   getStoreCategory(key){
     return this.afs.collection<any>('category', ref => ref.where('aisle_id', '==', key)).snapshotChanges();
   }
   getStoreProducts(key, instruct){
     switch(instruct.type){
       case 'DEPARTMENT':
        return this.afs.collection<any>('products', ref => ref.where('department_id', '==', key)).snapshotChanges();
        
      case 'AISLE':
        return this.afs.collection<any>('products', ref => ref.where('aisle_id', '==', key)).snapshotChanges();
        
      case 'CATEGORY':
        return this.afs.collection<any>('products', ref => ref.where('category_id', '==', key)).snapshotChanges();
      case 'OFFER':
        return this.afs.collection<any>('products', ref => ref.where('offer', '==', key)).snapshotChanges();
      default:
        return this.afs.collection<any>('products', ref => ref.where('department_id', '==', key)).snapshotChanges();
     }
   }
   getStoreSingleProduct(id){
    return this.afs.collection('products').doc(id).snapshotChanges();
   }
















  getDeptAd():Observable<any>{
    return this._http.get(this.adUrl).map((advert)=>{
      return advert.json();
    }).catch(this.handleError);
  }

  getProducts():Observable<any>{
    return this._http.get(this.dataResource).map((res)=>{
    // console.log(res.json());
     return res.json();
    }).catch(this.handleError);
    
  }
  getQueryProduct(query){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9'})}); 
    let params: URLSearchParams = new URLSearchParams();
    params.set("name", query);
    return this._http.get(this.queryProductUrl+params, options).map((product)=>{
      return product.json();
    }).catch(this.handleError);
  }
  handleError(err):Observable<any>{
    if (err.status === 302 || err.status === "302"){
      return err.json();
    }else{
      return Observable.throw(new Error(err.status));
    }
  }

  getStoreAd(){
     return this._http.get(this.adUrl).map((res)=>{
     let ad = res.json().filter(ads=>ads.tag == "alpha");
     return ad.map((data)=>{
       return  data;
     });
    }).catch(this.handleError);
  }
  
  //Caching data functions
  getDepartmentMenu(){
    if(!this.departmentItem$.observers.length){
      console.log('Start Fatching Dept');
      this._http.get(this.departmentUrl).map(data=> data.json())
      .subscribe(
        dept=>this.departmentItem$.next(dept),
        error=>{
          if(error){
            this.departmentItem$.error(error);
            this.departmentItem$ = new ReplaySubject(1);
          }
        }
      );
      console.log('End Fatching Dept');
    }
    return this.departmentItem$;
  }
  getCachedData(forceRefresh?:boolean){
    if(!this.storeData$.observers.length || forceRefresh){
      console.log("Http Request Service for Products");
      this.getProducts().subscribe(
        data=> this.storeData$.next(data),
        error=>{
          if(error){
            this.storeData$.error(error);
            this.storeData$ = new ReplaySubject(1);
          }
        }
      )
    }
    return this.storeData$;
  }
  getCachedDeptAd(refreshData?:boolean){
    if(!this.storeDeptAd$.observers.length || refreshData){
      console.log("New Http Request for Advert");
      this.getDeptAd().subscribe(
        data=> this.storeDeptAd$.next(data),
        error=>{
          this.storeDeptAd$.error(error);
          this.storeDeptAd$ = new ReplaySubject(1);
        },
        ()=>console.log("Request Completed")
      )
    }
    return this.storeDeptAd$;
  }

  //Graphql Endpoints
  getGQLdept(){
    let options = new RequestOptions({headers: new Headers({'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9'})}); 
    let params: URLSearchParams = new URLSearchParams();
    // params.set('id', '');
    let query = {
     
    }
    this._http.get(this.graphql+query, options).map((res)=>{
      console.log(res);
    },((err)=>{
      console.log(err);
    })).subscribe();
  }
  // Product Brand List
  getBrands():Observable<any>{
    let brands:Array<any>  = [
      {name: "Africa's Finest", contained_product: 56},
      {name: "Baldwins", contained_product: 500},
      {name: "Baron", contained_product: 86},
      {name: "Carib", contained_product: 100},
      {name: "Pa Benjamine", contained_product: 46},
      {name: "Tropicana", contained_product: 70},
      {name: "Nrich", contained_product: 67}
    ];
    let newBrand = Rx.Observable.from([brands]);
    return newBrand;
  }

  getProductIngredients(){
   return this.getCachedData().map(data => data.products);

  }
}
