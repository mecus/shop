import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { Observable } from 'rxjs/Observable';
import { IDepartment } from '../../models/store.model';

@Component({
    selector: 'admin-s-dept',
    templateUrl: './single-dept.component.html',
    styleUrls: ['./department.component.scss']
})
export class SingleDeptComponent implements OnInit {
    department$: Observable<any>;
    aisles$;
    aisleForm: boolean = false;
    aisleModel: FormGroup;
    deptKey;
    statusMsg;
    color;
    constructor(
        private storeService: StoreService,
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private _location: Location
    ) { 
        this.aisleModel = fb.group({
            name: ["", Validators.required],
            department_id: [""],
            group: ["", Validators.required]
        });
    }
    back(){
        this._location.back();
    }
    addAisle(i){
        // console.log(i);
        if(this.aisleModel.status == "INVALID"){
            this.color = 'red';
            return this.statusMsg = "Please fill in valid data";
        }
        this.statusMsg = "";
        this.storeService.saveAisle(i).subscribe((ref:any)=> {
            this.color = 'green';
            this.statusMsg = ref.msg;
            // console.log(ref);
            this.aisleModel.reset();
            this.closeForm();
        });
    }
    removeAisle(id){
        let confam = confirm('Are you sure?');
        if(!confam){
            return null;
        }
        this.storeService.deleteAisle(id).subscribe(res =>{
            console.log(res);
        }, (err => console.log(err)));
    }
    showForm(){
        this.aisleModel.patchValue({
            department_id: this.deptKey
        });
        this.aisleForm = true;
        this.statusMsg = "";

    }
    closeForm(){
        this.aisleForm = false;
        this.statusMsg = "";
    }


    ngOnInit() {
        this.route.paramMap.subscribe( async(param) => {
            this.deptKey = param.get('id');
            this.department$ = await this.storeService.getOneDepartment(this.deptKey);
            this.aisles$ = await this.storeService.getQueryAisles(this.deptKey)
            .map(snapshot => {
                return snapshot.map(a => {
                    let id = a.payload.doc.id;
                    let data = a.payload.doc.data();
                    return {id, ...data};
                })
            });
        });
        
     }
}