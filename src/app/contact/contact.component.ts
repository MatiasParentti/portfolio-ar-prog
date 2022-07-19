import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {


  form: FormGroup;

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      
      
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }


  

  get Email() {
    return this.form.get("email");
  }

  get Consulta() {
    return this.form.get("consulta");
  }

  get EmailValid() {
    return this.Email?.touched && !this.Email?.valid;
  }

  get ConsultaValid() {
    return this.Consulta?.touched && !this.Consulta?.valid;
  }



  constructor( private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({

      
      email: ['', [Validators.required, Validators.email]],
      consulta: ['', [Validators.required, Validators.maxLength(10000)]],


    })


  }

  ngOnInit(): void {



  }

}
