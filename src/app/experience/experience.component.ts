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

  experiencesGet: any

  index: any;

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
    this.empresa = this.index.empresa
    this.fecha = this.index.fecha
    this.tareas = this.index.tareas
    this.cargo = this.index.cargo
    this.id = this.index.id
  }



  cancelar() {
    this.editExp = false;
    this.newExp = false;
    this.clear()
  }
  confirmar() {
    const editThis = new experiences(this.id, this.empresa, this.fecha, this.tareas, this.cargo)
    this.myData.actualizarExp(this.ids, editThis)
    this.editExp = false;
    this.clear()
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


    this.myData.getExperiences().subscribe(myExp => {

      this.experiencesGet = myExp
      
    });


    this.experiencesGet = this.myData.experiencesGet


  }

}
