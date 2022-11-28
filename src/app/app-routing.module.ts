import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { ToptenarticulosComponent } from './pages/analytics/product-sales/toptenarticulos.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { CategoriaListComponent } from './pages/categorias/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { ProveedoresListComponent } from './pages/proveedores/proveedores-list/proveedores-list.component';
import { ProveedoresFormComponent } from './pages/proveedores/proveedores-form/proveedores-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/toptenarticles', pathMatch: 'full' },
  { path: 'toptenarticles', component: ToptenarticulosComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product', component: ProductFormComponent },
  { path: 'categorias', component: CategoriaListComponent },
  { path: 'categoria', component: CategoriaFormComponent },
  { path: 'categoria/:id', component: CategoriaFormComponent },
  { path: 'proveedores', component: ProveedoresListComponent },
  { path: 'proveedor', component: ProveedoresFormComponent},
  { path: 'proveedor/:id', component: ProveedoresFormComponent},
  { path: 'proveedor/:d/:id', component: ProveedoresFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
