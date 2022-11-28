import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
// Data service and model
import { ArticuloModel } from 'src/app/interfaces/articulo-model';
import { ArticuloService } from 'src/app/services/articulo-service';
// Paginator Imports
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(private web: ArticuloService) {
    this.isLoadingResults = true;
    this.web.getAll(this.currentPage, this.pageSize).subscribe((data) => {
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

}
