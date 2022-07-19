import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkService } from '../service/work.service';
import { Work } from '../model/Work.component';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  getWork: Work[] = []

  @Input() session!: boolean;
  @Input() isAdmin!: boolean;

  constructor(private myWork: WorkService, private router: Router) {

  }

  ngOnInit(): void {

    this.cargarWork();

  }

  cargarWork(): void {
    this.myWork.lista().subscribe(
      data => {
        this.getWork = data;
      },
      err => {
        console.log(err);
      }
    );
  }


}