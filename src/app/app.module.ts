import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from './app.component';

// Material Module
import { MaterialModule } from './material/material.module';

// SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Modulos
import { HttpClientModule } from '@angular/common/http';
import { AnalyticsModule } from './pages/analytics/analytics.module';
import { ProductsModule } from './pages/products/products.module';
import { CategoriasModule } from './pages/categorias/categorias.module';
import { ProveedoresModule } from './pages/proveedores/proveedores.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    MaterialModule,
    HttpClientModule,
    AnalyticsModule,
    ProductsModule,
    CategoriasModule,
    ProveedoresModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
