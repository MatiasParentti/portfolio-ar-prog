import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{

  
  //aboutText= 'I m a self-taught Full-Stack Developer who works everyday to become a better programmer. I ve been able to learn a lot a different technologies that have given me jobs and let me create personal projects around my things of my interest';
  
  session = false;
  name = 'Matias';


  
  getSession(){
    this.session =  true;
 }
  ngOnInit(): void {
    this.getSession()
  
  }
}
