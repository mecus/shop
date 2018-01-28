import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Observable } from 'rxjs/Observable';
import { UploadImageService } from '../../services/image-upload.service';


@Component({
    selector: 'new-product',
    templateUrl: './new-product.component.html',
    styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit, OnDestroy {
    productModel: FormGroup;
    category$;
    brand$;
    catKey;
    imageFile;
    constructor(
        private storeService: StoreService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private uploadService: UploadImageService,
        private _location: Location,
        private _router: Router
    ) { 
        this.productModel = fb.group({
            name: [""],
            code: [""],
            price: [""],
            old_price: [""],
            imageUrl: [""],
            photo: [""],
            offer: [""],
            brand: [""],
            sponsored: [""],
            recommend: [""],
            category: [""],
            department_id: [""],
            category_id: [""],
            aisle_id: [""],
            stock: [""],
            description: fb.group({
                detail: [""],
                size: [""],
                origin: [""]
            }),
            nutrition: fb.group({
                energy: [""],
                fat: [""],
                saturates: [""],
                salt: [""]
            }),
            publish: [""]
        });
    }
    @HostListener('change', ['$event']) imageUpload(e:any){
        e.preventDefault();
        e.stopPropagation();
        if(e.target.files){
            this.imageFile = e.target.files[0];
            return null;
        }
        return null;
        
    }

    async postProduct(product){
        // Items to patch
        // department_id,
        //  category_id,
        //  aisle_id,
        product.category = this.category$.name;
        product.department_id = this.category$.department_id;
        product.category_id = this.category$.id;
        product.aisle_id = this.category$.aisle_id;
        if(this.imageFile){
            product.photo = this.imageFile.name;
        }
        // imageUrl,
        //  photo,
        let path = 'products/'
        let url = await this.uploadService.uploadImage(this.imageFile, path);    
        product.imageUrl = url.downloadURL;
   
        let prod = await this.storeService.saveProduct(product).subscribe((res)=>{
            console.log(res);
            this._router.navigate(['/admin/products']);
        }, (err => console.log(err)));
        
    }
    back(){
        this._location.back();
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
        this.route.paramMap.subscribe((param) => {
            this.catKey = param.get('id');
            this.storeService.getOneCategory(this.catKey)
            .map(snapshot => {
               let data = snapshot.payload.data();
               let id = snapshot.payload.id;
               this.category$ = {id, ...data};
            }).subscribe();
        }, (err => {
            console.log(err);
        }));
        
    }
    ngOnDestroy() {
        // this.catObservable.unsu
        //Called once, before the instance is destroyed.
        //Add 'implements OnDestroy' to the class.
        
    }
}