import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from './app.component';

// Interceptors
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Material Module
import { MaterialModule } from './material/material.module';

// SweetAlert2
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Modulos
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './pages/auth/auth.module';
import { AnalyticsModule } from './pages/analytics/analytics.module';
import { ProductsModule } from './pages/products/products.module';
import { CategoriasModule } from './pages/categorias/categorias.module';
import { ProveedoresModule } from './pages/proveedores/proveedores.module';
import { AuthInterceptorService } from './interceptors/auth-interceptor-service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SweetAlert2Module.forRoot(),
    MaterialModule,
    HttpClientModule,
    AuthModule,
    AnalyticsModule,
    ProductsModule,
    CategoriasModule,
    ProveedoresModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
