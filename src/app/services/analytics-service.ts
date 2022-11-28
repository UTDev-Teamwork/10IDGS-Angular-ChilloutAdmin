import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticuloCantidadModel } from '../interfaces/articuloCantidad-model';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private apiURL: string = 'http://localhost:7373/api/venta';

  constructor(private http: HttpClient) { }

  getTop10All(): Observable<ArticuloCantidadModel[]> {
    return this.http.get<ArticuloCantidadModel[]>(`${this.apiURL}/toptensales`);
  }
}