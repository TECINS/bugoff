import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../../services/leader.service';
import { ErrorList, ErrorAsignedList } from '../../../models/error.model';
import { UtilService } from '../../../services/util.service';
import { LocalSession } from '../../../models/session.model';
import { ProyectInfo } from '../../../models/proyectos.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-proyect',
  templateUrl: './manage-proyect.component.html',
  styleUrls: ['./manage-proyect.component.scss']
})
export class ManageProyectComponent implements OnInit {

  localSession: LocalSession;
  proyectInfo: ProyectInfo;
  erroresProyecto: any[];
  titleList = 'Lista general';
  filtroSpan = 'Sin filtro';
  asignacion = 2;
  erroresProyectoFiltrado: any[];
  prioridades = [
    { id_prioridades: 0, prioridad: 'Sin filtro'},
    { id_prioridades: 1, prioridad: 'Baja'},
    { id_prioridades: 2, prioridad: 'Media'},
    { id_prioridades: 3, prioridad: 'Alta'},
    { id_prioridades: 4, prioridad: 'Blocker'},
  ];
  asignaciones = [
    { id_asignaciones: 1, asignacion: 'Asignado' },
    { id_asignaciones: 2, asignacion: 'No asignado' },
  ];
  constructor(
    private leaderService: LeaderService,
    private utilService: UtilService,
    private router: Router
    ) {
      this.localSession = JSON.parse(localStorage.getItem('session-bugoff'));
      this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
    }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.leaderService.obtenerTodosLosErroresDelProyecto(this.proyectInfo.id_proyectos)
      .subscribe(data => {
        if (!data.error) {
          this.erroresProyecto = data.message;
          this.erroresProyectoFiltrado = data.message;
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  filterAsignacion(asignacion: string): void {
    switch (Number(asignacion)) {
      case 1:
        this.utilService._loading = true;
        this.leaderService.obtenerListaErroresAsignados(this.proyectInfo.id_proyectos)
          .subscribe(data => {
            this.asignacion = 1;
            this.erroresProyecto = data.erroresAsignados;
            this.erroresProyectoFiltrado = this.erroresProyecto;
            if (this.filtroSpan !== 'Sin filtro') {
              this.filterPrioridad(this.filtroSpan);
            }
            this.titleList = 'Lista de asignados';
          }, err => console.log(err)).add(() => this.utilService._loading = false);
        break;
      case 2:
        this.utilService._loading = true;
        this.leaderService.obtenerListaErroresNoAsignados(this.proyectInfo.id_proyectos)
          .subscribe(data => {
            this.erroresProyecto = data.erroresNoAsignados;
            this.asignacion = 2;
            this.erroresProyectoFiltrado = this.erroresProyecto;
            if (this.filtroSpan !== 'Sin filtro') {
              this.filterPrioridad(this.filtroSpan);
            }
            this.titleList = 'Lista de no asignados';
          }, err => console.log(err)).add(() => this.utilService._loading = false);
        break;
    }
  }
  filterPrioridad(prioridad: string): void {
    if (prioridad === 'Sin filtro') {
      this.erroresProyectoFiltrado = this.erroresProyecto;
      this.filtroSpan = 'Sin filtro';
    } else {
      const listTemp: ErrorList[] = [];
      this.erroresProyecto.forEach((error) => {
        if (error.grado_prioridad === prioridad) {
          console.log('entro');
          listTemp.push(error);
        }
      });
      this.filtroSpan = prioridad;
      this.erroresProyectoFiltrado = listTemp;
    }
  }
  viewError(error: any): void {
    if (this.asignacion === 1) {
      console.log(error);
      this.router.navigateByUrl('/app/usuario/ver-error-asignado/' + error.id_errores + '/' + error.id_usuarios);
    } else {
      this.router.navigateByUrl('/app/usuario/ver-error/' + error.id_errores);
    }
  }
}
