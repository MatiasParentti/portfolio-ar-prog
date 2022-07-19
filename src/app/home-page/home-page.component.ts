import { Component, OnInit } from '@angular/core';
import { TokenService } from '../service/token.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {


  session = false;
  roles!: string[];
  isAdmin = false;


  constructor(private tokenService: TokenService) { }

  
  ngOnInit(): void {
   
    if (this.tokenService.getToken()) {
      this.session = true;
    } else {
      this.session = false;
    }

    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });


  }

}
