import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'primeng/fileupload';
import { AccordionModule } from 'primeng/accordion';
import { TableModule } from 'primeng/table';
import { DataTableModule } from 'primeng/datatable';
import { CheckboxModule } from 'primeng/checkbox';
import { MenubarModule } from 'primeng/menubar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { DataGridModule } from 'primeng/datagrid';
import { PanelModule } from 'primeng/panel';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MenuModule} from 'primeng/menu';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './product.service';
import { UpdateProductComponent } from './update-product/update-product.component';
import { MenuComponent } from './menu/menu.component';
import { NewProductComponent } from './new-product/new-product.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { UserService } from './user.service';



const appRoutes: Routes = [
  { path: 'Product', component: ProductComponent },
  { path: 'Products', component: ProductsComponent },
  { path: 'AdminProducts', component: AdminProductsComponent },
  { path: 'AdminOrders', component: AdminOrdersComponent },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: 'newProduct', component: NewProductComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthentificationComponent,
    ProductComponent,
    ProductsComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    NewUserComponent,
    MenuComponent,
    NewProductComponent,
    UpdateProductComponent
  ],
  imports: [
    MenuModule,
    PanelModule,
    DataGridModule,
    AngularFontAwesomeModule,
    MenubarModule,
    CheckboxModule,
    TableModule,
    DataTableModule,
    AccordionModule,
    HttpClientModule,
    FileUploadModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [ProductService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
