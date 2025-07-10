import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ProductsAdminPageComponent } from './pages/products-admin-page/products-admin-page.component';
import { AdminProductsListComponent } from './components/admin-products-list/admin-products-list.component';
import { AdminProductsFormComponent } from './components/admin-products-form/admin-products-form.component';
import { HeaderComponent } from './components/header/header.component';
import { HomePageComponent } from './pages/home-page/home-page.component';



@NgModule({
  declarations: [
    AppComponent,
    SingleProductComponent,
    AdminProductsListComponent,
    ProductsAdminPageComponent,
    AdminProductsFormComponent,
    HeaderComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule,
    AppRoutingModule,
  ],
  providers: [ ProductService ],
  bootstrap: [AppComponent]
})
export class AppModule { }