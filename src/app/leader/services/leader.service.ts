import { Injectable } from '@angular/core';
import { AppService } from '../../services/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private appSerice: AppService, private http: HttpClient) { }

  obtenerListaErroresAsignados(idProyectos: string): Observable<any> {
    return this.http.post(this.appSerice.URL_API + 'errores/errors-asigned', {id_proyectos: idProyectos});
  }
  obtenerListaErroresNoAsignados(idProyectos: string): Observable<any> {
    return this.http.post(this.appSerice.URL_API + 'errores/errors-not-asigned', {id_proyectos: idProyectos});
  }
  obtenerTodosLosErroresDelProyecto(idProyectos: string): Observable<any> {
    return this.http.post(this.appSerice.URL_API + 'errores/all-errors-by-proyect', {id_proyectos: idProyectos});
  }
}
