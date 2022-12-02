import { Injectable } from '@angular/core';

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/usuario-service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private router: Router, private web: UserService,) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt');
    let request = req;
    
    if (token) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Token ${token}`),
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401 || err.status === 403) {
          localStorage.removeItem('aut');
          localStorage.removeItem('jwt');
          localStorage.removeItem('auth');
          this.web.setLogInAuth(false);
          this.router.navigate(['/start']);
        }
        throw new Error(err.message);
      })
    );
  }
}
