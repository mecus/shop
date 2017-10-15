import { Component, OnInit } from '@angular/core';
import { WindowService } from './services/window.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  window;
  constructor(private _router:Router, private windowService:WindowService){
    this.window = this.windowService.getWindowObject();
  }
  ngOnInit(){
    this._router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
          return;
      }
      // window.scrollTo(0, 0)
      
      this.window.setTimeout(function(){
        this.window.scrollTo(0, 1);
        }, 0);
    });
    // if(window.menubar.visible == true){
    //   console.log(window.toolbar.visible);
    // }
    
  }

}
