import { Component, OnInit } from '@angular/core';
import { ProyectosSelect, ProyectInfo } from '../../../models/proyectos.model';
import { Router } from '@angular/router';
import { LocalSession } from '../../../models/session.model';

@Component({
  selector: 'app-home-tester',
  templateUrl: './home-tester.component.html',
  styleUrls: ['./home-tester.component.scss']
})
export class HomeTesterComponent implements OnInit {
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
    this.router.navigateByUrl('/tester/lista-errores');
  }
  toReportIssue(): void {
    this.router.navigateByUrl('/tester/reportar-error');
  }
}
