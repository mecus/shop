import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { StoreService } from '../services/store.service';

@Component({
    selector: 'admin-brand',
    templateUrl: './brands.component.html',
    styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
    brandForm: boolean = false;
    brand$;
    brandModel: FormGroup;
    statusMsg;
    color;
    constructor(
        private fb: FormBuilder,
        private storeService: StoreService
    ) { 
        this.brandModel = fb.group({
            name: ["", Validators.required]
        });
    }

    addBrand(brand){
        if(this.brandModel.status == "INVALID"){
            this.color = 'red';
            return this.statusMsg = 'Please enter a vilid data';
        }
        this.storeService.saveBrands(brand).subscribe(res => {
            console.log(res);
            this.closeForm();
            this.brandModel.reset();
        }, (err => {
            this.color = 'red';
            this.statusMsg = "Something Went Wrong";
            console.log(err);
        }));
    }
    removeBrand(id){
        let confam = confirm('Are you sure?');
        if(!confam){
            return null;
        }
        this.storeService.deleteBrand(id)
        .subscribe((res)=> {
            console.log(res);
        }, (err)=>{
            console.log(err);
        })
    }

    openForm(){
        this.brandForm = true;
    }
    closeForm(){
        this.brandForm = false;
    }

    ngOnInit() { 
        this.brand$ = this.storeService.getBrands()
        .map(snapshot => {
            return snapshot.map(b => {
                let id = b.payload.doc.id;
                let data = b.payload.doc.data();
                return {id, ...data};
            })
        });
    }
}