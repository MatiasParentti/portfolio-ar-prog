import { Component, OnInit } from '@angular/core';
import { ServDeleteService } from '../serv-delete.service';
import { Certification } from '../model/Certification.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CertificationService } from '../service/certification.service';
import { TokenService } from '../service/token.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-certificacion',
  templateUrl: './certificacion.component.html',
  styleUrls: ['./certificacion.component.css']
})
export class CertificacionComponent implements OnInit {

  @Input() session!: boolean;
  @Input() isAdmin!: boolean;



  form: FormGroup;

  getCertification: Certification[] = [];
  certificationEdit: any;

  ids: number = 0;
  id: number = 0

  newCert = false;
  editCert = false;


  get Programa() {
    return this.form.get("programa");
  }

  get Instituto() {
    return this.form.get("instituto");
  }

  get Enlace() {
    return this.form.get("enlace");
  }

 

  get ProgramaValid() {
    return this.Programa?.touched && !this.Programa?.valid;
  }

  get InstitutoValid() {
    return this.Instituto?.touched && !this.Instituto?.valid;
  }

  get EnlaceValid() {
    return this.Enlace?.touched && !this.Enlace?.valid;
  }



  btnNewCert() {
    if (this.newCert == false) {
      this.newCert = true
    } else {
      this.newCert = false
    }
  }

  cancelar() {
    this.editCert = false;
    this.newCert = false;
    this.form.reset();
  }

  constructor(private tokenService: TokenService, private myService: ServDeleteService, private myCertification: CertificationService, private formBuilder: FormBuilder, private toastr: ToastrService,) {

    this.form = this.formBuilder.group({

      programa: ['', [Validators.required]],
      instituto: ['', [Validators.required, Validators.maxLength(300), Validators.minLength(3)]],
      enlace: ['', [Validators.required]],
     

    })

  }

  ngOnInit(): void {

    this.cargarCertification();

  }

  cargarCertification(): void {
    this.myCertification.lista().subscribe(
      data => {
        this.getCertification = data;
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
      const add = new Certification(this.getCertification.length + 1, values.programa, values.instituto, values.enlace)


      this.myCertification.save(add).subscribe(
        data => {
          this.toastr.success('Certificacion creada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarCertification();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });

        }
      );
      this.newCert = false;
      this.editCert = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }

  delete(id: number, cargo: string, empresa: string) {
    const resp = this.myService.msjAlert('Eliminar  ' + cargo + ' ' + empresa + '?')
    if (resp) {
      this.myCertification.delete(id).subscribe(
        data => {
          this.toastr.success('Certificacion eliminada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarCertification();
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
      const add = new Certification(this.ids, values.programa, values.instituto, values.enlace)

      this.myCertification.update(this.ids, add).subscribe(
        data => {
          this.toastr.success('Certificado actualizado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarCertification();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.cargarCertification();
        }
      );
      this.newCert = false;
      this.editCert = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }

  edits(id: number) {
    this.editCert = true;
    this.ids = id;
    this.myCertification.detail(id).subscribe(
      data => {
        this.certificationEdit = data;
        this.form.controls['programa'].patchValue(this.certificationEdit.programa)
        this.form.controls['instituto'].patchValue(this.certificationEdit.instituto)
        this.form.controls['enlace'].patchValue(this.certificationEdit.enlace )
        
      },
      err => {
        console.log(err);
      }
    );
  }

}


