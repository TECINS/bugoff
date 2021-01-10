import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../services/app.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorReportService {

  constructor(private http: HttpClient, private appConfig: AppService) { }

  errorReport(body: any): Observable<any> {
    return this.http.post(this.appConfig.URL_API + 'errores/reportar-error', body);
  }

}
