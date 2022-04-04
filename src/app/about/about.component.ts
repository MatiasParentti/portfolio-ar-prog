import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  abouText:String ='';
  session= true;
  name = 'Matias';

  changeAbout(value:String){
    this.abouText = value
 }
  constructor() { }

  ngOnInit(): void {
  }

}
