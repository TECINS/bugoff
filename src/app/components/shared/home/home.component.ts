import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { ProyectInfo, ProyectosSelect } from '../../../models/proyectos.model';
import { UtilService } from '../../../services/util.service';
import { ProyectosService } from '../../../services/proyectos.service';
import { LocalSession } from '../../../models/session.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  activate = false;
  mobileQuery: MediaQueryList;
  proyectInfo: ProyectInfo;
  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);
  localsession: LocalSession;
  proyectos: ProyectosSelect[];
  proyectoActual = 'Proyectos';
  fillerContent = Array.from(
    { length: 50 }, () =>
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
  );
  private _mobileQueryListener: () => void;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private proyectosService: ProyectosService,
    private utilService: UtilService
    ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
    this.localsession = JSON.parse(localStorage.getItem('session-bugoff'));
  }

  activateSide(): void {
    this.activate = !this.activate;
  }
  ngOnInit(): void {
    if (this.proyectInfo) {
      this.proyectoActual = this.proyectInfo.nombre;
    } else {
      this.proyectoActual = 'Proyectos';
    }
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.proyectosService.obtenerProyectosPorId(this.localsession.id_usuarios)
      .subscribe( data => {
        if (!data.error) {
          console.log(data);
          this.proyectos = data.proyectos;
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'ocurrio un error al obtener los proyectos'
          });
        }
      }, err => console.log(err)).add ( () => this.utilService._loading = false);
  }
  selectProject(proyecto: ProyectosSelect): void {
    this.utilService._loading = true;
    this.proyectosService.obtenerInformacionDelProyecto(proyecto.id_proyectos, this.localsession.id_usuarios)
      .subscribe( data => {
        if (!data.error) {
            localStorage.setItem('proyect-info', JSON.stringify(data.message));
            window.location.reload();
        } else {
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'ocurrio un error al traer la informacion del proyecto'
          });
        }
      }, err => console.log(err)).add( () => this.utilService._loading = false);
  }
}
