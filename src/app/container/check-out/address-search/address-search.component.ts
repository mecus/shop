import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AddressSearchService } from "../../../services/addresssearch.service";
import { StorageService } from "../../../services/storage.service";

@Component({
  selector: 'address-search',
  templateUrl: 'address-search.component.html',
  styleUrls: ['address-search.component.scss']
})
export class AddressSearchComponent implements OnInit {
  addresses;
  emptyErr;
  @Output() address:EventEmitter<any> = new EventEmitter<any>();
  constructor(private addressSearchService:AddressSearchService,
  private storeService: StorageService) { }

  ngOnInit() {
  }
  sendAddess(addresPick){
    let postCode = this.storeService.retriveData('postcode2')
    this.address.emit({addresPick, postCode});
  }
  getAddress(postcode){
    if(!postcode){
      this.emptyErr = "Post Code must be present"
      return;
    }
    this.addressSearchService.findAddres(postcode).subscribe((address)=>{
      // console.log(address.addresses);
      this.storeService.storeData('postcode2', postcode.toUpperCase());
      this.addresses = address.addresses;
    })
  }

}
