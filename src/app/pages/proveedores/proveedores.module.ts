import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Material Module
import { MaterialModule } from 'src/app/material/material.module';
import { ProveedoresListComponent } from './proveedores-list/proveedores-list.component';
import { ProveedoresFormComponent } from './proveedores-form/proveedores-form.component';
import { ProveedoresCheckComponent } from './proveedores-check/proveedores-check.component';

@NgModule({
  declarations: [
    ProveedoresListComponent,
    ProveedoresFormComponent,
    ProveedoresCheckComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, SweetAlert2Module],
})
export class ProveedoresModule { }
