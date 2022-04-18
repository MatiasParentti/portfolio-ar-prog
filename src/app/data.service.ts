import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";



@Injectable()
export class DataService {

    constructor(private httpClient: HttpClient) {



    }

    cargarExp() {
        return this.httpClient.get('https://matiparentti-9296f-default-rtdb.firebaseio.com/experiences.json')
    }
    cargarContact() {
        return this.httpClient.get('https://matiparentti-9296f-default-rtdb.firebaseio.com/contact.json')
    }

    cargarAbout() {
        return this.httpClient.get('https://matiparentti-9296f-default-rtdb.firebaseio.com/about.json')
    }
    cargarStudio() {
        return this.httpClient.get('https://matiparentti-9296f-default-rtdb.firebaseio.com/studio.json')
    }
    cargarWorks() {
        return this.httpClient.get('https://matiparentti-9296f-default-rtdb.firebaseio.com/works.json')
    }


    guardarExp(experience: any) {
        this.httpClient.put('https://matiparentti-9296f-default-rtdb.firebaseio.com/experiences.json', experience).subscribe(

            response => console.log('ok ' + response),
            error => console.log('error: ' + error),

        );
    }
    guardarContact(contact: object) {
        this.httpClient.put('https://matiparentti-9296f-default-rtdb.firebaseio.com/contact.json', contact).subscribe(

            response => console.log('ok ' + response),
            error => console.log('error: ' + error),

        );
    }
    guardarStudio(studio: object) {
        this.httpClient.put('https://matiparentti-9296f-default-rtdb.firebaseio.com/studio.json', studio).subscribe(

            response => console.log('ok ' + response),
            error => console.log('error: ' + error),

        );
    }
    guardarWorks(works: object) {
        this.httpClient.put('https://matiparentti-9296f-default-rtdb.firebaseio.com/works.json', works).subscribe(

            response => console.log('ok ' + response),
            error => console.log('error: ' + error),

        );
    }
    guardarAbout(about: any) {
        this.httpClient.put('https://matiparentti-9296f-default-rtdb.firebaseio.com/about.json', about).subscribe(

            response => console.log('ok ' + response),
            error => console.log('error: ' + error),

        );
    }



}