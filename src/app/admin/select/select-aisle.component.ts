import { Component, OnInit } from '@angular/core';
import { Location  } from '@angular/common';
import { StoreService } from '../services/store.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'select-aisle',
    templateUrl: './select-aisle.component.html',
    styleUrls: ['./select.component.scss']
})
export class SelectAisleComponent implements OnInit {
    aisle$: Observable<any>;
    selected;
    paramKey;
    constructor(
        private storeService: StoreService,
        private _router: Router,
        private route: ActivatedRoute,
        private _location: Location
    ) { 
        try {
            route.paramMap.subscribe((param) => {
                this.paramKey = param.get('id');
            })
            this.aisle$ = this.storeService.getQueryAisles(this.paramKey)
            .map(snapshot => {
                return snapshot.map(d => {
                    let id = d.payload.doc.id;
                    let data = d.payload.doc.data();
                    return {id, ...data};
                });
            })
        } catch(err ){
            console.log(err);
        }
      
    }
    next(){
        // console.log(this.selected);
        this._router.navigate(['/admin/products/category', this.selected.id]);
    }
    back(){
        this._location.back();
    }

    ngOnInit() { }
}