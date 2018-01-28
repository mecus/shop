import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service';
import { UploadImageService } from '../services/image-upload.service';

@Component({
    selector: 'admin-list-dept',
    templateUrl: './list.component.html',
    styleUrls: ['./department.component.scss']
})
export class ListDeptComponent implements OnInit {
    department$;
    constructor(
        private storeService: StoreService,
        private uploadImageService: UploadImageService
    ) { 
        this.department$ = this.storeService.getDepartment()
        .map(snapshot => {
            return snapshot.map(d => {
                let id = d.payload.doc.id;
                let data = d.payload.doc.data();
                return {id, ...data};
            });
        })
    }
    removeDepartment(dept){
        let confam = confirm('Are you sure?');
        if(!confam){
            return null;
        }
        let id = dept.id;
        let path = 'department/';
        let photo = dept.feature_image;
        this.storeService.deleteDepartment(id).subscribe((res) => {
            console.log(res);
            if(photo){
                this.uploadImageService.removeStorageFile(path, photo)
                .then((res)=> {
                    console.log("Image removed");
                })
                .catch((err) => {
                    console.log(err);
                });
            }else{console.log("No Photo present to delete")}
          
        }, (err => {
            console.log(err);
        }));
    }

    ngOnInit() { }
}