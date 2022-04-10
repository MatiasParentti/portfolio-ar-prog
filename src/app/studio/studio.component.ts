import { Component, Input, OnInit } from '@angular/core';
import { ServDeleteService } from '../serv-delete.service';
import { studys } from './studys.components';
import { ServDataService } from '../serv-data.service';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})

export class StudioComponent implements OnInit {

  @Input() session!: boolean;

  studyGet: any = this.myData.studyGet

  newStudy = false;
  editExp = false;

  index: any;

  ids: number = 0;

  id: number = 0
  instituto: string = ' '
  fecha: string = ' '
  programa: string = ' '
  estado: string = ' '

  edits(id: number) {
    this.editExp = true;
    this.ids = id
    this.index = this.myData.editStudy(id)
    this.instituto = this.index.instituto
    this.fecha = this.index.fecha
    this.programa = this.index.programa
    this.estado = this.index.estado
    this.id = this.index.id
  }

  cancelar() {
    this.newStudy = false;
    this.editExp = false;
    this.clear()
  }
  confirmar() {
    const editThis = new studys(this.id, this.instituto, this.fecha, this.programa, this.estado)
    this.myData.actualizarStudy(this.ids, editThis)
    this.editExp = false;
    this.clear()
  }

  btnNewStudy() {
    if (this.newStudy == false) {
      this.newStudy = true
    } else {
      this.newStudy = false
    }
  }

  clear() {
    this.id = 0,
      this.instituto = ' ',
      this.fecha = ' ',
      this.programa = ' ',
      this.estado = ' '
  }

  delete(id: number, programa: string) {
    const resp = this.myService.msjAlert('eliminar  ' + programa + '?')
    if (resp) {
      this.myData.deleteStudy(id)
    }
    return false
  }

  add() {
    const add = new studys(this.studyGet.length + 1, this.instituto, this.fecha, this.programa, this.estado)
    this.myData.pushNewStudy(add)
    this.clear()
    this.newStudy = false;
    return false;
  }


  constructor(private myService: ServDeleteService, private myData: ServDataService) {

  }

  ngOnInit(): void {
  }

}
