System.register(["@angular/core", "@angular/router", "@angular/http", "../../../services/product.service"], function (exports_1, context_1) {
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
    var core_1, router_1, http_1, product_service_1, SubMenuComponent;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (product_service_1_1) {
                product_service_1 = product_service_1_1;
            }
        ],
        execute: function () {
            SubMenuComponent = (function () {
                function SubMenuComponent(router, productService, _http, route) {
                    this.router = router;
                    this.productService = productService;
                    this._http = _http;
                    this.route = route;
                    this.selected = false;
                }
                SubMenuComponent.prototype.selectedDept = function (dept) {
                    dept.selected = false;
                    this.router.navigate(["/products/?", { dept_id: dept._id, name: dept.name, selected: true, code_number: dept.code }]);
                    setTimeout(function () {
                        dept.selected = true;
                    }, 500);
                };
                SubMenuComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.productService.getProducts().subscribe(function (data) {
                        _this.departments = data.department;
                    });
                };
                SubMenuComponent = __decorate([
                    core_1.Component({
                        selector: 'sub-menu',
                        templateUrl: './sub-menu.html',
                        styleUrls: ['./sub-menu.css']
                    }),
                    __metadata("design:paramtypes", [router_1.Router, product_service_1.ProductService, http_1.Http, router_1.ActivatedRoute])
                ], SubMenuComponent);
                return SubMenuComponent;
            }());
            exports_1("SubMenuComponent", SubMenuComponent);
        }
    };
});
//# sourceMappingURL=sub-menu.js.map