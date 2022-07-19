import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../service/profile.service';
import { Profile } from '../model/Profile.components';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-banner-home',
  templateUrl: './banner-home.component.html',
  styleUrls: ['./banner-home.component.css'],
  animations: [
  
  ]
})

export class BannerHomeComponent implements OnInit {

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
