import { Component, OnInit, OnChanges } from '@angular/core';
import { Router, Params, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';
import * as shopActions from '../../store-management/actions/shop.action';
import * as cartActions from '../../store-management/actions/cart.action';
import { ProductService } from '../../services/product.service';
import { Observable } from 'rxjs/Observable';
import { WindowService } from "../../services/window.service";
import { ClearHeighlightMenu } from "../../services/clearfunction.service";
import { iShop } from '../../store-management/models/shop.model';
import { DbService } from '../../services/db.service';
import * as _ from 'lodash';

interface shopState {
  dept_id: string
}

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

  constructor(
    private _router:Router, private productService:ProductService, 
    private _http:Http, private route:ActivatedRoute, 
    private windowService:WindowService,
    private clearHeighlightMenu:ClearHeighlightMenu,
    private store: Store<any>,
    private db: DbService
    
  ) {
    // Initialize Cart DB
    db.createDb();
      // Loading Shop initial state
      this.db.getShopDatabase("initialState").then((state)=>{
        // console.log(state);
        if(state){
          // console.log(state);
          this.store.dispatch({type: shopActions.LOAD_SHOP, payload: state});
        }else{
          this.store.dispatch({type: shopActions.LOAD_SHOP, payload: this.payLoad()});
        }
      })
    .catch(err => console.log(err));
    // Setting window object variables
      this.window = this.windowService.getWindowObject();
      this.document = this.windowService.getDocumentRef();
      // this.getMenuDepartment();

    // New Data endpoint for loading Departments
    this.productService.getStoreDepartment()
    .map(snapshot => {
      return snapshot.map(e => {
        let id = e.payload.doc.id;
        let data = e.payload.doc.data();
        return {id, ...data};
      })
    }).subscribe(dept => {
      // console.log(dept);
      this.departments = dept;
    });
    // this.productService.getStoreIsle('YX28w0dfORCQO5umZvuX').map(snapshot => {
    //   // console.log(snapshot)
    // }).subscribe();
  }
  payLoad(){
    return {
     dept_id: null,
     aisle_id: null,
     cat_id: null,
     product_id: null,
     loading: null,
     offer: null
    }
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
    this._router.navigate(["/shop/instruction_video"]);
  }
  goTop(){
    this.window.scrollTo(0, 0);
    // let stickDom = this.document.getElementById('sticky-menu');
    // let dom = this.document.getElementById('top-screen');
    // dom.style.top = "0";
  }
  //Get product by department
  selectedDept(dept?, event?){

    this.store.dispatch({type: shopActions.DEPARTMENT, payload: dept.id});
    // console.log(event.currentTarget.className );
    //{dept_id: dept.id, department:dept.name}
    this._router.navigate(["/shop/products", dept.name]);
 
    this.clearHeighlightMenu.clearMenu();
    event.target.style.backgroundColor = "#f5f5f5";
    event.target.style.color = "#00796B";
  
    this.showHow = false;

    // let selected = this.route.snapshot.params;
    // console.log(selected['name']);
    

    // this.state = this.store.select("appState");
    // this.router.events.filter(route=> route instanceof NavigationEnd)
    // .subscribe((stat)=> {
    //   console.log(stat);
    // })
  }
  bestOffer(){
    this.store.dispatch({type: shopActions.OFFER, payload: 'yes'});
    this._router.navigate(["/shop/offer/products"]);
  }
  listingBrands(){
    this.brands$ =this.productService.getBrands();
  }
  //Search product by Brands
  searchBrand(brand){
    alert(brand);
  }
  ngOnInit() {
    // Loading Cart Initial Data
    this.windowService.getWindowObject().setTimeout(()=>{
      this.db.retrieveInitialCart();
      this.db.getInitialAuth();
    }, 500);
    
    // this.store.dispatch({type: cartActions.INITIAL_STATE, payload: cart});
 
 
    this.window.setTimeout(()=>{
      let selected = this.route.snapshot.params;
      let i;
      let tab = this.document.getElementsByClassName('nav-link');
      for (i = 0; i < tab.length; i++) {
          if(tab[i].innerHTML == selected['dept']){    
            tab[i].style.backgroundColor = "#f5f5f5";
            tab[i].style.color = "#00796B";
          }
      }
    }, 300);

    this.listingBrands();
    
    let stickDom = this.document.getElementById('sticky-menu');
    let dom = this.document.getElementById('sub-menu');
    let toolbar = this.document.getElementById('toolbar');

      this.window.addEventListener('scroll', (e)=>{
        let yPos = this.window.pageYOffset;
        if(yPos > 120){
          dom.style.visibility = "0";
          stickDom.style.display = "block";
          // stickDom.style.marginTop = "0px";
          stickDom.style.position = "fixed";
          stickDom.style.top = "0px";
          stickDom.style.zIndex = "1000";
          this.window.setTimeout(()=>{
            toolbar.style.marginTop = "0px";
            toolbar.style.transition = "0.2s";
            toolbar.style.transitionTimingFunction = "linear";
          }, 200);

        }else{
          dom.style.visibility = "1";
          // stickDom.style.marginTop = "-200px";
          stickDom.style.top = "-100px";
          stickDom.style.position = "absolute";
          stickDom.style.display = "none";

          
          toolbar.style.marginTop = "-100px";
          
        }
      })
  }
  getMenuDepartment(){
    this.productService.getDepartmentMenu().subscribe((data)=>{
      this.departments =data;
    });
  }

}