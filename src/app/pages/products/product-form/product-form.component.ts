import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
  ],
})
export class ProductFormComponent implements OnInit {

  firstFormGroup = this._formBuilder.group({
    codBarras: ['', Validators.required],
    categoriaID: ['', Validators.required],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    proveedorID: ['', Validators.required],
  });

  secondFormGroup = this._formBuilder.group({
    stock: ['', Validators.required],
    precioCompra: ['', Validators.required],
    utilidad: ['', Validators.required],
    precioVenta: ['', Validators.required],
    iva: ['', Validators.required],
    promoID: ['', Validators.required],
  });
  
  thirdFormGroup = this._formBuilder.group({
    disponible: ['', Validators.required],
    visible: ['', Validators.required],
    lastUpdateInventory: ['', Validators.required],
    img: ['', Validators.required],
  });
  
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  enviarArticulo(): void { alert("wenas") }
}
