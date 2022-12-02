import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Data service and model for Users
import { UserModel } from 'src/app/interfaces/usuario-model';
import { UserService } from 'src/app/services/usuario-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private web: UserService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void { }

  loading = false;
  isLogging = true;

  swalMensaje = '';
  swalTipo = 'info';

  onError = false;

  loginForm = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  signinForm = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    password2: ['', Validators.required],
  });


  enviar(){
    this.loading = true;
    if(this.isLogging){
      let data = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
      };
      this.web.login(data).subscribe(
        (res) => {
          this.loading = false;
          this.onError = false;
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('aut', 'true');
          this.web.setLogInAuth(true);
          this.web.setLoggedName(JSON.parse(atob(res.token.split('.')[1])).sub);
          this.web.setUserPermissions(JSON.parse(atob(res.token.split('.')[1])).authorities[0]);
          this.router.navigate(['/toptenarticles']);
        },
        (err) => {
          console.log(err);
          this.onError = true;
          this.loading = false;
        },
      );
    }else{
      console.log(this.signinForm.value);
      let data: UserModel = {
        id: null,
        username: this.signinForm.value.username,
        password: this.signinForm.value.password,
        active: true,
        firstName: '',
        lastName: '',
        role: 'USER'
      }

      this.web.save(data).subscribe(
        (res) => {
          this.swalMensaje = 'Registro correcto, por favor inicia sesión';
          this.swalTipo = 'success';
          this.loading = false;
          this.isLogging = true;
        },
        (err) => {
          this.swalMensaje = 'No se pudo completar la petición';
          this.swalTipo = 'error';
          this.loading = false;
          this.isLogging = true;
        }
      );
    }
  }

  changeForm(){
    this.isLogging = !this.isLogging;
  }
}
