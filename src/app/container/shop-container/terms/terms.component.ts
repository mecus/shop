import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../../services/shop.service';

@Component({
  selector: 'terms',
  templateUrl: 'terms.component.html',
  styleUrls: ['terms.component.scss']
})
export class TermsComponent implements OnInit {
  terms;
  constructor(private shopService:ShopService) { }

  ngOnInit() {
    setTimeout(()=>{
      this.getTerms();
    }, 500);
    
  }

  getTerms(){
    let domE = document.querySelector('#term-body');
    let terms = this.shopService.termsCondition();
    domE.innerHTML = terms;
    
  }

}
