import { Component, OnInit } from '@angular/core';
import { ServDataService } from '../serv-data.service';
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
      this.myData.pushNewContact(this.form.value)
      alert("Contacto Agregado")
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }


  get Name() {
    return this.form.get("name");
  }

  get Email() {
    return this.form.get("email");
  }

  get Consulta() {
    return this.form.get("consulta");
  }

  get NameValid() {
    return this.Name?.touched && !this.Name?.valid;
  }

  get EmailValid() {
    return this.Email?.touched && !this.Email?.valid;
  }

  get ConsultaValid() {
    return this.Consulta?.touched && !this.Consulta?.valid;
  }



  constructor(private myData: ServDataService, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({

      name: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      consulta: ['', [Validators.required, Validators.maxLength(1000)]],


    })


  }

  ngOnInit(): void {



  }

}
