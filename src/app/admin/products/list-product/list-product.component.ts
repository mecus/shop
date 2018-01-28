import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { StoreService } from '../../services/store.service';
import { UploadImageService } from '../../services/image-upload.service';

@Component({
    selector: 'admin-product',
    templateUrl: './list-product.component.html',
    styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
    displayedColumns = ['photo', 'name', 'price', 'stock', 'cat', 'offer', 'publish', 'delete'];
    dataSource;
    constructor(
        private storeService: StoreService,
        private uploadImageService: UploadImageService
    ) { }

    removeProduct(element){
        // console.log(element);
        let confam = confirm('Are you sure?');
        if(!confam){
            return null;
        }
        let path = 'products/'
        this.storeService.deleteProduct(element.id)
        .subscribe((res) => {
            this.uploadImageService.removeStorageFile(path, element.photo)
            .then(ref => {
                console.log('Product Image Deleted');
            })
            .catch((err) => console.log(err));
        });
      
    }

    ngOnInit() { 
        this.dataSource = new ExampleDataSource(
        this.storeService.getQueryProducts().map(snapshot => {
            return snapshot.map(p => {
                let id = p.payload.doc.id;
                let data = p.payload.doc.data();
                return {id, ...data};
            })
            })
        );
       
    }
}

export class ExampleDataSource extends DataSource<any> {
    /** Connect function called by the table to retrieve one stream containing the data to render. */
    constructor(private data){
        super()
    }
    connect(): Observable<Element[]> {
      return this.data;
    }
  
    disconnect() {}
  }