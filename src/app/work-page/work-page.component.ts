import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { workss } from '../works/workss.component';
import { ServDataService } from '../serv-data.service';
import { ServDeleteService } from '../serv-delete.service';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.css']
})
export class WorkPageComponent implements OnInit {

  worksGet: any = this.myData.worksGet

  // @Input() session!: boolean;

  session = false;
  newWork = false;
  editWork = false;
  ids: number = 0;
  index: any;
 

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

  add() {
    const add = new workss(this.worksGet.length + 1, this.name, this.liveCode, this.source, this.image, this.info, this.stack)
    this.myData.pushNewWork(add)
    this.clear()
    this.newWork = false;
    return false;
  }
  


  edits(id: number) {

    this.editWork = true;
    this.ids = id
    this.index = this.myData.editWork(id)
    this.name = this.index.name
    this.liveCode = this.index.liveCode
    this.source = this.index.source
    this.image = this.index.image
    this.stack = this.index.stack
    this.info = this.index.info
    this.id = this.index.id

  }
  delete(id: number, name: string) {
    const resp = this.myService.msjAlert('eliminar  ' + name + '?')
    if (resp) {
      this.myData.deleteWork(id)
    }
    this.editWork = false;
    this.clear();
    return false
  }

  cancelar() {
    this.editWork = false;
    this.newWork = false
    this.clear()
  }

  confirmar() {
    const editThis = new workss(this.id, this.name, this.liveCode, this.source, this.image, this.info, this.stack)
    this.myData.actualizarWork(this.ids, editThis)
    this.editWork = false;
    this.clear()
  }
  volver() {
    this.router.navigate([''])
  }



  constructor(private router: Router, private myData: ServDataService, private myService: ServDeleteService) { }

  ngOnInit(): void {
  }

}
