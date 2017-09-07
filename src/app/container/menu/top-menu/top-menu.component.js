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
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { WindowService } from "../../../services/window.service";
import { ClearHeighlightMenu } from "../../../services/clearfunction.service";
import { StorageService } from "../../../services/storage.service";
import { AuthService } from "../../../authentications/authentication.service";
import { CartService } from '../../../services/cart.service';
var TopMenuComponent = (function () {
    function TopMenuComponent(windowRef, _location, _router, clearHeighlightMenu, storeService, cartService, authService) {
        this.windowRef = windowRef;
        this._location = _location;
        this._router = _router;
        this.clearHeighlightMenu = clearHeighlightMenu;
        this.storeService = storeService;
        this.cartService = cartService;
        this.authService = authService;
        this.triger = false;
        this.window = this.windowRef.getWindowObject();
        this.document = this.windowRef.getDocumentRef();
    }
    TopMenuComponent.prototype.goHome = function () {
        this.clearHeighlightMenu.clearMenu();
        this._router.navigate(["/"]);
    };
    TopMenuComponent.prototype.appResetTimeOut = function () {
        var _this = this;
        //Remove Postcode from the storage
        if (this.storeService.retriveData('postcode')) {
            setTimeout(function () {
                _this.triger = true;
                _this.interV = setInterval(_this.flashIcon, 2000);
            }, 500000);
            setTimeout(function () {
                var code = _this.storeService.retriveData('postcode');
                _this.cartService.removeBatchCart(code);
                _this.storeService.cleardata('postcode');
                clearInterval(_this.interV);
                _this.triger = false;
            }, 600000);
        }
    };
    TopMenuComponent.prototype.flashIcon = function () {
        var flash = this.document.getElementById('fashIcon');
        flash.innerHTML = "wb_sunny";
        flash.style.color = "red";
        setTimeout(function () {
            flash.style.color = "lightgreen";
            // flash.innerHTML = `wb_sunny`;
        }, 1000);
    };
    TopMenuComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.authService.authState().subscribe(function (state) {
            if (state == null) {
                _this.appResetTimeOut();
            }
        });
        var dom = document.getElementById('top-screen');
        this.window.addEventListener('scroll', function (e) {
            var yPos = _this.window.pageYOffset;
            // if(yPos > 100){
            //   dom.style.display = "none";
            //   // alert("More than 300");
            // }else{
            //   dom.style.display = "block";
            // }
            // console.log(e);
        });
        // if(this.window.screenTop < 25){
        //   // alert("Screemmmm");
        //   this.window.document.body.scrollTop = 400;
        // }
    };
    return TopMenuComponent;
}());
TopMenuComponent = __decorate([
    Component({
        selector: 'app-top-menu',
        templateUrl: './top-menu.component.html',
        styleUrls: ['./top-menu.component.scss']
    }),
    __metadata("design:paramtypes", [WindowService,
        Location,
        Router,
        ClearHeighlightMenu,
        StorageService,
        CartService,
        AuthService])
], TopMenuComponent);
export { TopMenuComponent };
//# sourceMappingURL=top-menu.component.js.map