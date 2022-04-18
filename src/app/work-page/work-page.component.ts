import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { workss } from '../works/workss.component';
import { ServDataService } from '../serv-data.service';
import { ServDeleteService } from '../serv-delete.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.css']
})
export class WorkPageComponent implements OnInit {

  // @Input() session!: boolean; 
  session = true;

  form: FormGroup;

  worksGet: workss[] = []
  workEdit: any;

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

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let values = this.form.value
      const add = new workss(this.worksGet.length + 1, values.name, values.liveCode, values.source, values.image, values.info, values.stack)
      this.myData.pushNewWork(add)
      alert("Nueva Work Agregada")
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
      const add = new workss(this.worksGet.length + 1, values.name, values.liveCode, values.source, values.image, values.info, values.stack)
      this.myData.actualizarWork(this.ids, add)
      alert("work editada")
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
    this.workEdit = this.myData.editWork(id)
    this.form.controls['name'].patchValue(this.workEdit.name)
    this.form.controls['liveCode'].patchValue(this.workEdit.liveCode)
    this.form.controls['source'].patchValue(this.workEdit.source)
    this.form.controls['image'].patchValue(this.workEdit.image)
    this.form.controls['stack'].patchValue(this.workEdit.stack)
    this.form.controls['info'].patchValue(this.workEdit.info)
    this.id = this.workEdit.id
    this.imageEdit = this.workEdit.image

  }
  delete(id: number, name: string) {
    const resp = this.myService.msjAlert('eliminar  ' + name + '?')
    if (resp) {
      this.myData.deleteWork(id)
    }
    this.editWork = false;
    this.form.reset();
    return false
  }
  cancelar() {
    this.editWork = false;
    this.newWork = false
    this.form.reset();
  }
  volver() {
    this.router.navigate([''])
  }



  constructor(private router: Router, private myData: ServDataService, private myService: ServDeleteService, private formBuilder: FormBuilder) {

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

    this.myData.getWorks().subscribe(myWork => {

      this.worksGet = Object.values(myWork)

      this.myData.setWorks(this.worksGet)

    });

  }

}
