import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {

  experiences = [

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
   
    
  ];

  session= true;

  constructor() { }

  ngOnInit(): void {
  }

}
