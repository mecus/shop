import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UploadImageService } from '../services/image-upload.service';
import { StoreService } from '../services/store.service';
import { Router } from '@angular/router';

@Component({
    selector: 'admin-new-dept',
    templateUrl: './add.component.html',
    styleUrls: ['./department.component.scss']
})
export class AddDeptComponent implements OnInit {
    formInput: FormGroup;
    files;
    invalidMsg;
    color;
    constructor(private fb: FormBuilder, private uploadImage: UploadImageService,
    private storeService: StoreService,
    private _router: Router
    ) {
        this.formGroup();
     }

    formGroup(){
        this.formInput = this.fb.group({
            name: ["", Validators.required],
            code: ["", Validators.required],
            feature_image: [""],
            group: [""],
            image_url: [""]
        });
    }
    @HostListener('change', ['$event']) fileCahnge(e:any){
        e.preventDefault();
        e.stopPropagation();
        if(!e.target.files){
            return;
        }
        this.files = e.target.files[0];
    }
    async sendDept(dept){
        if(this.formInput.status == "INVALID"){
            this.color = 'red';
            return this.invalidMsg = "Fill in valid data";
        }
        this.invalidMsg = null;
        dept.feature_image = this.files.name;
        let path = 'department/'
        let url = await this.uploadImage.uploadImage(this.files, path);
        dept.image_url = url.downloadURL;
        let result = await this.storeService.saveDepartment(dept)
        .subscribe((ref) => {
            console.log(ref);
            this._router.navigate(["/admin/departments"]);
        });
        
    }

    ngOnInit() { }
}