import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor(private http: HttpClient, private appService: AppService, private datePipe: DatePipe) { }

  obtenerErroresAsigndosDev(idUsuarios: string, idProyectos: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores/errores-usuarios', {id_usuarios: idUsuarios, id_proyectos: idProyectos});
  }
  terminarErrorAsignado(idErroresUsuarios: string): Observable<any> {
    const body = {
      id_errores_usuarios: idErroresUsuarios,
      fecha_de_resolucion: this.datePipe.transform(new Date(), 'yyyy-MM-dd')
    };
    return this.http.post(this.appService.URL_API + 'errores_usuarios/terminar-error', body);
  }
  cambiarEstadoDeUnError(idErrores: string, idEstadosErrores: string): Observable<any> {
    return this.http.put(this.appService.URL_API + 'proyectos/estado-error', {id_errores: idErrores, id_estados_errores: idEstadosErrores});
  }
}
