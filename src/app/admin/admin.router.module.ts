import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { RouterComponent } from './route-component/admin-route.component';
import { AddDeptComponent } from './department/add-dept.component';
import { ListDeptComponent } from './department/list-dept.component';
import { SingleDeptComponent } from './department/single-dept.component';
import { AisleComponent } from './aisles/single-aisle.component';
import { BrandsComponent } from './brands/brands.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { SelectComponent } from './select/select.component';
import { SelectCatComponent } from './select/select-cat.component';
import { SelectAisleComponent } from './select/select-aisle.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { SingleProductComponent } from './products/single-product/single-product.component';

const routes = [
    {
        path: '', component: RouterComponent,
        children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'users', component: UsersComponent},
            {path: 'new_department', component: AddDeptComponent},
            {path: 'departments', component: ListDeptComponent},
            {path: 'departments/:id', component: SingleDeptComponent},
            {path: 'aisle/:id', component: AisleComponent},
            {path: 'brands', component: BrandsComponent},
            {path: 'products', component: ListProductComponent},
            {path: 'products/view/:id', component: SingleProductComponent},
            {path: 'products/new/:id', component: NewProductComponent},
            // {path: 'products/edit/:id', component: EditProductComponent},
            {path: 'products/department', component: SelectComponent},
            {path: 'products/category/:id', component: SelectCatComponent},
            {path: 'products/aisle/:id', component: SelectAisleComponent}

            
        ]
    }
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})

export class AdminRouterModule {}