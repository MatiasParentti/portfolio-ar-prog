import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  works = [

    {
      id: 1,
      name: 'Fratelli MIP',
      liveCode: 'https://fratellicontroldeplagas.com.ar/',
      source: 'https://github.com/MatiasParentti/Fratelli-Web',
      image: "../assets/work2.jpg",
      info: 'web app para empresa de servicio'
    },
    {
      id: 2,
      name: 'Cafe El chiwi',
      liveCode: 'https://app-cafe-chiwi.herokuapp.com/',
      source: 'https://github.com/MatiasParentti/App-pedidos-cafe',
      image: "../assets/work1.png",
      info: 'web app para gestion de pedidos'
    },
    {
      id: 3,
      name: 'Agenda Contactos',
      liveCode: 'https://tranquil-bayou-72096.herokuapp.com/',
      source: 'https://github.com/MatiasParentti/app-agenda',
      image: "../assets/agenda.png",
      info: 'web agenda online'
    },
    {
      id: 4,
      name: 'Pokedex',
      liveCode: 'https://app-pokex.herokuapp.com/',
      source: 'https://github.com/MatiasParentti/pokedex',
      image: "../assets/pok.png",
      info: 'pokedex api'
    },
  ];

  session = true;

  constructor() { }

  ngOnInit(): void {
  }

}
