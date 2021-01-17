import { Component, OnInit } from '@angular/core';
import { ProyectosSelect, ProyectInfo } from '../../../models/proyectos.model';
import { Router } from '@angular/router';
import { LocalSession } from '../../../models/session.model';


@Component({
  selector: 'app-home-developer',
  templateUrl: './home-developer.component.html',
  styleUrls: ['./home-developer.component.scss']
})
export class HomeDeveloperComponent implements OnInit {

  proyects: ProyectosSelect[];
  localSession: LocalSession;
  proyectInfo: ProyectInfo;
  areaActual = '0';

  constructor( ) {
    this.localSession = JSON.parse(localStorage.getItem('session-bugoff'));
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
  }

  ngOnInit(): void {
    if (this.proyectInfo) {
      this.areaActual = this.proyectInfo.id_areas;
    }
  }

}
