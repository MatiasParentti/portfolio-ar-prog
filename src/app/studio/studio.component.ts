import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrls: ['./studio.component.css']
})
export class StudioComponent implements OnInit {

  study = [

    {
      id: 1,
      instituto: 'Ministerio de desarrollo productivo',
      fecha: '2021 - Actualidad',
      programa: 'Argentina Programa',
      estado: 'En Curso'
    },
    {
      id: 2,
      instituto: 'Full Stack Open',
      fecha: '2022 - Actualidad',
      programa: 'Full Stack Open 2021',
      estado: 'En Curso'
    },
    {
      id: 3,
      instituto: 'UTN FRC',
      fecha: '2020 - 2021',
      programa: 'Diplomatura desarrollo web',
      estado: 'Finalizado'
    },
    {
      id: 4,
      instituto: 'Escuela Secundaria Marina Vilte Nº2',
      fecha: '2008 - 2013',
      programa: 'Titulo Educacion Secundaria',
      estado: 'Finalizado'
    },
    
    
  ];
  
  session = true;
  
  constructor() { }

  ngOnInit(): void {
  }

}
