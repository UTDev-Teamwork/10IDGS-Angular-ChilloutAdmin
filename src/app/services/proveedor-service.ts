import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProveedorService {
  apiURL: string = 'http://localhost:7373/api/proveedor';

  constructor(private http: HttpClient) {}

  // Save a Proveedor (Create or Update)
  save(data): Observable<any> {
    return this.http.post(`${this.apiURL}`, data);
  }

  // Get all Proveedores without pagination
  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/all`);
  }

  // Get all Proveedores with pagination
  getAllPaging(page, size): Observable<any> {
    return this.http.get<any>(`${this.apiURL}?page=${page}&size=${size}`);
  }

  // Get Proveedor by id
  get(id): Observable<any> {
    return this.http.get(`${this.apiURL}/${id}`);
  }

  // Get Proveedor by fecha de registro (REQUIRED FORMATT yyyy-MM-dd'T'HH:mm:ss.SSSX)
  getByFechaRegistro(fechaRegistro): Observable<any> {
    return this.http.get(`${this.apiURL}/findFecha/${fechaRegistro}`);
  }

  // Get Proveedor by fecha de registro between two dates (REQUIRED FORMATT yyyy-MM-dd'T'HH:mm:ss.SSSX)
  getByFechaRegistroBetween(fechaRegistro1, fechaRegistro2): Observable<any> {
    return this.http.get(
      `${this.apiURL}/findFecha/${fechaRegistro1}/${fechaRegistro2}`
    );
  }

  // Get Proveedor by fecha de registro before a date (REQUIRED FORMATT yyyy-MM-dd'T'HH:mm:ss.SSSX)
  getByFechaRegistroBefore(fechaRegistro): Observable<any> {
    return this.http.get(`${this.apiURL}/findBefore/${fechaRegistro}`);
  }

  // Get Proveedor by fecha de registro after a date (REQUIRED FORMATT yyyy-MM-dd'T'HH:mm:ss.SSSX)
  getByFechaRegistroAfter(fechaRegistro): Observable<any> {
    return this.http.get(`${this.apiURL}/findAfter/${fechaRegistro}`);
  }

  // Get Proveedor by email
  getByEmail(email): Observable<any> {
    return this.http.get(`${this.apiURL}/findEmail/${email}`);
  }

  // Get Proveedor by nombre
  getByNombre(nombre): Observable<any> {
    return this.http.get(`${this.apiURL}/findNombre/${nombre}`);
  }

  // Get Proveedor by Razon social
  getByRazonSocial(razonSocial): Observable<any> {
    return this.http.get(`${this.apiURL}/findRazonSocial/${razonSocial}`);
  }

  // Get Proveedor by RFC
  getByRFC(rfc): Observable<any> {
    return this.http.get(`${this.apiURL}/findRFC/${rfc}`);
  }

  // Get Proveedor by activo
  getByActivo(activo): Observable<any> {
    return this.http.get(`${this.apiURL}/findActivo/${activo}`);
  }

  // Inactivate Proveedor by id
  inactivate(id): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  // Delete Proveedor by id
  delete(id): Observable<any> {
    return this.http.delete(`${this.apiURL}/danger/${id}`);
  }

}
