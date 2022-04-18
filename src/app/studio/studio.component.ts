import { Component, Input, OnInit } from '@angular/core';
import { ServDeleteService } from '../serv-delete.service';
import { studys } from './studys.components';
import { ServDataService } from '../serv-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})

export class StudioComponent implements OnInit {

  @Input() session!: boolean;

  form: FormGroup;

  studyGet: studys[] = [];
  studyEdit: any;

  newStudy = false;
  editExp = false;

  ids: number = 0;
  id: number = 0;



  get Instituto() {
    return this.form.get("instituto");
  }

  get Fecha() {
    return this.form.get("fecha");
  }

  get Programa() {
    return this.form.get("programa");
  }

  get Estado() {
    return this.form.get("estado");
  }

  get InstitutoValid() {
    return this.Instituto?.touched && !this.Instituto?.valid;
  }

  get EstadoValid() {
    return this.Estado?.touched && !this.Estado?.valid;
  }

  get ProgramaValid() {
    return this.Programa?.touched && !this.Programa?.valid;
  }

  get FechaValid() {
    return this.Fecha?.touched && !this.Fecha?.valid;
  }


  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let values = this.form.value
      const add = new studys(this.studyGet.length + 1, values.instituto, values.fecha, values.programa, values.estado)
      this.myData.pushNewStudy(add)
      this.newStudy = false;
      this.editExp = false;
      alert("Nueva Study Agregada")
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }

  onEdit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let values = this.form.value
      const add = new studys(this.studyGet.length + 1, values.instituto, values.fecha, values.programa, values.estado)
      this.myData.actualizarStudy(this.ids, add)
      alert("Studio editado")
      this.newStudy = false;
      this.editExp = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }

  edits(id: number) {
    this.editExp = true;
    this.ids = id
    this.studyEdit = this.myData.editStudy(id)
    this.form.controls['fecha'].patchValue(this.studyEdit.fecha)
    this.form.controls['instituto'].patchValue(this.studyEdit.instituto)
    this.form.controls['programa'].patchValue(this.studyEdit.programa)
    this.form.controls['estado'].patchValue(this.studyEdit.estado)
    this.id = this.studyEdit.id
  }

  cancelar() {
    this.newStudy = false;
    this.editExp = false;
    this.form.reset();
  }

  btnNewStudy() {
    if (this.newStudy == false) {
      this.newStudy = true
    } else {
      this.newStudy = false
    }
  }

  delete(id: number, programa: string) {
    const resp = this.myService.msjAlert('eliminar  ' + programa + '?')
    if (resp) {
      this.myData.deleteStudy(id)
    }
    return false
  }

  constructor(private myService: ServDeleteService, private myData: ServDataService, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({

      instituto: ['', [Validators.required]],
      fecha: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      programa: ['', [Validators.required]],
      estado: ['', [Validators.required]],

    })

  }

  ngOnInit(): void {

    this.myData.getStudio().subscribe(myStudio => {

      this.studyGet = Object.values(myStudio)

      this.myData.setStudio(this.studyGet)


    });

  }

}
