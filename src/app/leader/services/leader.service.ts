import { Injectable } from '@angular/core';
import { AppService } from '../../services/app.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(private appService: AppService, private http: HttpClient) { }

  obtenerListaErroresAsignados(idProyectos: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores/errors-asigned', {id_proyectos: idProyectos});
  }
  obtenerListaErroresNoAsignados(idProyectos: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores/errors-not-asigned', {id_proyectos: idProyectos});
  }
  obtenerTodosLosErroresDelProyecto(idProyectos: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores/all-errors-by-proyect', {id_proyectos: idProyectos});
  }
  obtenerErrorPorId(idErrores: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores/error-by-id', {id_errores: idErrores});
  }
  obtenerErrorPorIdAsignado(idErrores: string, idUsuarios: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores/error-by-id-asigned', {id_errores: idErrores, id_usuarios: idUsuarios});
  }
  obtenerDesarrolladoresPorProyecto(idProyectos: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'usuarios/desarrolladores-proyecto', {id_proyectos: idProyectos});
  }
  cambiarPrioridadError(idErrores: string, idPrioridades: string): Observable<any> {
    return this.http.put(this.appService.URL_API + 'errores/cambiar-prioridad', {id_errores: idErrores, id_prioridades: idPrioridades});
  }
  asignarError(body: any): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores_usuarios/asignar', body);
  }
  editarErrorAsignado(body: any): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores_usuarios/cambiar', body);
  }
}
