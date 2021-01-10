import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  constructor(private http: HttpClient, private appConfig: AppService) { }

  obtenerInformacionDelProyecto(idProyectos: string, idUsuarios: string): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'proyectos/select-one-by-id', {id_proyectos: idProyectos, id_usuarios: idUsuarios});
  }
  obtenerProyectosPorId(idUsuarios: string): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'proyectos/all', {id_usuarios: idUsuarios});
  }
}
