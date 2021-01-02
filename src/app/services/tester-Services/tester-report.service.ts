import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerPoint } from '../../config/config.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorReportService {

  constructor(private http: HttpClient, private appConfig: ServerPoint) { }
  
  errorReport(body: any): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'errores/reportar-error', body);
  }

}
