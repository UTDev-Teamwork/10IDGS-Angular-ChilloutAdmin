import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ProductListComponent } from './product-list/product-list.component';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Material Module
import { MaterialModule } from 'src/app/material/material.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductCheckComponent } from './product-check/product-check.component';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent, ProductCheckComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SweetAlert2Module],
  exports: [ProductListComponent],
})
export class ProductsModule {}
