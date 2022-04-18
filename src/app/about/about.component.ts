import { Component, Input, OnInit } from '@angular/core';
import { ServDataService } from '../serv-data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  @Input() session!: boolean;

  edit = false
  abouText: any
  name = 'Matias';


  form: FormGroup;

  onEnviar(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      this.myData.editAbouText(this.form.value)
      this.edit = false
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }

  cancelar() {
    this.edit = false
  }

  get AboutText() {
    return this.form.get("aboutText");
  }
  get AboutTextValid() {
    return this.AboutText?.touched && !this.AboutText?.valid;
  }


  btnNewExp() {
    if (this.edit == false) {
      this.edit = true
    } else {
      this.edit = false
    }
  }

  constructor(private myData: ServDataService, private formBuilder: FormBuilder) {

    this.form = this.formBuilder.group({

      aboutText: ['', [Validators.required, Validators.maxLength(1000)]],

    })


  }

  ngOnInit(): void {

    this.myData.getAbout().subscribe(myExp => {

      this.abouText = Object.values(myExp)

      this.myData.setAbout(this.abouText)

      this.form.controls['aboutText'].patchValue(this.abouText[0].text)
    });




  }

}
