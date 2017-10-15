import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ReviewService } from "../../services/review.service";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-reviews',
  templateUrl: 'reviews.component.html',
  styleUrls: ['reviews.component.scss']
})
export class ReviewsComponent implements OnInit, OnChanges {
  reviews:Observable<any>;
  @Input() Id;
  constructor(private reviewService:ReviewService) {
    this.reviewService.getReviews().subscribe((review)=>{
      this.reviews = review.filter(rev=>rev.productId == this.Id).reverse();
    });
  }


  ngOnInit() {
  }
  ngOnChanges(Id){
    this.reviewService.getReviews().subscribe((review)=>{
      this.reviews = review.filter(rev=>rev.productId == this.Id).reverse();
    });
  }

}
