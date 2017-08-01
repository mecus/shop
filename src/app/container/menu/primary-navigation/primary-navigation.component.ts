import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'primary-navigation',
  template: `
    <app-top-menu></app-top-menu>
    <sub-menu></sub-menu>
  `

})
export class PrimaryNavigationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
