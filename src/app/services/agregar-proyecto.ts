import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerPoint } from '../config/config.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgregaProyecto {

  constructor(private http: HttpClient, private SERV_POINT: ServerPoint) { }


  registerProject(body: any): Observable<any> {
    return this.http.post(this.SERV_POINT.URL_API + 'proyectos/crear', body);
  }
}
