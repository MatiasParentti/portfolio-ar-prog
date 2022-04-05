import { Component, OnInit } from '@angular/core';
import { experiences } from './experiences.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})


export class ExperienceComponent implements OnInit {


  experiencesGet: any;

  id: number = 0
  empresa: string = ' '
  fecha: string = ' '
  tareas: string = ' '
  cargo: string = ' '

  session = true;
  newExp = false;
  index:number = 0;

  btnNewExp() {
    if (this.newExp == false) {
      this.newExp = true
    } else {
      this.newExp = false
    }
  }

  clear() {
    this.id = 0,
      this.empresa = ' ',
      this.fecha = ' ',
      this.tareas = ' ',
      this.cargo = ' '
  }

  delete(id:number) {
    if(this.experiencesGet.length <= 1){
      this.index = 0;
    }else{
      this.index = id-1;
    }
    this.experiencesGet.splice(this.index,id)
    return false
  }

  add() {

    const agg = new experiences(this.experiencesGet.length + 1, this.empresa, this.fecha, this.tareas, this.cargo)
    this.experiencesGet.push(agg);
    console.log(agg)
    this.clear()
    this.newExp = false;
    return false;
  }

  constructor() {

    this.experiencesGet = [

      {
        id: 1,
        empresa: 'Fratelli CDP',
        fecha: '2021 - Actualidad',
        tareas: 'Administracion sitio web, Atencion al Cliente',
        cargo: 'Administracion'
      },
      {
        id: 2,
        empresa: 'Talex SRL',
        fecha: '2016 - 2021',
        tareas: 'Tecnico control de plagas, Cadeteria, Atencion al Cliente',
        cargo: 'Empleado'
      },


    ]


  }

  ngOnInit(): void {
  }

}
