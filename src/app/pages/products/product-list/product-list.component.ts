import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
// Data service and model
import { ArticuloModel } from 'src/app/interfaces/articulo-model';
import { ArticuloService } from 'src/app/services/articulo-service';
// Paginator Imports
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {

  data: ArticuloModel[] = [];
  displayedColumns: string[] = [
    'codBarras',
    'idClasif',
    'desCorta',
    'precio',
    'stock',
    'artDisp',
    'acciones',
  ];
  dataSource = new MatTableDataSource<ArticuloModel>(this.data);

  // Paginator variables
  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 15, 20];
  totalPages: number = 0;

  isLoadingResults: boolean = false;
  pageEvent!: PageEvent;

  constructor(private web: ArticuloService, private router: Router) {
    this.isLoadingResults = true;
    this.web.getAll(this.currentPage, this.pageSize).subscribe((data) => {
      console.log(data);
      this.data = data.articulos;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      this.isLoadingResults = false;
    });
  }

  ngOnInit(): void {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = this.pageSizeOptions[0];

    console.log(this.data);
  }

  onChangePage(pe:PageEvent) {
    this.isLoadingResults = true;
    this.web.getAll(pe.pageIndex, pe.pageSize).subscribe((data) => {
      this.data = data.articulos;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      this.isLoadingResults = false;
    });
  } 

  delete(id) {
    this.isLoadingResults = true;
    this.web.delete(id).subscribe(
      (res) => {
        this.isLoadingResults = false;
        this.web
          .getAll(this.currentPage, this.pageSize)
          .subscribe((data) => {
            this.data = data.articulos;
            this.totalItems = data.totalItems;
            this.totalPages = data.totalPages;
            this.currentPage = data.currentPage;
            this.isLoadingResults = false;
          });
        Swal.fire(
          'Realizado',
          'El articulo a sido eliminado correctamente.',
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

  navigateTo(id) {
    this.router.navigate(['/product/edit/' + id]);
  }

  goToProveedor(id) {
    this.router.navigate(['/product/details/' + id]);
  }

}
