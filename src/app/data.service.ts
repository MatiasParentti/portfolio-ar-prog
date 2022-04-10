import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { experiences } from "./experience/experiences.component";

@Injectable()
export class DataService {

    constructor(private httpClient: HttpClient) {



    }

    cargarExp() {
        return this.httpClient.get('https://matiparentti-9296f-default-rtdb.firebaseio.com/experiences.json')
    }

    guardarExp(experience: any) {
        this.httpClient.put('https://matiparentti-9296f-default-rtdb.firebaseio.com/experiences.json', experience).subscribe(

            response => console.log('ok ' + response),
            error => console.log('error: ' + error),

        );
    }



}