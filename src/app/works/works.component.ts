import { Component, Input, OnInit } from '@angular/core';
import { workss } from './workss.component';
import { ServDeleteService } from '../serv-delete.service';
import { ServDataService } from '../serv-data.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  worksGet: any = this.myData.worksGet

  @Input() session!: boolean;

  newWork = false;

  id: number = 0
  name: string = ' '
  liveCode: string = ' '
  source: string = ' '
  image: string = ' '
  info: string = ' '
  stack: string = ' '

  btnNewWork() {
    if (this.newWork == false) {
      this.newWork = true
    } else {
      this.newWork = false
    }
  }

  clear() {
    this.id = 0,
      this.name = ' ',
      this.liveCode = ' ',
      this.source = ' ',
      this.image = ' ',
      this.info = ' ',
      this.stack = ' '
  }

  delete(id: number, name: string) {
    const resp = this.myService.msjAlert('eliminar  ' + name + '?')
    if (resp) {
      this.myData.deleteWork(id)
    }
    return false
  }
  editar() {
    
  }
  add() {
    const add = new workss(this.worksGet.length + 1, this.name, this.liveCode, this.source, this.image, this.info, this.stack)
    this.myData.pushNewWork(add)
    this.clear()
    this.newWork = false;
    return false;
  }

  constructor(private myService: ServDeleteService, private myData: ServDataService) {



  }

  ngOnInit(): void {
  }

}
