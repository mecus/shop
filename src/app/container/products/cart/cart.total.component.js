System.register(["@angular/core", "@ngrx/store", "../../../services/cart.service"], function (exports_1, context_1) {
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
    var core_1, store_1, cart_service_1, CartTotalComponent;
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
            }
        ],
        execute: function () {
            CartTotalComponent = (function () {
                function CartTotalComponent(store, cartService) {
                    this.store = store;
                    this.cartService = cartService;
                }
                CartTotalComponent.prototype.ngOnInit = function () {
                    // this.getCartTotal();
                };
                //  getCartTotal(){
                //     this.cartService.cartTotal().subscribe((carts)=>{
                //        this.total = carts.map((cart) => {
                //            return cart.price * cart.qty   
                //         });
                //         this.sum = this.total.reduce(this.reducer, 0);
                //     })
                // }
                CartTotalComponent.prototype.reducer = function (sum, num) {
                    return sum + num;
                };
                CartTotalComponent = __decorate([
                    core_1.Component({
                        selector: 'cart-total',
                        template: "\n    \n            <span>{{sum | currency: \"GBP\" :true}}</span>\n           \n    ",
                        styles: ['']
                    }),
                    __metadata("design:paramtypes", [store_1.Store, cart_service_1.CartService])
                ], CartTotalComponent);
                return CartTotalComponent;
            }());
            exports_1("CartTotalComponent", CartTotalComponent);
        }
    };
});
//# sourceMappingURL=cart.total.component.js.map