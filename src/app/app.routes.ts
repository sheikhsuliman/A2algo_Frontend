import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { SalesComponent } from './components/sales/sales.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductFormComponent },
  { path: 'products/edit/:id', component: ProductFormComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'purchases', component: PurchasesComponent },
  { path: 'sales', component: SalesComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes),FormsModule],
  exports: [RouterModule]
})


export class AppRoutingModule { }