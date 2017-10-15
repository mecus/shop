import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { ProductService } from '../../../services/product.service';
import { Observable } from 'rxjs/Observable';
import { WindowService } from "../../../services/window.service";
import { ClearHeighlightMenu } from "../../../services/clearfunction.service";



@Component({
  selector: 'sub-menu',
  templateUrl: 'sub-menu.html',
  styleUrls:['sub-menu.scss']
})
export class SubMenuComponent implements OnInit {
    state:Observable<any>;
    category;
    departments;
    selected: boolean =false;
    showHow:boolean = false;
    window;
    document;
    brands$:Observable<any>;

  constructor(private router:Router, private productService:ProductService, 
  private _http:Http, private route:ActivatedRoute, private windowService:WindowService,
  private clearHeighlightMenu:ClearHeighlightMenu) {
      this.window = this.windowService.getWindowObject();
      this.document = this.windowService.getDocumentRef();
      this.getMenuDepartment();
   }

  // Function to display brands list
  getBrands(e){
    let el = this.document.querySelector('#brand-select');
    let brandEl = this.document.querySelector('.brand-list');
    if(e.type == "mouseenter"){
      brandEl.style.display = "block";
      el.style.backgroundColor = "#f5f5f5"
      
    }else if(e.type == "mouseleave"){
      brandEl.style.display = "none";
      el.style.backgroundColor = "transparent"
    }
  }
  // How to! Video listing
  showHowTo(){
    
    if(this.showHow){
      this.showHow = false;
      return;
    }
    this.clearHeighlightMenu.clearMenu();
    this.showHow = true;
    this.router.navigate(["/instruction_video"]);
  }
  goTop(){
    this.window.scrollTo(0, 0);
    // let stickDom = this.document.getElementById('sticky-menu');
    // let dom = this.document.getElementById('top-screen');
    // dom.style.top = "0";
  }
  //Get product by department
  selectedDept(dept?, event?){
    // console.log(event.currentTarget.className );
    this.router.navigate(["/products/?", {dept_id:dept._id, dept:dept.name, selected: true, code_number: dept.code}]);
 
    this.clearHeighlightMenu.clearMenu();
    event.target.style.backgroundColor = "#f5f5f5";
    event.target.style.color = "#000";
  
    this.showHow = false;

    // let selected = this.route.snapshot.params;
    // console.log(selected['name']);
    

    // this.state = this.store.select("appState");
    // this.router.events.filter(route=> route instanceof NavigationEnd)
    // .subscribe((stat)=> {
    //   console.log(stat);
    // })
  }
  listingBrands(){
    this.brands$ =this.productService.getBrands();
  }
  //Search product by Brands
  searchBrand(brand){
    alert(brand);
  }
  ngOnInit() {
    this.window.setTimeout(()=>{
      let selected = this.route.snapshot.params;
      let i;
      let tab = this.document.getElementsByClassName('nav-link');
      for (i = 0; i < tab.length; i++) {
          if(tab[i].innerHTML == selected['dept']){    
            tab[i].style.backgroundColor = "#f5f5f5";
          }
      }
    }, 300);

    this.listingBrands();
    
    let stickDom = this.document.getElementById('sticky-menu');
    let dom = this.document.getElementById('sub-menu');
    
      this.window.addEventListener('scroll', (e)=>{
        let yPos = this.window.pageYOffset;
        if(yPos > 120){
          dom.style.visibility = "0";
          stickDom.style.display = "block";
          // stickDom.style.marginTop = "0px";
          stickDom.style.position = "fixed";
          stickDom.style.top = "0px";
          stickDom.style.zIndex = "1000";
         
        }else{
          dom.style.visibility = "1";
          // stickDom.style.marginTop = "-200px";
          stickDom.style.display = "none";
          stickDom.style.position = "absolute";
        }
      })
  }
  getMenuDepartment(){
    this.productService.getDepartmentMenu().subscribe((data)=>{
      this.departments =data;
    });
  }

}