import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ProductsAdminPageComponent } from './pages/products-admin-page/products-admin-page.component';
import { AdminProductsListComponent } from './components/admin-products-list/admin-products-list.component';
import { AdminProductsFormComponent } from './components/admin-products-form/admin-products-form.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: 'products/:id', component: SingleProductComponent },
  { path: 'admin/products-panel', component: ProductsAdminPageComponent },
   // For Add product (no id)
  { path: 'admin/products-form', component: AdminProductsFormComponent },
  // For Edit product (with id)
  { path: 'admin/products-form/:id', component: AdminProductsFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
