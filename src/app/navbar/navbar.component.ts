import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() session!: boolean;

  linkGroup = "linkGroup";

  cerrar(){
    if(this.linkGroup == "linkGroup"){
      this.linkGroup = "linkGroup active";
    }else{
      this.linkGroup = "linkGroup"
    }
   }

  constructor() { }

  ngOnInit(): void {
  }

}
