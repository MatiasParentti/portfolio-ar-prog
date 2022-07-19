import { Component, Input, OnInit } from '@angular/core';
import { ServDeleteService } from '../serv-delete.service';
import { Education } from '../model/Education.components';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EducationService } from '../service/education.service';
import { TokenService } from '../service/token.service';


@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})

export class EducationComponent implements OnInit {

  @Input() session!: boolean;
  @Input() isAdmin!: boolean;

  form: FormGroup;

  getEducation: Education[] = [];
  editEducation: any;

  newStudy = false;
  editExp = false;

  editId: number = 0;
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

  constructor(private myService: ServDeleteService, 
    private myEducation: EducationService, 
    private formBuilder: FormBuilder, 
    private toastr: ToastrService,
    
    ) {

    this.form = this.formBuilder.group({

      instituto: ['', [Validators.required]],
      fecha: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9)]],
      programa: ['', [Validators.required]],
      estado: ['', [Validators.required]],

    })

  }

  ngOnInit(): void {

    this.cargarEducation();
   
  }

  cargarEducation(): void {
    this.myEducation.lista().subscribe(
      data => {
        this.getEducation = data;
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
      const add = new Education(this.getEducation.length + 1, values.instituto, values.fecha, values.programa, values.estado)
      this.myEducation.save(add).subscribe(
        data => {
          this.toastr.success('Education creada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarEducation();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        }
      );
      this.newStudy = false;
      this.editExp = false;
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
      const add = new Education(this.editId, values.instituto, values.fecha, values.programa, values.estado)
      this.myEducation.update(this.editId, add).subscribe(
        data => {
          this.toastr.success('Education actualizada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarEducation();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.cargarEducation();
        }
      );
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
    this.editId = id
    this.myEducation.detail(id).subscribe(
      data => {
        this.editEducation = data;
        this.form.controls['fecha'].patchValue(this.editEducation.fecha)
        this.form.controls['instituto'].patchValue(this.editEducation.instituto)
        this.form.controls['programa'].patchValue(this.editEducation.programa)
        this.form.controls['estado'].patchValue(this.editEducation.estado)
      },
      err => {
        console.log(err);
      }
    );


  }

  delete(id: number, programa: string) {
    const resp = this.myService.msjAlert('Eliminar  ' + programa + '?')
    if (resp) {
      this.myEducation.delete(id).subscribe(
        data => {
          this.toastr.success('Education eliminada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarEducation();
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



}
