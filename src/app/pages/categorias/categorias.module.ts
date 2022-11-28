import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Material Module
import { MaterialModule } from 'src/app/material/material.module';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';
import { CategoriaCheckComponent } from './categoria-check/categoria-check.component';

@NgModule({
  declarations: [
    CategoriaFormComponent,
    CategoriaListComponent,
    CategoriaCheckComponent,
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SweetAlert2Module],
})
export class CategoriasModule {}
