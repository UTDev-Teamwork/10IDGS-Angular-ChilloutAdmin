import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Data service and model
import { CategoriaModel } from 'src/app/interfaces/categoria-model';
import { CategoriaService } from 'src/app/services/categoria-service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss'],
})
export class CategoriaFormComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private web: CategoriaService
  ) {}

  categoriaForm = this._formBuilder.group({
    nombre: ['', Validators.required],
  });

  public selectedFile;
  imgURL: any;
  public swalMensaje: string = 'Procesando petición...';
  public swalTipo: string = 'info';

  ngOnInit(): void {
    try {
      let id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.web.get(id).subscribe((res: CategoriaModel) => {
          this.categoriaForm.patchValue(res);
          this.imgURL = 'data:image/jpeg;base64,' + res.img;
        });
      }
    } catch (e) {}
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

  enviar(): void {
    const uploadData = new FormData();
    uploadData.append(
      'categoria',
      this.selectedFile,
      this.categoriaForm.value.nombre
    );

    this.web.save(uploadData).subscribe(
      (res) => {
        this.swalMensaje = 'Categoría creada correctamente';
        this.swalTipo = 'success';
      },
      (err) => {
        this.swalMensaje = 'No se pudo completar la petición';
        this.swalTipo = 'error';
      }
    );
  }

  onSwalDialog(): void {
    if (this.swalTipo === 'success') {
      this.router.navigate(['/categorias']);
    } else {
      this.categoriaForm.reset();
      this.imgURL = '';
    }
  }
}
