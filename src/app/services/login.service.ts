import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerPoint } from '../config/config.services';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  headers = new HttpHeaders();
  constructor(
    private http: HttpClient,
    private SERV_POINT: ServerPoint
  ) {
    this.headers.set('Content-Type', 'application/json; charset=utf-8');
   }


  sendForgotMessage( correo: string ): Observable<any>{
    return this.http.post(this.SERV_POINT.URL_API + 'usuarios/recuperar-contrasena', correo , {headers: this.headers});
  }
  
  
  

  login(body: string): Observable<any>{
    return this.http.post(this.SERV_POINT.URL_API + 'usuarios/login', body);
    
  }

  registro(body:string): Observable<any>{
    return this.http.post(this.SERV_POINT.URL_API + 'usuarios/registro', body);
  }

}
