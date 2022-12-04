import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// Data service and model
import { ProveedorModel } from 'src/app/interfaces/proveedor-model';
import { ProveedorService } from 'src/app/services/proveedor-service';
// Paginator & Alerts Imports
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { MatLegacyPaginator as MatPaginator, LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-proveedores-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.scss'],
})
export class ProveedoresListComponent implements OnInit, AfterViewInit {
  // Data variables
  data: ProveedorModel[] = [];
  displayedColumns: string[] = [
    'RFC',
    'razonSocial',
    'nombreContacto',
    'fechaRegistro',
    'status',
    'acciones',
  ];
  dataSource = new MatTableDataSource<ProveedorModel>(this.data);

  // Paginator variables
  totalItems: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [10, 15, 20];
  totalPages: number = 0;

  // UI Variables
  isLoadingResults: boolean = false;
  pageEvent!: PageEvent;

  constructor(private web: ProveedorService, private router: Router) {
    this.isLoadingResults = true;
    this.web.getAllPaging(this.currentPage, this.pageSize).subscribe((data) => {
      this.data = data.proveedores;
      this.totalItems = data.totalItems;
      this.totalPages = data.totalPages;
      this.currentPage = data.currentPage;
      this.isLoadingResults = false;
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.pageSize = this.pageSizeOptions[0];
  }

  onChangePage(pe: PageEvent) {
    this.isLoadingResults = true;
    this.web.getAllPaging(pe.pageIndex, pe.pageSize).subscribe((data) => {
      this.data = data.proveedores;
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
          .getAllPaging(this.currentPage, this.pageSize)
          .subscribe((data) => {
            this.data = data.proveedores;
            this.totalItems = data.totalItems;
            this.totalPages = data.totalPages;
            this.currentPage = data.currentPage;
            this.isLoadingResults = false;
          });
        Swal.fire(
          'Realizado',
          'El proveedor a sido eliminado correctamente.',
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
    this.router.navigate(['/proveedor/edit/' + id]);
  }

  goToProveedor(id) {
    this.router.navigate(['/proveedor/details/' + id]);
  }
}
