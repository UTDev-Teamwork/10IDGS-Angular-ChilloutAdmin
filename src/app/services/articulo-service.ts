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

  // Save a Articulo (Create or Update)
  save(data): Observable<any> {
    return this.http.post(`${this.apiURL}`, data);
  }

  // Get all Articulos without pagination
  getAllNoPaging(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/all`);
  }

  // Get all Articulos with pagination
  getAll(page: number, size: number): Observable<articuloPagination> {
    return this.http.get<articuloPagination>(
      `${this.apiURL}/allPaging?page=${page}&size=${size}`
    );
    //return this.http.get<ArticuloModel[]>(this.apiURL);
  }

  // Get Articulo by id
  get(id): Observable<any> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  // Suspend Articulo by id
  suspend(id): Observable<any> {
    return this.http.delete(`${this.apiURL}/suspend/${id}`);
  }

  // Cancel Articulo by id
  cancel(id): Observable<any> {
    return this.http.delete(`${this.apiURL}/cancel/${id}`);
  }

  // Delete Articulo by id
  delete(id): Observable<any> {
    return this.http.delete(`${this.apiURL}/danger/${id}`);
  }

}
