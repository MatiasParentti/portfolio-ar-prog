import { Component, OnInit, Input } from '@angular/core';
import { TokenService } from '../service/token.service';
import { ServDeleteService } from '../serv-delete.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged = false;

  linkGroup = "linkGroup";

  cerrar() {
    if (this.linkGroup == "linkGroup") {
      this.linkGroup = "linkGroup active";
    } else {
      this.linkGroup = "linkGroup"
    }
  }

  onLogOut(): void {
    const resp = this.myService.msjAlert('Cerrar Sesion?')
    if (resp) {
      this.tokenService.logOut();
      this.router.navigate(['/']);
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    }

  }


  constructor(private tokenService: TokenService, private router: Router,private myService: ServDeleteService,) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }


}
