import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Profile } from '../model/Profile.components';
import { ProfileService } from '../service/profile.service';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  getProfile: Profile[] = [];
  editProfile: any;
  edit = false
  form: FormGroup;
  editId: number = 0;

  roles!: string[];
  isAdmin = false;

  
  cancelar() {
    this.edit = false
  }

  get Name() {
    return this.form.get("name");
  }
  get NameValid() {
    return this.Name?.touched && !this.Name?.valid;
  }
  get LastName() {
    return this.form.get("lastname");
  }
  get LastNameValid() {
    return this.LastName?.touched && !this.LastName?.valid;
  }
  get About() {
    return this.form.get("about");
  }
  get AboutValid() {
    return this.About?.touched && !this.About?.valid;
  }
  get ImageUrl() {
    return this.form.get("imageUrl");
  }
  get ImageUrlValid() {
    return this.ImageUrl?.touched && !this.ImageUrl?.valid;
  }
  get Email() {
    return this.form.get("email");
  }
  get EmailValid() {
    return this.Email?.touched && !this.Email?.valid;
  }
  get Github() {
    return this.form.get("github");
  }
  get GithubValid() {
    return this.Github?.touched && !this.Github?.valid;
  }
  get Linkedin() {
    return this.form.get("linkedin");
  }
  get LinkedinValid() {
    return this.Linkedin?.touched && !this.Linkedin?.valid;
  }



  constructor(private tokenService: TokenService,private myProfile: ProfileService, private formBuilder: FormBuilder, private toastr: ToastrService) {

    this.form = this.formBuilder.group({

      name: ['', [Validators.required, Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.maxLength(20000)]],
      about: ['', [Validators.required, Validators.maxLength(2000)]],
      imageUrl: ['', [Validators.required, Validators.maxLength(1000)]],
      email: ['', [Validators.required, Validators.maxLength(200)]],
      github: ['', [Validators.required, Validators.maxLength(1000)]],
      linkedin: ['', [Validators.required, Validators.maxLength(1000)]],


    })

  }

  ngOnInit(): void {

    this.cargarProfile();

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  cargarProfile(): void {
    this.myProfile.lista().subscribe(
      data => {
        this.getProfile = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  edits(id: number) {
    this.edit = true;
    this.editId = id;
    this.myProfile.detail(id).subscribe(
      data => {
        this.editProfile = data;
        this.form.controls['name'].patchValue(this.editProfile.name)
        this.form.controls['lastname'].patchValue(this.editProfile.lastname)
        this.form.controls['about'].patchValue(this.editProfile.about)
        this.form.controls['imageUrl'].patchValue(this.editProfile.imageUrl)
        this.form.controls['email'].patchValue(this.editProfile.email)
        this.form.controls['github'].patchValue(this.editProfile.github)
        this.form.controls['linkedin'].patchValue(this.editProfile.linkedin)
      },
      err => {
        console.log(err);
      }
    );
  }

  onEdit(event: Event) {
    event.preventDefault;
    if (this.form.valid) {
      let values = this.form.value
      const add = new Profile(this.editId, values.name, values.lastname, values.about, values.imageUrl, values.email, values.github, values.linkedin)

      this.myProfile.update(this.editId, add).subscribe(
        data => {
          this.toastr.success('Profile actualizada', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });
          this.cargarProfile();
        },
        err => {
          this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000, positionClass: 'toast-top-center',
          });
          this.cargarProfile();
        }
      );

      this.edit = false;
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
      console.log('error')
    }

  }



}
