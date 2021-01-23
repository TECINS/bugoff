import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from '../../services/app.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private appService: AppService) { }

  obtenerInformacionUsuario(idUsuario: string): Observable<any> {
    return this.http.post(this.appService.URL_API + 'usuarios/info', {id_usuarios: idUsuario});
  }

  actualizarUsuario(body:any): Observable<any>{
    return this.http.put(this.appService.URL_API +'usuarios/actualizar',body);
  }
  actualizarFotoPerfil(body: any): Observable<any> {
    return this.http.put(this.appService.URL_API + 'usuarios/actualizar-foto-perfil', body);
  }
}
