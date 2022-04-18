import { Injectable, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { experiences } from './experience/experiences.component';
import { studys } from './studio/studys.components';
import { workss } from './works/workss.component';

@Injectable({
  providedIn: 'root'
})
export class ServDataService {

  experiencesGet: experiences[] = [];

  studyGet: studys[] = [];

  worksGet: workss[] = [];

  abouText: any = []

  contact: any = [];




  pushNewExp(newData: any) {
    this.experiencesGet.push(newData);
    this.dataService.guardarExp(this.experiencesGet)
  }
  pushNewWork(newData: workss) {
    this.worksGet.push(newData);
    this.dataService.guardarWorks(this.worksGet)
  }
  pushNewStudy(newData: studys) {
    this.studyGet.push(newData);
    this.dataService.guardarStudio(this.studyGet)
  }
  pushNewContact(newData: object) {
    this.contact.push(newData);
    this.dataService.guardarContact(this.contact)
  }


  editAbouText(newData: any) {
    let nueva = this.abouText[0]
    nueva.text = newData.aboutText
    this.dataService.guardarAbout(this.abouText)
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

  actualizarExp(id: number, exp: experiences) {
    let actExp = this.experiencesGet[id]
    actExp.empresa = exp.empresa
    actExp.cargo = exp.cargo
    actExp.fecha = exp.fecha
    actExp.tareas = exp.tareas
    this.dataService.guardarExp(this.experiencesGet)
  }
  actualizarStudy(id: number, exp: studys) {
    let actStudy = this.studyGet[id]
    actStudy.instituto = exp.instituto
    actStudy.programa = exp.programa
    actStudy.fecha = exp.fecha
    actStudy.estado = exp.estado
    this.dataService.guardarStudio(this.studyGet)
  }
  actualizarWork(id: number, exp: workss) {
    let actWork = this.worksGet[id]
    actWork.name = exp.name
    actWork.liveCode = exp.liveCode
    actWork.source = exp.source
    actWork.info = exp.info
    actWork.stack = exp.stack
    actWork.image = exp.image
    this.dataService.guardarWorks(this.worksGet)
  }

  deleteWork(id: number) {
    this.worksGet.splice(id, 1)
    this.dataService.guardarWorks(this.worksGet)
  }
  deleteStudy(id: number) {
    this.studyGet.splice(id, 1)
    this.dataService.guardarStudio(this.studyGet)
  }
  deleteExp(id: number) {
    this.experiencesGet.splice(id, 1)
    this.dataService.guardarExp(this.experiencesGet)
  }


  getExperiences() {
    return this.dataService.cargarExp()
  }
  getContact() {
    return this.dataService.cargarContact()
  }
  getStudio() {
    return this.dataService.cargarStudio()
  }
  getWorks() {
    return this.dataService.cargarWorks()
  }
  getAbout() {
    return this.dataService.cargarAbout()
  }


  setExperience(experience: experiences[]) {

    this.experiencesGet = experience
  }
  setStudio(studio: studys[]) {

    this.studyGet = studio
  }
  setWorks(works: workss[]) {

    this.worksGet = works
  }
  setAbout(about: any) {

    this.abouText = about
  }



  constructor(private dataService: DataService) {


    this.getContact().subscribe(myExp => {

      this.contact = myExp

    });



  }



}
