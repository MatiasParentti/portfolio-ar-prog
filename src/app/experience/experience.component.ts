import { Component, Input, OnInit } from '@angular/core';
import { ServDeleteService } from '../serv-delete.service';
import { experiences } from './experiences.component';
import { ServDataService } from '../serv-data.service';
@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})


export class ExperienceComponent implements OnInit {

  @Input() session!: boolean;

  experiencesGet: any = this.myData.experiencesGet

  index:any;

  ids: number = 0;

  id: number = 0
  empresa: string = ' '
  fecha: string = ' '
  tareas: string = ' '
  cargo: string = ' '

  idEdit: number = 0
  empresaEdit: string = ''
  fechaEdit: string = ' '
  tareasEdit: string = ' '
  cargoEdit: string = ' '


  newExp = false;
  editExp = false;



  btnNewExp() {
    if (this.newExp == false) {
      this.newExp = true
    } else {
      this.newExp = false
    }
  }

  edits(id: number) {
    this.editExp = true;
    this.ids = id
    this.index = this.myData.editExp(id)
    this.empresaEdit = this.index.empresa
    this.fechaEdit = this.index.fecha
    this.tareasEdit = this.index.tareas
    this.cargoEdit = this.index.cargo
    this.idEdit = this.index.id
  }



  cancelar() {
    this.editExp = false;
  }
  confirmar() {
    const editThis = new experiences(this.idEdit, this.empresaEdit, this.fechaEdit, this.tareasEdit, this.cargoEdit)
    this.myData.actualizarExp(this.ids,editThis)
    this.editExp = false;
  }

  clear() {
    this.id = 0,
      this.empresa = ' ',
      this.fecha = ' ',
      this.tareas = ' ',
      this.cargo = ' '
  }

  delete(id: number, cargo: string, empresa: string) {
    const resp = this.myService.msjAlert('eliminar  ' + cargo + ' ' + empresa + '?')
    if (resp) {
      this.experiencesGet.splice(id, 1)
    }
    return false
  }

  add() {

    const add = new experiences(this.experiencesGet.length + 1, this.empresa, this.fecha, this.tareas, this.cargo)
    this.myData.pushNewExp(add)
    this.clear()
    this.newExp = false;
    this.editExp = false;
    return false;

  }

  constructor(private myService: ServDeleteService, private myData: ServDataService) {


  }

  ngOnInit(): void {



  }

}
