import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ProductListComponent } from './product-list/product-list.component';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material Module
import { MaterialModule } from 'src/app/material/material.module';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductCheckComponent } from './product-check/product-check.component';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent, ProductCheckComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [ProductListComponent],
})
export class ProductsModule {}
