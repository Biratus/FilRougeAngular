import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './product.service';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { AdminProductsComponent } from './admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { FormsModule } from '@angular/forms';
import { NewUserComponent } from './new-user/new-user.component';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { NewProductComponent } from './new-product/new-product.component';
import {FileUploadModule} from 'primeng/fileupload';
import {AccordionModule} from 'primeng/accordion';
import { UpdateProductComponent } from './update-product/update-product.component';     //accordion and accordion tab
//import {MenuItem} from 'primeng/api';                 //api
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/datatable';
import {MenubarModule} from 'primeng/menubar';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


const appRoutes:Routes =[
  {path:'Product',component:ProductComponent},
  {path:'Products',component:ProductsComponent},
  {path:'AdminProducts',component:AdminProductsComponent},
  {path:'AdminOrders',component:AdminOrdersComponent},
  {path :'Authentification', component: AuthentificationComponent},
  {path :'newUser', component: NewUserComponent},
  {path :'newProduct', component: NewProductComponent}
];

@NgModule({
  declarations: [
    
   
    AppComponent,
    AuthentificationComponent,
    AppComponent,
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
    AngularFontAwesomeModule,
    MenubarModule,
    TableModule,
    DataTableModule,
    AccordionModule,
    HttpClientModule,
    FileUploadModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [ProductService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
