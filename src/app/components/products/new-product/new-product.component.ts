import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

import { iProduct } from '../../../models/product.model';
import { Store } from '@ngrx/store';
import * as productA from "../../../store/actions/product.action";


@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  pForm:FormGroup;
  uploadFile;
  imageUrl = "/assets/72-247x300.jpg";

  foods = [
    {value: 'Frozen Food', viewValue: 'Frozen Food'},
    {value: 'Dry Food', viewValue: 'Dry Food'},
    {value: 'Baverages', viewValue: 'Baverages'},
    {value: 'Drinks', viewValue: 'Drinks'},
    {value: 'Ingredients', viewValue: 'Ingredients'}
  ];

  constructor(private _fb:FormBuilder, private store:Store<iProduct>, private _router:Router) { }
  @HostListener('change', ['$event']) inputChange($event){
    let fileUpload = $event.target.files[0];
    // console.log(fileUpload);
    this.uploadImage(fileUpload);
  }


  saveProduct(product){
    this.store.dispatch({type:productA.NEW_PRODUCT, payload: product});
    setTimeout(()=>{
      this.reativeForm();
      this.imageUrl = "https://firebasestorage.googleapis.com/v0/b/shop-5e89b.appspot.com/o/images%2Fproducts%2F72-247x300.jpg?alt=media&token=d0207c0c-36ff-4856-b48d-f17d00afa92a";
    }, 500)
    

  }
  ngOnInit() {
    this.reativeForm();
    
  }
  reativeForm(){
    this.pForm = this._fb.group({
      name: '',
      price: '',
      id: '',
      code: '',
      imageUrl: '',
      category: '',
      description: this.descriptions(),
      nutrition: this.nutrition()
    });
  }

  descriptions(){
    return this._fb.group({
      detail: '',
      size: '',
      origin: ''
    })
  }
  nutrition(){
    return this._fb.group({
      energy: '',
      fat: '',
      saturates: '',
      salt: ''
    })
  }

  uploadImage(fileUpload){
        let filename = fileUpload.name;
        let storageRef = firebase.storage().ref('/images/products/' + filename);
        let uploadTask = storageRef.put(fileUpload);
        uploadTask.on('state_changed', (snapshot)=>{

        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
        }, (error)=> {
            console.log(error);
        // Handle unsuccessful uploads
        }, ()=> {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        let downloadURL = uploadTask.snapshot.downloadURL;
        this.imageUrl = uploadTask.snapshot.downloadURL
        // localStorage.setItem('downloadURL', (downloadURL) );
        this.pForm.patchValue({
          imageUrl: this.imageUrl,
        })
        console.log(downloadURL);
        
        
        }
    )
    }

}
