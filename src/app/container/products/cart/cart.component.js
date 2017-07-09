System.register(["@angular/core", "@ngrx/store"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, store_1, CartComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            }
        ],
        execute: function () {
            CartComponent = (function () {
                function CartComponent(store) {
                    this.store = store;
                    this.cart$ = this.store.select('cartReducer');
                    //    console.log(this.cart$);
                }
                CartComponent = __decorate([
                    core_1.Component({
                        selector: 'shop-cart',
                        template: "\n    \n       <div class=\"container\">\n            <p>Your Cart</p>\n            <li *ngFor=\"let cat of cart$ | async\">\n                <p>{{cat.name}} <span>{{cat.qty}}</span></p>\n                <span>{{cat.price | currency : 'GBP' :true}}</span>\n            </li>\n       </div>\n\n    ",
                        styles: ['']
                    }),
                    __metadata("design:paramtypes", [store_1.Store])
                ], CartComponent);
                return CartComponent;
            }());
            exports_1("CartComponent", CartComponent);
        }
    };
});
//# sourceMappingURL=cart.component.js.map