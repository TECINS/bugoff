import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerPoint } from 'src/app/config/config.services';
@Injectable({
  providedIn: 'root'
})
export class LoadprojectsService {

  constructor(
    private http: HttpClient,
    private appConfig: ServerPoint
  ) {

  }
  loadProject(id: number): Observable<any> {
    //static info
    return this.http.get('../../assets/withoutapifiles/users-projects-roles.json');
  }
}
