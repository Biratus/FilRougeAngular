import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SelectItem } from 'primeng/api';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { InputTextModule } from 'primeng/inputtext';
import { GrowlModule } from 'primeng/growl';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputSwitchModule } from 'primeng/inputswitch';


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
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PanierComponent } from './panier/panier.component';
import { PanierService } from './panier.service';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';

import { ScrollPanelModule } from 'primeng/scrollpanel';
import { UserOrderComponent } from './user-order/user-order.component';
import { CommandeService } from './commande.service';




const appRoutes: Routes = [
  { path: 'Product', component: ProductComponent },
  { path: 'Products', component: ProductsComponent },
  { path: 'AdminProducts', component: AdminProductsComponent },
  { path: 'AdminOrders', component: AdminOrdersComponent },
  { path: 'authentification', component: AuthentificationComponent },
  { path: 'newUser', component: NewUserComponent },
  { path: 'newProduct', component: NewProductComponent },
  { path: 'panier', component: PanierComponent },
  { path: 'Profile', component: UserProfileComponent },
  { path: 'order', component: UserOrderComponent }

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
    PanierComponent,
    UpdateProductComponent,
    UserProfileComponent,
    ProfileDetailComponent,
    UserOrderComponent

  ],
  imports: [
    InputSwitchModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule,
    GrowlModule,
    InputTextModule,
    ScrollPanelModule,
    MenuModule,
    DialogModule,
    SelectButtonModule,
    BrowserAnimationsModule,
    SelectButtonModule,
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
  providers: [ProductService, UserService, PanierService, CommandeService],
  bootstrap: [AppComponent]
})
export class AppModule {
  static readonly restApi = 'http://localhost:8082/formafond';
}
