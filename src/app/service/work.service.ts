import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Work } from '../model/Work.component';


@Injectable({
    providedIn: 'root'
})

export class WorkService {

    expURL = 'http://localhost:8080/work/'


    constructor(private httpClient: HttpClient) {



    }

    public lista(): Observable<Work[]> {
        return this.httpClient.get<Work[]>(this.expURL + 'lista');
      }
    
      public detail(id: number): Observable<Work> {
        return this.httpClient.get<Work>(this.expURL + `detail/${id}`);
      }
    
      public save(work: Work): Observable<any> {
        return this.httpClient.post<any>(this.expURL + 'create', work);
      }
    
      public update(id: number, work: Work): Observable<any> {
        return this.httpClient.put<any>(this.expURL + `update/${id}`, work);
      }
    
      public delete(id: number): Observable<any> {
        return this.httpClient.delete<any>(this.expURL + `delete/${id}`);
      }


}

