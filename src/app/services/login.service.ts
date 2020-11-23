import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerPoint } from '../config/config.services';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private SERV_POINT: ServerPoint
  ) { }

  sendForgotMessage( toEmail: string ): Observable<any>{
    return this.http.post(this.SERV_POINT.URL_API + 'usuarios/recuperar-contrasena', toEmail );
  }
  
  
  

  login(body: string): Observable<any>{
    return this.http.post(this.SERV_POINT.URL_API + 'usuarios/login', body);
    
  }

}
