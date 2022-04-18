import { Component, Input, OnInit } from '@angular/core';
import { ServDataService } from '../serv-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.css']
})
export class WorksComponent implements OnInit {

  worksGet: any

  @Input() session!: boolean;




  constructor(private myData: ServDataService, private router: Router) {



  }

  ngOnInit(): void {

    this.myData.getWorks().subscribe(myWork => {

      this.worksGet = myWork

    });

  }

}
