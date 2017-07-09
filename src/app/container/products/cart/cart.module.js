System.register(["@angular/core", "@angular/common", "../../../utility/material-design.module", "./cart.component", "./cart.side.component", "./cart.total.component"], function (exports_1, context_1) {
    "use strict";
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __moduleName = context_1 && context_1.id;
    var core_1, common_1, material_design_module_1, cart_component_1, cart_side_component_1, cart_total_component_1, CartModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (material_design_module_1_1) {
                material_design_module_1 = material_design_module_1_1;
            },
            function (cart_component_1_1) {
                cart_component_1 = cart_component_1_1;
            },
            function (cart_side_component_1_1) {
                cart_side_component_1 = cart_side_component_1_1;
            },
            function (cart_total_component_1_1) {
                cart_total_component_1 = cart_total_component_1_1;
            }
        ],
        execute: function () {
            CartModule = (function () {
                function CartModule() {
                }
                CartModule = __decorate([
                    core_1.NgModule({
                        imports: [
                            common_1.CommonModule, material_design_module_1.MaterialModule
                        ],
                        declarations: [cart_component_1.CartComponent, cart_side_component_1.SideCartComponent, cart_total_component_1.CartTotalComponent],
                        exports: [cart_component_1.CartComponent, cart_side_component_1.SideCartComponent, cart_total_component_1.CartTotalComponent],
                        providers: []
                    })
                ], CartModule);
                return CartModule;
            }());
            exports_1("CartModule", CartModule);
        }
    };
});
//# sourceMappingURL=cart.module.js.map