import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs/Observable';
import { WindowService } from "app/services/window.service";
import { Store, Action } from '@ngrx/store';
import { ClearHeighlightMenu } from "app/services/clearfunction.service";



@Component({
  selector: 'sub-menu',
  templateUrl: './sub-menu.html',
  styleUrls:['./sub-menu.scss']
})
export class SubMenuComponent implements OnInit {
    state:Observable<any>;
    category;
    departments;
    selected: boolean =false;
    showHow:boolean = false;
    window;
    document;

  constructor(private store:Store<any>, private router:Router, private productService:ProductService, 
  private _http:Http, private route:ActivatedRoute, private windowService:WindowService,
  private clearHeighlightMenu:ClearHeighlightMenu) {
      this.window = this.windowService.getWindowObject();
      this.document = this.windowService.getDocumentRef();
      console.log(this.document);
      // console.log(this.store.select('appState'));

   }

  showHowTo(){
    if(this.showHow){
      this.showHow = false;
      return;
    }
    this.clearHeighlightMenu.clearMenu();
    this.showHow = true;
  }
  goTop(){
    let stickDom = this.document.getElementById('sticky-menu');
    let dom = this.document.getElementById('top-screen');
    dom.style.top = "0";
  }
  selectedDept(dept?, event?){
    // console.log(event.currentTarget.className );
    this.router.navigate(["/products/?", {dept_id:dept._id, name:dept.name, selected: true, code_number: dept.code}]);
 
    this.clearHeighlightMenu.clearMenu();
    event.target.style.backgroundColor = "#f5f5f5";
    event.target.style.color = "#000";
  
    this.showHow = false;
    // dept.selected = false;

    // this.state = this.store.select("appState");
    // this.router.events.filter(route=> route instanceof NavigationEnd)
    // .subscribe((stat)=> {
    //   console.log(stat);
    // })
  
      
    
    
   
  }

  
  ngOnInit() {
    this.productService.getCachedData().subscribe((data)=>{
      this.departments =data.department;
    });
    let stickDom = this.document.getElementById('sticky-menu');
    let dom = this.document.getElementById('sub-menu');
    
      this.window.addEventListener('scroll', (e)=>{
        let yPos = this.window.pageYOffset;
        if(yPos > 120){
          dom.style.visibility = "0";
          stickDom.style.display = "block";
          stickDom.style.position = "fixed";
          stickDom.style.top = "0px";
          stickDom.style.zIndex = "1000";
         
        }else{
          dom.style.visibility = "1";
          stickDom.style.display = "none";
          stickDom.style.position = "relative";
        }
      })
  }

}