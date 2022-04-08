import { Component, Input, OnInit } from '@angular/core';
import { ServDataService } from '../serv-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {


  @Input() session!: boolean;

  newExp = true

  abouText: string  = this.myData.abouText
  newAbouText: string = ''
  name = 'Matias';

  btnNewExp() {
    if (this.newExp == false) {
      this.newExp = true
    } else {
      this.newExp = false
    }
  }

  add() {
    this.myData.editAbouText(this.newAbouText)
    this.newExp = true;
    return false;
  }

  constructor(private myData: ServDataService) {

    
  }

  ngOnInit(): void {
  }

}
