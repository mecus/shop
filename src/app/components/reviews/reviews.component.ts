import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReviewService } from "../../services/review.service";
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

@Component({
  selector: 'app-reviews',
  templateUrl: 'reviews.component.html',
  styleUrls: ['reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnChanges {
  reviews;
  @Input() Id;
  constructor(private reviewService:ReviewService) {
    this.reviewService.getReviews().subscribe((review)=>{
      this.reviews = _.reverse(_.filter(review, {'productId': this.Id}));
    });
  }


  ngOnInit() {
  }
  ngOnChanges(Id){
    this.reviewService.getReviews().subscribe((review)=>{
      this.reviews = _.reverse(_.filter(review, {'productId': this.Id}));
    });
  }

}
