import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Router } from '@angular/router';

// Data service and model
import { CategoriaModel } from 'src/app/interfaces/categoria-model';
import { CategoriaService } from 'src/app/services/categoria-service';
// Paginator Imports
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CategoriaListComponent implements OnInit, AfterViewInit {
  data: CategoriaModel[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'img', 'acciones'];
  dataSource = new MatTableDataSource<CategoriaModel>(this.data);

  isLoadingResults: boolean = false;

  constructor(private web: CategoriaService, private router: Router,) {
    this.isLoadingResults = true;
    this.web.getAll().subscribe((data) => {
      this.data = data;
      this.isLoadingResults = false;
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  delete(id) {
    this.isLoadingResults = true;
    this.web.delete(id).subscribe(
      (res) => {
        this.isLoadingResults = false;
        this.web.getAll().subscribe((data) => {
          this.data = data;
          this.isLoadingResults = false;
        });
        Swal.fire(
          'Realizado',
          'La categoría a sido eliminada correctamente.',
          'success'
        );
      },
      (err) => {
        console.log(err);
        this.isLoadingResults = false;
        Swal.fire('Error', 'No se pudo completar la petición.', 'error');
      }
    );
  }

  navigateTo(id){
    this.router.navigate(['/categoria/'+id]);
  }
}
