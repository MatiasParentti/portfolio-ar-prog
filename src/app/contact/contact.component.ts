import { Component, OnInit } from '@angular/core';
import { ServDataService } from '../serv-data.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  consulta: string = ' '
  email: string = ' '
  name: string = ' '

  send() {
    const data = {
      name: this.name,
      email: this.email,
      consulta: this.consulta
    }
    console.log(data);
    this.myDataBase.pushNewContact(data)
    return false
  }



  constructor(private myDataBase: ServDataService) { }

  ngOnInit(): void {
  }

}
