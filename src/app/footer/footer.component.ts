import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../model/Profile.components';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  getProfile: Profile[] = [];


  constructor(private myProfile: ProfileService) { }

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
