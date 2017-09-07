import { Component, OnInit } from '@angular/core';
import { StorageService } from "../../../services/storage.service";

@Component({
  selector: 'shippong-detail',
  templateUrl: 'shipping-detail.component.html',
  styleUrls: ['shipping-detail.component.scss']
})
export class ShippingDetailComponent implements OnInit {
  postCode;
  constructor(private storeService:StorageService) {
    this.postCode = this.storeService.retriveData('postcode');
   }

  ngOnInit() {
  }

}
