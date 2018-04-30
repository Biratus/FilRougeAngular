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

const appRoutes:Routes =[
  {path:'Product',component:ProductComponent},
  {path:'Products',component:ProductsComponent},
  {path:'AdminProducts',component:AdminProductsComponent},
  {path:'AdminOrders',component:AdminOrdersComponent},
  {path :'Authentification', component: AuthentificationComponent},
  {path :'newUser', component: NewUserComponent}
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

    MenuComponent
  ],
  imports: [
    HttpClientModule,
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
