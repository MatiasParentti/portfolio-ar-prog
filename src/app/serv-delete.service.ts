import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServDeleteService {

  constructor() { }


  msjAlert(mensaje: string) {
    const result = window.confirm(mensaje)

    return result

  }
}
