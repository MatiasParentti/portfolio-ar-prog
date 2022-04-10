import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      alert("Todo salio bien ¡Enviar formuario!")
      console.log(this.form.value)
      console.log(this.form.controls['user'].value)
      console.log(this.form.controls['password'].value)
      this.router.navigate([''])

    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }

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

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.form = this.formBuilder.group({

      password: ['', [Validators.required, Validators.minLength(8)]],
      user: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]]

    })

  }

  ngOnInit(): void {
  }

}
