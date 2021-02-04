import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class ErroresService {

  constructor(private http: HttpClient, private appService: AppService) { }

  obtenerErroresDeUsuarioTester(idUsuarios: string, idProyectos: string): Observable<any> {
    const body = {
      id_usuarios: idUsuarios,
      id_proyectos: idProyectos
    };
    return this.http.post(this.appService.URL_API + 'errores/errores-tester', body);
  }
  confirmarError(idErrores: string): Observable<any> {
    return this.http.put(this.appService.URL_API + 'errores/confirmar', {id_errores: idErrores});
  }
}
