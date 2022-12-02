import { HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  apiURL: string = 'http://localhost:7373/api/user';
  private http: HttpClient;

  constructor(private handler: HttpBackend) {
    this.http = new HttpClient(handler);
  }

  getAll(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}`);
    //return this.http.get<ArticuloModel[]>(this.apiURL);
  }

  get(id): Observable<any> {
    return this.http.get(`${this.apiURL}/id/${id}`);
  }

  getByNombre(nombre): Observable<any> {
    return this.http.get(`${this.apiURL}/find?usrname=${nombre}`);
  }

  save(data): Observable<any> {
    return this.http.post(`${this.apiURL}`, data);
  }

  login(data): Observable<any> {
    return this.http.post(`${this.apiURL}/login`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.apiURL}/danger/${id}`);
  }

  inactive(id): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  isLogIn: Subject<boolean> = new Subject<boolean>();

  setLogInAuth(isAuth: boolean): void {
    this.isLogIn.next(isAuth);
  }

  loggedName: Subject<string> = new Subject<string>();

  setLoggedName(name: string): void {
    this.loggedName.next(name);
  }

  userPermissions: Subject<string> = new Subject<string>();

  setUserPermissions(permissions: string): void {
    this.userPermissions.next(permissions);
  }
}
