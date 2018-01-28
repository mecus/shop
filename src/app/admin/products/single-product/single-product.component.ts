import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../../services/image-upload.service';
import { StoreService } from '../../services/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'admin-product',
    templateUrl: './single-product.component.html',
    styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
    product$: Observable<any>;
    prodKey;
    isForm: boolean = false;
    constructor(
        private storeService: StoreService,
        private uploadImageService: UploadImageService,
        private _router: Router,
        private route: ActivatedRoute,
        private _location: Location
    ) { 
        
    }
    getEditForm(){     
        if(this.isForm == true){
            window.scrollTo(0, 0);
            return this.isForm = false;
        }
        this.isForm = true;
        setTimeout(() => {
            window.scrollTo(0, 760);
        }, 100);
    }

    ngOnInit() { 
        this.route.paramMap.subscribe((param) => {
            this.prodKey = param.get('id');
            this.product$ = this.storeService.getOneProduct(this.prodKey);
        }, (err)=>{
            console.log(err);
        });
    }
}