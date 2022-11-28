import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { articuloPagination } from '../interfaces/articulo-pagination-model';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  apiURL: string = 'http://localhost:7373/api/articulo';

  constructor(private http: HttpClient) {}

  getAll(page: number, size: number): Observable<articuloPagination> {
    return this.http.get<articuloPagination>(
      `${this.apiURL}?page=${page}&size=${size}`
    );
    //return this.http.get<ArticuloModel[]>(this.apiURL);
  }
}
