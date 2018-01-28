import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../authentications/authentication.service';
import { Store } from '@ngrx/store';
import * as authAction from '../../store-management/actions/auth.action';
// import { DbService } from '../../services/db.service';
// import { Cart } from '../../store-management/models/cart.model';
export type Actions = authAction.All;


@Component({
    selector: 'mobile-menu',
    templateUrl: 'mobile-menu.component.html',
    styleUrls: ['mobile-menu.component.scss']
})

export class MobileMenuComponent implements OnInit{
    currentUser;
    togglecart:boolean = false;
    menu:boolean = false;
    name;
    departments = [
        {name: "Dry Food"}, {name: "Drinks"}, {name: "Frozen Food"},
        // {name: "Ingridents"}, {name: "Baverages"}, {name: "Health & Beauty"}
    ];
    drinks = [{name: "Alcohol Drink"}, {name: "Water"}, {name: "Soft Drink"}, {name: "Dairy"}];
    constructor(
        private _router:Router, private _location:Location, 
        private productService:ProductService,
        private authService:AuthService,
        private store: Store<any>
        ){
            store.select('auth').subscribe((auth)=> {
                this.currentUser = auth.displayName;
            })
        }
    back(){
        this._location.back();  
    }
    goHome(){
        // this.slideMenu();
        this._router.navigate(["/"]);
        
    }
    logOff(){
        this.authService.logout().then((res)=> {
            this.store.dispatch({type: authAction.LOGOUT, payload: 'auth'});
            // setTimeout(()=>{this._router.navigate(["/login"]);}, 500)
        })
    }
    toggleCart(){
        this.togglecart = (this.togglecart == false? true : false);
        // let dom = document.getElementById('check-out');
        // if(this.togglecart == true){
        //     dom.style.display = "none";
        //     dom.style.backgroundColor = "red";
        // }
    }
    slideMenu(){
        this.menu = (this.menu == false? true : false);
        let domE = document.getElementById('mob-page-container');
        let domE2 = document.getElementById('menu-head');
        if(this.menu == true){
            domE.style.marginLeft = "0px";
            domE2.style.marginLeft = "0px";
            setTimeout(()=>{
                domE.style.backgroundColor = "rgba(0, 0, 0, 0.3)";
            },300);
            
        }else{
            domE.style.backgroundColor = "transparent";
            domE.style.marginLeft = "-100%";
            domE2.style.marginLeft = "-250px";
        }
        
    }

    getCatMenu(dept){
        // console.log(dept);
        this.name = dept.name;
        // this.departments = this.drinks;
        this._router.navigate(['/products/?', {dept_id : dept._id, dept: dept.name, code_number:dept.code}]);

        this.productService.getCachedData().subscribe((data)=>{
            // console.log(data);
            this.departments = data.category.filter((cat)=>cat.department_id == dept._id);
        });
    }
    getMenuItems$(){
        this.productService.getDepartmentMenu().subscribe((dept)=>{
            // console.log(dept);
            this.departments = dept;
        });
    }
    @HostListener('click', ['$event']) removeDom($event){
        $event.stopPropagation();
        if($event.target['id'] == 'mob-page-container'){
            this.slideMenu();
        }
    }
    ngOnInit(){
        this.getMenuItems$();
        // this.authService.authState().subscribe((state)=>{
        //     this.currentUser = state;
        //     // console.log(this.currentUser);
        // });

    }
}