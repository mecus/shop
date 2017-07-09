System.register(["@angular/core", "@ngrx/store", "../../../services/cart.service", "rxjs/add/operator/map", "rxjs/add/operator/catch"], function (exports_1, context_1) {
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
    var core_1, store_1, cart_service_1, firebase, SideCartComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (store_1_1) {
                store_1 = store_1_1;
            },
            function (cart_service_1_1) {
                cart_service_1 = cart_service_1_1;
            },
            function (_1) {
            },
            function (_2) {
            }
        ],
        execute: function () {
            firebase = window['firebase'];
            SideCartComponent = (function () {
                function SideCartComponent(store, cartService) {
                    // this.store.dispatch({type: cart.LOAD_CART});
                    // this.cart$ = store.select('cart');
                    // this.cart$ = cartService.getCart();
                    // this.cartService.getFb();
                    var _this = this;
                    this.store = store;
                    this.cartService = cartService;
                    this.cart$ = [];
                    var db = firebase.database().ref('/carts');
                    db.on('value', function (snapshot) {
                        // console.log(snapshot.val());
                        snapshot.forEach(function (cart) {
                            _this.cart$.push(cart.val());
                        });
                    });
                }
                SideCartComponent.prototype.removeItem = function (product) {
                    console.log(product);
                    this.cartService.removeCart(this.payLoad(product));
                    // this.store.dispatch({type: cart.REMOVE, payload: this.payLoad(product)})
                };
                SideCartComponent.prototype.increment = function (product) {
                    this.cartService.incrementCart(this.payLoad(product));
                    // this.store.dispatch({type: cart.INCREMENT, payload: this.payLoad(product)})
                };
                SideCartComponent.prototype.decrement = function (product) {
                    if (product.qty == 0 || product.qty < 1) {
                        this.cartService.removeCart(this.payLoad(product));
                    }
                    else {
                        this.cartService.decrementCart(this.payLoad(product));
                    }
                    // this.store.dispatch({type: cart.DECREMENT, payload: this.payLoad(product)})
                };
                SideCartComponent.prototype.payLoad = function (product) {
                    return {
                        key: product.$key,
                        id: product.id,
                        name: product.name,
                        product_id: product.id,
                        price: product.price,
                        qty: product.qty,
                        imageUrl: product.imageUrl
                    };
                };
                SideCartComponent.prototype.ngOnInit = function () {
                };
                SideCartComponent = __decorate([
                    core_1.Component({
                        selector: 'side-shop-cart',
                        template: "\n       <div class=\"container jumbotron-clone\" *ngIf=\"cart$\">\n            <p class=\"cart-head\">Your Basket <md-icon>shopping_cart</md-icon></p>\n            <div *ngFor=\"let cat of cart$\">\n                <div class=\"row cart-list\">\n                    <div class=\"col col-xs-6 col-lg-6\">\n                        <p>{{cat.name}}</p>\n                    </div>\n                    <div class=\"col col-xs-3 col-lg-3\">\n                        <p>qty: {{cat.qty}}</p>\n                    </div>\n                    <div class=\"col col-xs-3 col-lg-3\">\n                        <p>{{cat.qty * cat.price | currency : 'GBP' :true}}</p>\n                    </div>\n                    <div class=\"row cart-info\">\n                        <div class=\"\"col col-lg-4>\n                            <img [src]=\"cat.imageUrl\" [style.width.px]=\"50\" alt=\"prod-image\">\n                        </div>\n                        <div class=\"\"col col-lg-4>\n                            <div class=\"row qty-control\">\n                                <div class=\"col col-xs-4 dec\" (click)=\"decrement(cat)\">-</div>\n\n                                <div class=\"col col-xs-4 inc\" (click)=\"increment(cat)\">+</div>\n                            </div>\n                        </div>\n                        <div class=\"\"col col-lg-4>\n                            <p (click)=\"removeItem(cat)\"><md-icon>delete</md-icon>Remove</p>\n                        </div>\n                    </div>\n                    \n                </div>\n                \n            </div>\n       </div>\n\n    ",
                        styles: ["\n        .row, col{\n            margin:0px;\n            padding:0px;\n        }\n        div.jumbotron-clone{ \n            background-color: lightgrey;\n            margin: 0px;\n            padding:0px;\n            \n        }\n        div.cart-list{\n            padding: 0px 5px;\n        }\n        div.cart-list p{\n            font-size: 11px;\n        }\n        p.cart-head{\n            width:100%;\n            padding: 5px 10px;\n            color:#fff;\n            font-weight: bold;\n        }\n        .cart-head{\n            \n            background-color:slategray;\n        }\n        div.qty-control{\n            padding: 5px;\n        }\n        div.qty-control .inc{\n            background-color: slategrey;\n            border-radius: 5px;\n            margin: 2px;\n            color: #fff;\n        }\n        div.qty-control .num{\n            background-color: #fff;\n            text-align: center;\n        }\n        div.qty-control .dec{\n            background-color: slategrey;\n            border-radius: 5px;\n            margin: 2px;\n            color: #fff;\n        }\n       \n        div.cart-info img{\n            padding: 5px;\n            border-radius: 5px;\n        }\n    "]
                    }),
                    __metadata("design:paramtypes", [store_1.Store, cart_service_1.CartService])
                ], SideCartComponent);
                return SideCartComponent;
            }());
            exports_1("SideCartComponent", SideCartComponent);
        }
    };
});
//# sourceMappingURL=cart.side.component.js.map