import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from './services/util.service';
import { LocalSession } from './models/session.model';
import { ProyectInfo } from './models/proyectos.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bugOff';
  localSession: LocalSession;
  proyectInfo: ProyectInfo;
  constructor(private router: Router, public utilService: UtilService) {
    this.localSession = JSON.parse(localStorage.getItem('session-bugoff'));
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
  }

  ngOnInit(): void {
    if (this.localSession) {
      if (this.proyectInfo) {
        console.log('si hay proyecto info');
        console.log(this.proyectInfo.id_areas);
        switch (Number(this.proyectInfo.id_areas)) {
          // lider
          case 1:
            this.router.navigateByUrl('/app/lider');
            break;
          // developer
          case 2:
            this.router.navigateByUrl('/app/desarrollador');
            break;
          // tester
          case 3:
            this.router.navigateByUrl('/app/tester');
            break;
        }
      } else {
        this.router.navigateByUrl('/app/user');
      }
    } else {
      this.router.navigateByUrl('auth');
    }
  }
}
