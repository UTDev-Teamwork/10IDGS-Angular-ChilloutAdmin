import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';

// Modules
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// Material Module
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, SweetAlert2Module],
})
export class AuthModule {}
