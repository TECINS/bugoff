import { Component, OnInit } from '@angular/core';
import { ProyectosSelect, ProyectInfo } from '../../../models/proyectos.model';
import { Router } from '@angular/router';
import { LocalSession } from '../../../models/session.model';

@Component({
  selector: 'app-home-leader',
  templateUrl: './home-leader.component.html',
  styleUrls: ['./home-leader.component.scss']
})
export class HomeLeaderComponent implements OnInit {
  
  proyects: ProyectosSelect[];
  localSession: LocalSession;
  proyectInfo: ProyectInfo;
  areaActual = '0';

  constructor(
    private router: Router
  ) {
    this.localSession = JSON.parse(localStorage.getItem('session-bugoff'));
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
  }

  ngOnInit(): void {
    if (this.proyectInfo) {
      this.areaActual = this.proyectInfo.id_areas;
    }
  }
  viewHistorial(): void {
    this.router.navigateByUrl('/app/leader/lista-errores');
  }
  toReportIssue(): void {
    this.router.navigateByUrl('/app/leader/reportar-error');
  }

}
