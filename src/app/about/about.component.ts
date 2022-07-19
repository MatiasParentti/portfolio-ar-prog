import { Component, Input, OnInit } from '@angular/core';
import { Profile } from '../model/Profile.components';
import { ProfileService } from '../service/profile.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  @Input() session!: boolean;
  @Input() isAdmin!: boolean;

  getProfile: Profile[] = [];
  editProfile: any;

  edit = false
  editId: number = 0;
 

  btnNewExp() {
    if (this.edit == false) {
      this.edit = true

    } else {
      this.edit = false
    }
  }

  constructor(private myProfile: ProfileService) {



  }

  ngOnInit(): void {

    this.cargarProfile();
  

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



}
