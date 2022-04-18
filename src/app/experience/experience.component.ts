import { Component, Input, OnInit } from '@angular/core';
import { ServDeleteService } from '../serv-delete.service';
import { experiences } from './experiences.component';
import { ServDataService } from '../serv-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';



@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})


export class ExperienceComponent implements OnInit {

  @Input() session!: boolean;

  form: FormGroup;

  experiencesGet: experiences[] = [];
  experienceEdit: any;

  ids: number = 0;
  id: number = 0

  newExp = false;
  editExp = false;


  get Cargo() {
    return this.form.get("cargo");
  }

  get Fecha() {
    return this.form.get("fecha");
  }

  get Empresa() {
    return this.form.get("empresa");
  }

  get Tareas() {
    return this.form.get("tareas");
  }

  get CargoValid() {
    return this.Cargo?.touched && !this.Cargo?.valid;
  }

  get EmpresaValid() {
    return this.Empresa?.touched && !this.Empresa?.valid;
  }

  get TareasValid() {
    return this.Tareas?.touched && !this.Tareas?.valid;
  }

  get FechaValid() {
    return this.Fecha?.touched && !this.Fecha?.valid;
  }

  btnNewExp() {
    if (this.newExp == false) {
      this.newExp = true
    } else {
      this.newExp = false
    }
  }

  cancelar() {
    this.editExp = false;
    this.newExp = false;
    this.form.reset();
  }

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let values = this.form.value
      const add = new experiences(this.experiencesGet.length + 1, values.empresa, values.fecha, values.tareas, values.cargo)
      this.myData.pushNewExp(add)
      this.newExp = false;
      this.editExp = false;
      alert("Nueva Experiencia Agregada")
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
      const add = new experiences(this.experiencesGet.length + 1, values.empresa, values.fecha, values.tareas, values.cargo)
      this.myData.actualizarExp(this.ids, add)
      alert("Experiencia editada")
      this.newExp = false;
      this.editExp = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }



  delete(id: number, cargo: string, empresa: string) {
    const resp = this.myService.msjAlert('eliminar  ' + cargo + ' ' + empresa + '?')
    if (resp) {
      this.myData.deleteExp(id)
    }
    return false
  }

  edits(id: number) {
    this.editExp = true;
    this.ids = id;
    this.experienceEdit = this.myData.editExp(id)
    this.form.controls['cargo'].patchValue(this.experienceEdit.cargo)
    this.form.controls['fecha'].patchValue(this.experienceEdit.fecha)
    this.form.controls['tareas'].patchValue(this.experienceEdit.tareas)
    this.form.controls['empresa'].patchValue(this.experienceEdit.empresa)
    this.id = this.experienceEdit.id
  }

  constructor(private myService: ServDeleteService, private myData: ServDataService, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({

      cargo: ['', [Validators.required]],
      fecha: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      tareas: ['', [Validators.required]],
      empresa: ['', [Validators.required]],

    })

  }

  ngOnInit(): void {

    this.myData.getExperiences().subscribe(myExp => {

      this.experiencesGet = Object.values(myExp)

      this.myData.setExperience(this.experiencesGet)

    });

  }

}
