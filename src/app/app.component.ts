import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  style,
  state,
  animate,
  transition,
  trigger,
} from '@angular/animations';
import { Location } from '@angular/common';
import { UserService } from './services/usuario-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ opacity: 0 }),
        animate(200, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(200, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit{
  constructor(
    private _location: Location,
    private readonly usuarioService: UserService,
    private router: Router
  ) {
    this.usuarioService.isLogIn.subscribe((result) => {
      this.loggedStyle = result;
    });
    this.usuarioService.loggedName.subscribe((result) => {
      this.username = result;
    });
    this.usuarioService.userPermissions.subscribe((result) => {
      this.authPermiso = result=='ADMIN'?true:false;
    });
  }
  ngOnInit(): void {
    if(localStorage.getItem('aut')){
      this.loggedStyle = true;
      this.username = JSON.parse(localStorage.getItem('auth')).sub;
    }else{
      this.loggedStyle = false;
    }
  }

  title = 'ChillOut-Admin';
  username = 'Admin';

  isExpanded = false;
  isOpen = false;
  panelOpenState = false;
  disabled = false;
  element: HTMLElement;

  loggedStyle: boolean;
  authPermiso: boolean;

  //Modulos de la barra de navegacion
  analyticsModule: boolean = false;
  productsModule: boolean = false;
  categoriasModule: boolean = false;
  proveedoresModule: boolean = false;

  toggleActive(event: any) {
    event.preventDefault();
    if (this.element !== undefined) {
      this.element.style.backgroundColor = 'transparent';
    }
    var target = event.currentTarget;
    target.style.backgroundColor = 'rgba(0,0,0,0.05)';
    this.element = target;

    this.analyticsModule = false;
    this.productsModule = false;
    this.categoriasModule = false;
    this.proveedoresModule = false;

    if (target.id == 'analytics') this.analyticsModule = true;
    if (target.id == 'products') this.productsModule = true;
    if (target.id == 'categorias') this.categoriasModule = true;
    if (target.id == 'proveedores') this.proveedoresModule = true;
  }

  backClicked() {
    this._location.back();
  }

  logout() {
    localStorage.removeItem('aut');
    localStorage.removeItem('jwt');
    localStorage.removeItem('auth');
    this.usuarioService.setLogInAuth(false);
    this.loggedStyle = false;
    this.router.navigate(['/start']);
  }
}
