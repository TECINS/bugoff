import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class CreateProyectService {

  constructor(private http: HttpClient, private appConfig: AppService) { }

  registerProject(body: any): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'proyectos/crear', body);
  }

  enviarInvitacionAlProyecto(body: any): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'proyectos-usuarios/send-invitation', body);
  }
  obtenerProyectosPorId(idUsuarios: string): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'proyectos/all', {id_usuarios: idUsuarios});
  }

}
