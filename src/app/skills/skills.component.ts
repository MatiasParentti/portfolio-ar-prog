import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ServDeleteService } from '../serv-delete.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenService } from '../service/token.service';
import { Skill } from '../model/Skill.component';
import { SkillService } from '../service/skill.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {


  getSkill: Skill[] = [];
  skillEdit: any;
  form: FormGroup;
  newSkill = false;
  editSkill = false;

  @Input() isAdmin!: boolean;
  ids: number = 0;
  id: number = 0

  get UrlSvg() {
    return this.form.get("urlSvg");
  }

  get NameSkill() {
    return this.form.get("nameSkill");
  }

  get UrlSvgValid() {
    return this.UrlSvg?.touched && !this.UrlSvg?.valid;
  }

  get NameSkillValid() {
    return this.NameSkill?.touched && !this.NameSkill?.valid;
  }


  cancelar() {
    this.editSkill = false;
    this.newSkill = false;
    this.form.reset();
  }
  btnNewExp() {
    if (this.newSkill == false) {
      this.newSkill = true
    } else {
      this.newSkill = false
    }
  }

  constructor(private tokenService: TokenService,private myService: ServDeleteService, private mySkill: SkillService, private formBuilder: FormBuilder, private toastr: ToastrService,) { 

    this.form = this.formBuilder.group({

      urlSvg: ['', [Validators.required]],
      nameSkill: ['', [Validators.required]],
      

    })
  }

  ngOnInit(): void {
this.cargarSkill();
  }
  cargarSkill(): void {
    this.mySkill.lista().subscribe(
      data => {
        this.getSkill = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  delete(id: number, nameSkill: string) {
    const resp = this.myService.msjAlert('Eliminar  '+ nameSkill + '?')
    if (resp) {
      this.mySkill.delete(id).subscribe(
        data => {
          this.toastr.success('Skill eliminada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarSkill();
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
  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let values = this.form.value
      const add = new Skill(this.getSkill.length+1,values.urlSvg,values.nameSkill)
      this.mySkill.save(add).subscribe(
        data => {
          this.toastr.success('Skill creada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarSkill();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        }
      );
      this.newSkill = false;
      this.editSkill = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }

}
