import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor() { }
  URL_API = 'https://api-bugoff.herokuapp.com/';
    // URL_API = 'http://localhost:3000/';
}
