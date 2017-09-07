var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { ProductService } from '../../../services/product.service';
import { WindowService } from "../../../services/window.service";
import { ClearHeighlightMenu } from "../../../services/clearfunction.service";
var SubMenuComponent = (function () {
    function SubMenuComponent(router, productService, _http, route, windowService, clearHeighlightMenu) {
        this.router = router;
        this.productService = productService;
        this._http = _http;
        this.route = route;
        this.windowService = windowService;
        this.clearHeighlightMenu = clearHeighlightMenu;
        this.selected = false;
        this.showHow = false;
        this.window = this.windowService.getWindowObject();
        this.document = this.windowService.getDocumentRef();
        // console.log(this.document);
        // console.log(this.store.select('appState'));
    }
    SubMenuComponent.prototype.showHowTo = function () {
        if (this.showHow) {
            this.showHow = false;
            return;
        }
        this.clearHeighlightMenu.clearMenu();
        this.showHow = true;
    };
    SubMenuComponent.prototype.goTop = function () {
        this.window.scrollTo(0, 0);
        // let stickDom = this.document.getElementById('sticky-menu');
        // let dom = this.document.getElementById('top-screen');
        // dom.style.top = "0";
    };
    SubMenuComponent.prototype.selectedDept = function (dept, event) {
        // console.log(event.currentTarget.className );
        this.router.navigate(["/products/?", { dept_id: dept._id, name: dept.name, selected: true, code_number: dept.code }]);
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
    };
    SubMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productService.getCachedData().subscribe(function (data) {
            _this.departments = data.department;
        });
        var stickDom = this.document.getElementById('sticky-menu');
        var dom = this.document.getElementById('sub-menu');
        this.window.addEventListener('scroll', function (e) {
            var yPos = _this.window.pageYOffset;
            if (yPos > 120) {
                dom.style.visibility = "0";
                stickDom.style.display = "block";
                stickDom.style.position = "fixed";
                stickDom.style.top = "0px";
                stickDom.style.zIndex = "1000";
            }
            else {
                dom.style.visibility = "1";
                stickDom.style.display = "none";
                stickDom.style.position = "relative";
            }
        });
    };
    return SubMenuComponent;
}());
SubMenuComponent = __decorate([
    Component({
        selector: 'sub-menu',
        templateUrl: './sub-menu.html',
        styleUrls: ['./sub-menu.scss']
    }),
    __metadata("design:paramtypes", [Router, ProductService,
        Http, ActivatedRoute, WindowService,
        ClearHeighlightMenu])
], SubMenuComponent);
export { SubMenuComponent };
//# sourceMappingURL=sub-menu.js.map