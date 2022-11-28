import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  apiURL: string = 'http://localhost:7373/api/categoria';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}`);
    //return this.http.get<ArticuloModel[]>(this.apiURL);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.apiURL}/id/${id}`);
  }

  getByNombre(nombre): Observable<any> {
    return this.http.get(`${this.apiURL}/${nombre}`);
  }

  save(data): Observable<any> {
    return this.http.post(`${this.apiURL}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.apiURL}/danger/${id}`);
  }

}
