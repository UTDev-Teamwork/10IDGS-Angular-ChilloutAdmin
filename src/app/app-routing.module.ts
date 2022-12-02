import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './pages/auth/login/login.component';
import { ToptenarticulosComponent } from './pages/analytics/product-sales/toptenarticulos.component';
import { ProductListComponent } from './pages/products/product-list/product-list.component';
import { ProductFormComponent } from './pages/products/product-form/product-form.component';
import { CategoriaListComponent } from './pages/categorias/categoria-list/categoria-list.component';
import { CategoriaFormComponent } from './pages/categorias/categoria-form/categoria-form.component';
import { ProveedoresListComponent } from './pages/proveedores/proveedores-list/proveedores-list.component';
import { ProveedoresFormComponent } from './pages/proveedores/proveedores-form/proveedores-form.component';
// Guards
import { jwtGuard } from './guards/jwtGuard';

const routes: Routes = [
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: 'start', component: LoginComponent, canActivate: [jwtGuard] },
  { path: 'toptenarticles', component: ToptenarticulosComponent, canActivate: [jwtGuard] },
  { path: 'products', component: ProductListComponent, canActivate: [jwtGuard] },
  { path: 'product', component: ProductFormComponent, canActivate: [jwtGuard], data: { _ROL: 'ADMIN' } },
  { path: 'product/:id', component: ProductFormComponent, canActivate: [jwtGuard], data: { _ROL: 'ADMIN' } },
  { path: 'product/:d/:id', component: ProductFormComponent, canActivate: [jwtGuard], data: { _ROL: 'ADMIN' } },
  { path: 'categorias', component: CategoriaListComponent, canActivate: [jwtGuard] },
  { path: 'categoria', component: CategoriaFormComponent, canActivate: [jwtGuard], data: { _ROL: 'ADMIN' } },
  { path: 'categoria/:id', component: CategoriaFormComponent, canActivate: [jwtGuard], data: { _ROL: 'ADMIN' } },
  { path: 'proveedores', component: ProveedoresListComponent, canActivate: [jwtGuard] },
  { path: 'proveedor', component: ProveedoresFormComponent, canActivate: [jwtGuard], data: { _ROL: 'ADMIN' } },
  { path: 'proveedor/:id', component: ProveedoresFormComponent, canActivate: [jwtGuard], data: { _ROL: 'ADMIN' } },
  { path: 'proveedor/:d/:id', component: ProveedoresFormComponent, canActivate: [jwtGuard] },
  { path: '**', redirectTo: '/start' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
