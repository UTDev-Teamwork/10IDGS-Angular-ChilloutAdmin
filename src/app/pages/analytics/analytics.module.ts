import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ToptenarticulosComponent } from './product-sales/toptenarticulos.component';

// Material Module
import { MaterialModule } from 'src/app/material/material.module';

// Modulos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ToptenarticulosComponent],
  imports: [ CommonModule, MaterialModule, FormsModule, ReactiveFormsModule ],
  exports: [ToptenarticulosComponent ],
})
export class AnalyticsModule {}