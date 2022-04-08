import { Component,  OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  session = false;
  
  name = 'Matias';

  getSession(){
    this.session =  true;
 }
  ngOnInit(): void {
   
    this.getSession()
  }
}
