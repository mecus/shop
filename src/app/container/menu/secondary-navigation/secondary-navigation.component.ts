import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'secondary-navigation',
  templateUrl: './secondary-navigation.component.html',
  styleUrls: ['./secondary-navigation.component.scss']
})
export class SecondaryNavigationComponent implements OnInit {

  constructor(private _router:Router) { }

  goHome(){
    this._router.navigate(["/"]);
  }
  ngOnInit() {
  }

}
