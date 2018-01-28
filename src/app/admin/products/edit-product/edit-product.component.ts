import { Component, OnInit, Input, OnDestroy, HostListener } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { StoreService } from '../../services/store.service';
import { Observable } from 'rxjs/Observable';
import { UploadImageService } from '../../services/image-upload.service';

@Component({
    selector: 'edit-product',
    templateUrl: './edit-product.component.html',
    styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
    productModel: FormGroup;
    category$;
    brand$;
    catKey;
    imageFile;
    updateImage;
    statusMsg;color;
    @Input() key;
    constructor(
        private storeService: StoreService,
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private uploadService: UploadImageService,
        private _location: Location,
        private _router: Router
    ) { 
        this.brand$ = this.storeService.getBrands();
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
        if(!e.target.files){
            return null;
        }
        this.updateImage = e.target.files[0];
    }
    async updateProduct(product){
        let imageRemove = product.photo;

        if(this.updateImage){
            product.photo = this.updateImage.name;
            let path = 'products/'
            let url = await this.uploadService.uploadImage(this.updateImage, path);    
            product.imageUrl = url.downloadURL;
            product.photo = this.updateImage.name;
            this.storeService.updateProduct(this.key, product)
            .subscribe((res: any)=>{
                console.log(res);
                this.uploadService.removeStorageFile(path, imageRemove)
                .then((ref) => {
                    console.log(imageRemove + "was removed");
                    this.color = 'green';
                    this.statusMsg = res.msg;
                    window.scrollTo(0, 0);
                })
                .catch((err) => {
                    console.log(err);
                    this.color = 'red';
                    this.statusMsg = 'Something went terribly wrong';
                });
                
                // this._router.navigate(['/admin/products/view', this.key]);
            });
        }else{
            this.storeService.updateProduct(this.key, product)
            .subscribe((res:any)=>{
                console.log(res);
                this.color = 'green';
                this.statusMsg = res.msg;
                window.scrollTo(0, 0);
                // this._router.navigate(['/admin/products/view', this.key]);
            }, (err => {
                this.color = 'red';
                this.statusMsg = 'Something went wrong!';
            }));
        } 
    }

    ngOnInit() { 
        this.storeService.getOneProduct(this.key)
        .subscribe(product => {
            this.patchProduct(product);
        });
    }
    patchProduct(product){
        this.productModel.patchValue({
            name: product.name,
            code: product.code,
            price: product.price,
            old_price: product.old_price,
            offer: product.offer,
            brand: product.brand,
            sponsored: product.sponsored,
            recommend: product.recommend,
            category: product.category,
            stock: product.stock,
            department_id: product.department_id,
            category_id: product.category_id,
            aisle_id: product.aisle_id,
            imageUrl: product.imageUrl,
            photo: product.photo,
            description:{
                detail: product.description.detail,
                size: product.description.size,
                origin: product.description.origin
            },
            nutrition: {
                energy: product.nutrition.energy,
                fat: product.nutrition.fat,
                saturates: product.nutrition.saturates,
                salt: product.nutrition.salt
            },
            publish: product.publish
        })
    }
}