import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ActivatedRoute, Router } from '@angular/router';

// Data service and model for Articulos
import { CreateArticuloModel } from 'src/app/interfaces/create-articulo-model';
import { ArticuloModel } from 'src/app/interfaces/articulo-model';
import { ArticuloService } from 'src/app/services/articulo-service';
// Data service and model for Proveedores
import { ProveedorModel } from 'src/app/interfaces/proveedor-model';
import { ProveedorService } from 'src/app/services/proveedor-service';
// Data service and model for Categorias
import { CategoriaModel } from 'src/app/interfaces/categoria-model';
import { CategoriaService } from 'src/app/services/categoria-service';

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
export class ProductFormComponent implements OnInit, AfterViewInit {
  categoriasData: CategoriaModel[] = [];
  proveedoresData: ProveedorModel[] = [];
  promocionesData: ProveedorModel[] = [];

  cateogiriasControl = new FormControl(
    this.categoriasData,
    Validators.required
  );
  proveedoresControl = new FormControl(
    this.proveedoresData,
    Validators.required
  );
  promocionesControl = new FormControl(this.promocionesData);

  public selectedFile;
  imgURL: any;
  selectedCategoria;
  selectedProveedor;
  cleanButton = true;
  public swalMensaje: string = 'Procesando petición...';
  public swalTipo: string = 'info';
  public swalImg: string = 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif';

  firstFormGroup = this._formBuilder.group({
    codBarras: ['', Validators.required],
    categoriaID: this.cateogiriasControl,
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    proveedorID: this.proveedoresControl,
  });

  secondFormGroup = this._formBuilder.group({
    stock: ['', Validators.required],
    precioCompra: ['', Validators.required],
    utilidad: ['', Validators.required],
    precioVenta: ['', Validators.required],
    iva: ['', Validators.required],
    promoID: this.promocionesControl,
  });

  thirdFormGroup = this._formBuilder.group({
    disponible: [true, Validators.required],
    visible: [true, Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private webCategoria: CategoriaService,
    private webProveedor: ProveedorService,
    private web: ArticuloService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.webCategoria.getAll().subscribe((data) => {
      this.categoriasData = data;
    });
    this.webProveedor.getAll().subscribe((data) => {
      this.proveedoresData = data;
    });
  }

  ngOnInit(): void {
    try {
      let d = this.route.snapshot.paramMap.get('d');
      let id = this.route.snapshot.paramMap.get('id');

      this.cleanButton = false;

      if (d === 'details') {
        this.firstFormGroup.disable();
        this.secondFormGroup.disable();
        this.thirdFormGroup.disable();
      }

      if(id !== null) {

      this.web.get(id).subscribe((res: ArticuloModel) => {
        this.firstFormGroup.patchValue({
          codBarras: res.codBarras,
          categoriaID: this.cateogiriasControl[0],
          nombre: res.nombre,
          descripcion: res.descripcion,
          proveedorID: this.proveedoresControl[0],
        });
        this.secondFormGroup.patchValue({
          stock: res.stock.toString(),
          precioCompra: res.precioCompra.toString(),
          utilidad: res.utilidad.toString(),
          precioVenta: res.precioVenta.toString(),
          iva: res.iva.toString(),
          promoID: this.promocionesControl[0],
        });
        this.thirdFormGroup.patchValue({
          disponible: res.disponible,
          visible: res.visible,
        });
      });

    }

    } catch (e) {
      console.log(e);
    }
  }

  enviarArticulo(): void {
    if (
      this.firstFormGroup.valid &&
      this.secondFormGroup.valid &&
      this.thirdFormGroup.valid
    ) {
      console.log('Formulario válido');

      let data: CreateArticuloModel = {
        codBarras: this.firstFormGroup.value.codBarras,
        categoriaID: this.selectedCategoria,
        nombre: this.firstFormGroup.value.nombre,
        descripcion: this.firstFormGroup.value.descripcion,
        stock: Number(this.secondFormGroup.value.stock),
        precioCompra: Number(this.secondFormGroup.value.precioCompra),
        utilidad: Number(this.secondFormGroup.value.utilidad),
        precioVenta: Number(this.secondFormGroup.value.precioVenta),
        iva: Number(this.secondFormGroup.value.iva),
        disponible: this.thirdFormGroup.value.disponible,
        visible: this.thirdFormGroup.value.visible,
        img: this.imgURL != null ? true : false,
        proveedorID: this.selectedProveedor,
        promoID: null,
        name: this.imgURL != null ? this.firstFormGroup.value.nombre.toLowerCase().trim(): null,
        type: this.imgURL != null ? this.selectedFile.type : null,
        imgBytes: this.imgURL != null ? this.imgURL.split(',')[1] : null,
      };

      console.log(data);

      this.web.save(data).subscribe(
        (res) => {
          this.swalMensaje = 'Articulo creado correctamente';
          this.swalTipo = 'success';
          this.swalImg = null;
          console.log(`Respuesta buena: ${res}`);
        },
        (err) => {
          this.swalMensaje = 'No se pudo completar la petición';
          this.swalTipo = 'error';
          this.swalImg = null;
          console.log(`Respuesta mala: ${err.mess}`);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }

  onFileChanged(event): void {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Mostrar la imagen
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  onSwalDialog(): void {
    if (this.swalTipo === 'success') {
      this.router.navigate(['/products']);
    }
  }
}
