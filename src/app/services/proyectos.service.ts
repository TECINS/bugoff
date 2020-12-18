import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerPoint } from '../config/config.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient, private appConfig: ServerPoint) { }

  registerProject(body: any): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'proyectos/crear', body);
  }

  obtenerProyectosPorId(idUsuarios: string): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'proyectos/all', {id_usuarios: idUsuarios});
  }

  enviarInvitacionAlProyecto(body: any): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'proyectos-usuarios/send-invitation', body);
  }
}
