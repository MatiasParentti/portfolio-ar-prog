import { Component, OnInit } from '@angular/core';
import { TokenService } from './service/token.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  session = false;

  name = 'Matias';

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.session = true;
    } else {
      this.session = false;
    }

  }
}
