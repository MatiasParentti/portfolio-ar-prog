import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Work } from '../model/Work.component';
import { ServDeleteService } from '../serv-delete.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { WorkService } from '../service/work.service';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.css']
})
export class WorkPageComponent implements OnInit {


  
  roles!: string[];
  isAdmin = false;

  form: FormGroup;

  getWork: Work[] = []
  editsWork: any;

  newWork = false;
  editWork = false;

  ids: number = 0;
  id: number = 0;
  imageEdit: string = '';

  get Name() {
    return this.form.get("name");
  }

  get Info() {
    return this.form.get("info");
  }

  get Stack() {
    return this.form.get("stack");
  }

  get Image() {
    return this.form.get("image");
  }

  get LiveCode() {
    return this.form.get("liveCode");
  }

  get Source() {
    return this.form.get("source");
  }

  get NameValid() {
    return this.Name?.touched && !this.Name?.valid;
  }

  get InfoValid() {
    return this.Info?.touched && !this.Info?.valid;
  }

  get StackValid() {
    return this.Stack?.touched && !this.Stack?.valid;
  }

  get LiveCodeValid() {
    return this.LiveCode?.touched && !this.LiveCode?.valid;
  }

  get ImageValid() {
    return this.Image?.touched && !this.Image?.valid;
  }

  get SourceValid() {
    return this.Source?.touched && !this.Source?.valid;
  }

  cancelar() {
    this.editWork = false;
    this.newWork = false
    this.form.reset();
  }
  volver() {
    this.router.navigate([''])
  }

  constructor(private tokenService: TokenService, private toastr: ToastrService, private router: Router, private myWork: WorkService, private myService: ServDeleteService, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({

      name: ['', [Validators.required]],
      info: ['', [Validators.required]],
      stack: ['', [Validators.required]],
      image: ['', [Validators.required]],
      liveCode: ['', [Validators.required]],
      source: ['', [Validators.required]],

    })



  }

  ngOnInit(): void {

    this.cargarWork();

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });

  }

  cargarWork(): void {
    this.myWork.lista().subscribe(
      data => {
        this.getWork = data;
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
      const add = new Work(this.getWork.length + 1, values.name, values.liveCode, values.source, values.image, values.info, values.stack)
      this.myWork.save(add).subscribe(
        data => {
          this.toastr.success('Work creada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarWork();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        }
      );
      this.newWork = false;
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
      const add = new Work(this.ids, values.name, values.liveCode, values.source, values.image, values.info, values.stack)
      this.myWork.update(this.ids, add).subscribe(
        data => {
          this.toastr.success('Work actualizada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarWork();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.cargarWork();
        }
      );
      this.newWork = false;
      this.editWork = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }
  btnNewWork() {
    if (this.newWork == false) {
      this.newWork = true
    } else {
      this.newWork = false
    }
  }
  edits(id: number) {

    this.editWork = true;
    this.ids = id
    this.myWork.detail(id).subscribe(
      data => {
        this.editsWork = data;
        this.form.controls['name'].patchValue(this.editsWork.name)
        this.form.controls['liveCode'].patchValue(this.editsWork.liveCode)
        this.form.controls['source'].patchValue(this.editsWork.source)
        this.form.controls['image'].patchValue(this.editsWork.image)
        this.form.controls['stack'].patchValue(this.editsWork.stack)
        this.form.controls['info'].patchValue(this.editsWork.info)
      },
      err => {
        console.log(err);
      }
    );

  }
  delete(id: number, name: string) {
    const resp = this.myService.msjAlert('Eliminar  ' + name + '?')
    if (resp) {
      this.myWork.delete(id).subscribe(
        data => {
          this.toastr.success('Work eliminado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarWork();
          this.editWork = false;
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
