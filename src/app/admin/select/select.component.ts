import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { StoreService } from '../services/store.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { IDepartment } from '../../models/store.model';

@Component({
    selector: 'store-select',
    templateUrl: './select.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
    department$: Observable<any>;
    selected;
    constructor(
        private storeService: StoreService,
        private _router: Router,
        private route: ActivatedRoute,
        private _location: Location
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
    next(){
        // console.log(this.selected);
        this._router.navigate(['/admin/products/aisle', this.selected.id]);
    }
    back(){
        this._location.back();
    }
    ngOnInit() {

     }
}