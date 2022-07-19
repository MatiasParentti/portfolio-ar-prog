import { Component, Input, OnInit } from '@angular/core';
import { ServDeleteService } from '../serv-delete.service';
import { Experience } from '../model/Experience.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExperienceService } from '../service/experience.service';
import { TokenService } from '../service/token.service';


@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})


export class ExperienceComponent implements OnInit {

  @Input() session!: boolean;
  @Input() isAdmin!: boolean;

  form: FormGroup;

  getExperience: Experience[] = [];
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

  constructor(private tokenService: TokenService,private myService: ServDeleteService, private myExperience: ExperienceService, private formBuilder: FormBuilder, private toastr: ToastrService,) {

    this.form = this.formBuilder.group({

      cargo: ['', [Validators.required]],
      fecha: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      tareas: ['', [Validators.required]],
      empresa: ['', [Validators.required]],

    })

  }

  ngOnInit(): void {
   
    this.cargarExperiences();

  }

  cargarExperiences(): void {
    this.myExperience.lista().subscribe(
      data => {
        this.getExperience = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let values = this.form.value
      const add = new Experience(this.getExperience.length + 1, values.empresa, values.fecha, values.tareas, values.cargo)
      

      this.myExperience.save(add).subscribe(
        data => {
          this.toastr.success('Experiencia creada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarExperiences();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        }
      );
      this.newExp = false;
      this.editExp = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }

  delete(id: number, cargo: string, empresa: string) {
    const resp = this.myService.msjAlert('Eliminar  '+ cargo + ' ' + empresa + '?')
    if (resp) {
      this.myExperience.delete(id).subscribe(
        data => {
          this.toastr.success('Experiencia eliminada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarExperiences();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
        }
      );
    }
    return false
  }

  onEdit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let values = this.form.value
      const add = new Experience(this.ids, values.empresa, values.fecha, values.tareas, values.cargo)
      
      this.myExperience.update(this.ids, add).subscribe(
        data => {
          this.toastr.success('Experiencia actualizada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarExperiences();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.cargarExperiences();
        }
      );
      this.newExp = false;
      this.editExp = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }

  edits(id: number) {
    this.editExp = true;
    this.ids = id;
    this.myExperience.detail(id).subscribe(
      data => {
        this.experienceEdit = data;
        this.form.controls['cargo'].patchValue(this.experienceEdit.cargo)
        this.form.controls['fecha'].patchValue(this.experienceEdit.fecha)
        this.form.controls['tareas'].patchValue(this.experienceEdit.tareas)
        this.form.controls['empresa'].patchValue(this.experienceEdit.empresa)
      },
      err => {
        console.log(err);
      }
    );
  }

}
