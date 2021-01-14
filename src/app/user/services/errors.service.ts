import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private http: HttpClient, private appService: AppService) { }
  obtenerErrorPorId(idErrores: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores/error-by-id', {id_errores: idErrores});
  }
  obtenerErrorPorIdAsignado(idErrores: string, idUsuarios: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'errores/error-by-id-asigned', {id_errores: idErrores, id_usuarios: idUsuarios});
  }
}
