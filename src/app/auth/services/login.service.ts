import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from '../../services/app.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private SERV_POINT: AppService
  ) {
  }


  sendForgotMessage( correo: string ): Observable<any>{
    return this.http.post(this.SERV_POINT.URL_API + 'usuarios/recuperar-contrasena', {correo});
  }

  login(body: any): Observable<any>{
    return this.http.post(this.SERV_POINT.URL_API + 'usuarios/login', body);
  }

  registro(body: any): Observable<any>{
    return this.http.post(this.SERV_POINT.URL_API + 'usuarios/registro', body);
  }

}
