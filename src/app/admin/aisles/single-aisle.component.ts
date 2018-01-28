import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Observable } from 'rxjs/Observable';
import { IAisle } from '../../models/store.model';

@Component({
    selector: 'admin-s-aisle',
    templateUrl: './single-aisle.component.html',
    styleUrls: ['./aisle.component.scss']
})
export class AisleComponent implements OnInit {
    aisle$:Observable<any>;
    category$;
    aiKey;
    deptKey;
    catModel: FormGroup;
    catForm: boolean = false;
    statusMsg;
    color;
    constructor(
        private fb: FormBuilder,
        private storeService: StoreService,
        private route: ActivatedRoute,
        private _location: Location
    ) {
        this.catModel = fb.group({
            name: ["", Validators.required],
            department_id: [""],
            aisle_id: [""],
            group: [""]
        });
     }
     back(){
        this._location.back();
    }
    addCat(cat){
        cat.aisle_id = this.aiKey;
        cat.department_id = this.deptKey;
        if(this.catModel.status == "INVALID"){
            this.color = 'red';
            return this.statusMsg = "Please enter valid data";
        }
        this.statusMsg = "";
        this.storeService.saveCategory(cat).subscribe((ref:any)=>{
            // console.log(ref);
            this.catModel.reset();
            this.closeForm();
        }, (err => {
            console.log(err);
            this.color = 'red';
            this.statusMsg = "Something went wrong!!";
        }));
        // console.log(cat);
    }
    removeCategory(id){
        let confam = confirm('Are you sure?');
        if(!confam){
            return null;
        }
        this.storeService.deleteCategory(id).subscribe(res =>{
            console.log(res);
        }, (err => console.log(err)));
    }
    showForm(){
        this.catForm = true;
    }
    closeForm(){
        this.catForm = false;
    }

    ngOnInit() {
        this.route.paramMap.subscribe((param)=> {
            this.aiKey = param.get('id');
            this.storeService.getOneAisle(this.aiKey)
            .subscribe((snapshot: IAisle) => {
                this.deptKey = snapshot.department_id;
                this.aisle$ = Observable.of(snapshot);
            });
            this.category$ = this.storeService.getQueryCategory(this.aiKey)
            .map(snapshot => {
                return snapshot.map(c => {
                    if(c.payload.doc.exists){
                        let id = c.payload.doc.id;
                        let data = c.payload.doc.data();
                        return {id, ...data};
                    }
                    return null;
                })
            });
        }, (err) => {
            console.log(err);
        });

    }
}