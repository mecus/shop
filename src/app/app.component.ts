import { Component, OnInit } from '@angular/core';
import { WindowService } from './services/window.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DbService } from 'app/services/db.service';
import { Store } from '@ngrx/store';
import * as shopActions from './store-management/actions/shop.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  window;
  constructor(
    private _router:Router, private windowService:WindowService,
    private db: DbService, private store: Store<any>
  ){
    this.window = this.windowService.getWindowObject();
  }

  goToto(){
    let scrollbehavior = 'scrollBehavior' in document.documentElement.style;
    let option = {
      "behavior": "smooth",
      "left": 0,
      "top": 0
    };
    if(scrollbehavior){
      this.window.scrollTo(option);
    }else{
      this.window.scrollTo(option.left, option.top);
    }

  }
  ngOnInit(){
    this.db.createDb();
    this._router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      // window.scrollTo(0, 0)
      
      this.window.setTimeout(function(){
        this.window.scrollTo(0, 1);
        }, 0);
    });
    window.addEventListener('scroll', (e)=>{
      let yPos = window.pageYOffset;
      let goTo = document.getElementById('goTop');
      if(yPos > 500){
        goTo.style.opacity = "1";
        goTo.style.transition = "2s";
      }else{
        goTo.style.opacity = "0";
        goTo.style.transition = "1s";
      }
    
    });
  }
}