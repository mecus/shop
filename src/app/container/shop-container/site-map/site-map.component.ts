import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-map',
  templateUrl: 'site-map.component.html',
  styleUrls: ['site-map.component.scss']
})
export class SiteMapComponent implements OnInit {
  collection = [
    "assets/slide/slide-e1.jpg", "assets/slide/slide-e2.jpg",
    "assets/slide/slide-e3.jpg", "assets/slide/slide-e4.jpg"
  ]
  loopSpeed = 5000;
  constructor() { }

  ngOnInit() {
  }

}
