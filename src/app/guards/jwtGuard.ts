import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  RoutesRecognized,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, pairwise } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class jwtGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    let _ROL = route.data._ROL;

    if (localStorage.getItem('jwt')) {
      localStorage.setItem(
        'auth',
        atob(localStorage.getItem('jwt').split('.')[1])
      );

      if (state.url == '/start') {
        this.router.navigate(['/products']);
      }

      if (_ROL != null) {
        if (_ROL == JSON.parse(localStorage.getItem('auth')).authorities[0]){
          return true;
        }else{
          return false;
        }
      }

      return true;
    }

    if (state.url == '/start') {
      return true;
    }

    this.router.navigate(['/start']);
    return false;
  }
}
