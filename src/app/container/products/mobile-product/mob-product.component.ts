import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { trigger, state, style, stagger, transition, animate, keyframes, query } from '@angular/animations';
import { iProduct } from "../../../models/product.model";
import { Observable } from "rxjs/Observable";
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CartService } from '../../../services/cart.service';
import { StorageService } from "../../../services/storage.service";
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/share';


import { WindowService } from "../../../services/window.service";
import { PageEvent, MdPaginator } from '@angular/material';

@Component({
    selector: 'mob-product',
    templateUrl: 'mob-product.component.html',
    styleUrls: ['mob-product.component.scss']

})

export class MobileProductComponent implements OnInit {
    products$ = [
        {name: "Okro Seed", price: 4.70, size: "390g", imageUrl: "assets/SR_Catering_985x615-600x600.jpg"},
        {name: "Pepper", price: 2.50, size: "300g", imageUrl: "assets/deli.jpg"},
        {name: "Ginger Spice", price: 5.00, size: "200g", imageUrl: "assets/SR_Catering_985x615-600x600.jpg"},
        {name: "Still Water", price: 1.70, size: "1.5L", imageUrl: "assets/deli.jpg"},
        {name: "Maggie", price: 2.40, size: "500g", imageUrl: "assets/SR_Catering_985x615-600x600.jpg"}
    ]
    constructor(){}

    ngOnInit(){

    }
}