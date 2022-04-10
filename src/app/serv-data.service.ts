import { Injectable, OnInit } from '@angular/core';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ServDataService {



  contact: any = [];

  worksGet = [

    {
      id: 1,
      name: 'Fratelli MIP',
      liveCode: 'https://fratellicontroldeplagas.com.ar/',
      source: 'https://github.com/MatiasParentti/Fratelli-Web',
      image: "../assets/work2.jpg",
      info: 'web app para empresa de servicio',
      stack: 'Node/CSS/React'
    },
    {
      id: 2,
      name: 'Cafe El chiwi',
      liveCode: 'https://app-cafe-chiwi.herokuapp.com/',
      source: 'https://github.com/MatiasParentti/App-pedidos-cafe',
      image: "../assets/work1.png",
      info: 'web app para gestion de pedidos',
      stack: 'Node/CSS/React'
    },
    {
      id: 3,
      name: 'Agenda Contactos',
      liveCode: 'https://tranquil-bayou-72096.herokuapp.com/',
      source: 'https://github.com/MatiasParentti/app-agenda',
      image: "../assets/agenda.png",
      info: 'web agenda online',
      stack: 'Node/CSS/React'
    },
    {
      id: 4,
      name: 'Pokedex',
      liveCode: 'https://app-pokex.herokuapp.com/',
      source: 'https://github.com/MatiasParentti/pokedex',
      image: "../assets/pok.png",
      info: 'pokedex api',
      stack: 'Node/CSS/React'
    },
  ];

  studyGet = [

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
  experiencesGet: any = []
 

  abouText: string = 'I m a self-taught Full-Stack Developer who works everyday to become a better programmer. I ve been able to learn a lot a different technologies that have given me jobs and let me create personal projects around my things of my interest';


  pushNewExp(newData: any) {
    this.experiencesGet.push(newData);
    this.dataService.guardarExp(this.experiencesGet)
  }
  pushNewWork(newData: any) {
    this.worksGet.push(newData);
  }
  pushNewStudy(newData: any) {
    this.studyGet.push(newData);
  }
  pushNewContact(newData: any) {
    this.contact.push(newData);
  }
  editAbouText(newData: string) {
    this.abouText = newData;
  }
  editExp(id: number) {
    let exp = this.experiencesGet[id];
    return exp
  }
  editStudy(id: number) {
    let study = this.studyGet[id];
    return study;
  }
  editWork(id: number) {
    let work = this.worksGet[id];
    return work;
  }
  actualizarExp(id: number, exp: any) {
    let actExp = this.experiencesGet[id]
    actExp.empresa = exp.empresa
    actExp.cargo = exp.cargo
    actExp.fecha = exp.fecha
    actExp.tareas = exp.tareas
  }
  actualizarStudy(id: number, exp: any) {
    let actStudy = this.studyGet[id]
    actStudy.instituto = exp.instituto
    actStudy.programa = exp.programa
    actStudy.fecha = exp.fecha
    actStudy.estado = exp.estado
  }
  actualizarWork(id: number, exp: any) {
    let actWork = this.worksGet[id]
    actWork.name = exp.name
    actWork.liveCode = exp.liveCode
    actWork.source = exp.source
    actWork.info = exp.info
    actWork.stack = exp.stack
    actWork.image = exp.image
  }
  deleteWork(id: number) {
    this.worksGet.splice(id, 1)
  }
  deleteStudy(id: number) {
    this.studyGet.splice(id, 1)
  }
  deleteExp(id: number) {
    this.experiencesGet.splice(id, 1)
  }


  getExperiences() {
    return this.dataService.cargarExp()
  }




  constructor(private dataService: DataService) {

    this.getExperiences().subscribe(myExp => {

      this.experiencesGet = myExp
      
    });


  }



}
