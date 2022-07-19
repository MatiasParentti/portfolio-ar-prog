import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginUsuario } from '../model/login-usuario';
import { TokenService } from '../service/token.service';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-card',
  templateUrl: './login-card.component.html',
  styleUrls: ['./login-card.component.css']
})
export class LoginCardComponent implements OnInit {

  form: FormGroup;

  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles: string[] = [];
  errMsj : string= 'User o Pass incorrecto';




  get Password() {
    return this.form.get("password");
  }

  get User() {
    return this.form.get("user");
  }

  get PasswordValid() {
    return this.Password?.touched && !this.Password?.valid;
  }

  get UserValid() {
    return this.User?.touched && !this.User?.valid;
  }


  constructor(
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {

    this.form = this.formBuilder.group({

      password: ['', [Validators.required, Validators.minLength(3)]],
      user: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]

    })

  }

  ngOnInit(): void {

    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }

  }

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.nombreUsuario = this.form.controls['user'].value
      this.password = this.form.controls['password'].value
      this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
      this.authService.login(this.loginUsuario).subscribe(
        data => {
          this.isLogged = true;
          this.tokenService.setToken(data.token);
          this.tokenService.setUserName(data.nombreUsuario);
          this.tokenService.setAuthorities(data.authorities);
          this.roles = data.authorities;

          setTimeout(function () {
            window.location.reload();
          }, 1000);

          this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
            timeOut: 5000, positionClass: 'toast-top-center'
          });

        }, err => {
          this.isLogged = false;
          this.toastr.error(this.errMsj, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      );

    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }
  }



}
