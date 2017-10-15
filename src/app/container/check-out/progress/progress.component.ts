import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'checkout-progress',
  templateUrl: 'progress.component.html',
  styleUrls: ['progress.component.scss']
})
export class ProgressComponent implements OnInit {
  progressList = ["Billing Information", "Delivery Information", 
  "Shipping Method", "Payment Method", "Order Review", "Complete"]
  constructor() { }

  ngOnInit() {
  }

}
