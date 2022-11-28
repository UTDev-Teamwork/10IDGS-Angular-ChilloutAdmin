import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Data service and model
import { ProveedorModel } from 'src/app/interfaces/proveedor-model';
import { ProveedorService } from 'src/app/services/proveedor-service';

// Utils
import { ThemePalette } from '@angular/material/core';
import * as uuid from 'uuid';

@Component({
  selector: 'app-proveedores-form',
  templateUrl: './proveedores-form.component.html',
  styleUrls: ['./proveedores-form.component.scss'],
})
export class ProveedoresFormComponent implements OnInit, AfterViewInit {
  constructor(
    private _formBuilder: FormBuilder,
    private web: ProveedorService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewInit(): void {
    if(this.updatingDate){
      setInterval(() => {
        this.formGroup.value.fechaRegistro = new Date().toISOString();
      }, 1000);
    }
  }

  ngOnInit(): void {
    try {
      let d = this.route.snapshot.paramMap.get('d');
      let id = this.route.snapshot.paramMap.get('id');

      this.updatingDate = false;
      this.cleanButton = false;

      if (d === 'details') {
        this.formGroup.disable();
      }

      this.web.get(id).subscribe((res: ProveedorModel) => {
        this.formGroup.patchValue({
          id: res.id,
          rfc: res.rfc,
          razonSocial: res.razonSocial,
          nombreContacto: res.nombreContacto,
          telefonoPrincipal: res.telefonoPrincipal,
          telefonoMovil: res.telefonoMovil,
          email: res.email,
        });
        this.formGroup.value.fechaRegistro = res.fechaRegistro.toString();
        this.formGroup.value.activo = res.activo.toString();
      });

    } catch (e) {
      console.log(e);
    }
  }

  // Page variables
  titulo = 'Dar de alta un proveedor';
  date: Date = new Date();
  cleanButton: boolean = true;
  updatingDate: boolean = true;
  // Slide-Toogle variables
  color: ThemePalette = 'warn';
  disabled = false;
  // Variables del alert
  public swalMensaje: string = 'Procesando petición...';
  public swalTipo: string = 'info';

  formGroup = this._formBuilder.group({
    id: [uuid.v4(), Validators.required],
    rfc: ['', Validators.required],
    razonSocial: ['', Validators.required],
    nombreContacto: ['', Validators.required],
    telefonoPrincipal: ['', Validators.required],
    telefonoMovil: ['', Validators.required],
    email: ['', Validators.required],
    fechaRegistro: [this.date.toISOString(), Validators.required],
    activo: '',
  });

  resetForm(): void {
    this.formGroup.reset();
    this.formGroup.value.id = uuid.v4();
  }

  onSwalDialog(): void {
    if (this.swalTipo === 'success') {
      this.router.navigate(['/proveedores']);
    }
  }

  enviarProveedor(): void {
    if (this.formGroup.valid) {
      this.web.save(this.formGroup.value).subscribe(
        (res) => {
          this.swalMensaje = 'Proveedor creado correctamente';
          this.swalTipo = 'success';
        },
        (err) => {
          this.swalMensaje = 'No se pudo completar la petición';
          this.swalTipo = 'error';
        }
      );
    }
  }
}
