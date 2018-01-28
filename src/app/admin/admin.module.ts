import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminRouterModule } from './admin.router.module';
import { UsersComponent } from './users/users.component';
import { RouterComponent } from './route-component/admin-route.component';
import { AppSharedModule } from '../share-modules/app.shared.module';
import { MaterialModule } from '../share-modules/material/material.module';
import { NavigationComponent } from './navigations/navigation.component';
import { SideNavComponent } from './navigations/side-nav.component';
import { AddDeptComponent } from './department/add-dept.component';
import { UploadImageService } from './services/image-upload.service';
import { AdminService } from './services/admin.service';
import { ListDeptComponent } from './department/list-dept.component';
import { SingleDeptComponent } from './department/single-dept.component';
import { StoreService } from './services/store.service';
import { AisleComponent } from './aisles/single-aisle.component';
import { BrandsComponent } from './brands/brands.component';
import { ListProductComponent } from './products/list-product/list-product.component';
import { NewProductComponent } from './products/new-product/new-product.component';
import { SelectComponent } from './select/select.component';
import { SelectAisleComponent } from './select/select-aisle.component';
import { SelectCatComponent } from './select/select-cat.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { SingleProductComponent } from './products/single-product/single-product.component';
import { EditDeptComponent } from './department/edit-dept.component';

@NgModule({
    imports: [
        CommonModule, AdminRouterModule, MaterialModule,
        FormsModule, ReactiveFormsModule, HttpClientModule
        // AppSharedModule
    ],
    declarations: [
        DashboardComponent, UsersComponent,
        RouterComponent, NavigationComponent,
        SideNavComponent, AddDeptComponent,
        ListDeptComponent, SingleDeptComponent,
        AisleComponent, BrandsComponent,
        ListProductComponent, NewProductComponent,
        SelectComponent, SelectAisleComponent,
        SelectCatComponent, EditProductComponent,
        SingleProductComponent, EditDeptComponent
    ],
    providers: [UploadImageService, AdminService, StoreService]
})

export class AdminModule {}