import { Component, OnInit } from '@angular/core';
import { ViewErrorComponent } from '../view-error/view-error.component';
import { ErrorList } from '../../../models/error.model';
import { forkJoin } from 'rxjs';
import { LeaderService } from '../../../leader/services/leader.service';
import { UtilService } from '../../../services/util.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { LocalSession } from '../../../models/session.model';
import { ProyectInfo } from '../../../models/proyectos.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-history-errors',
  templateUrl: './history-errors.component.html',
  styleUrls: ['./history-errors.component.scss']
})
export class HistoryErrorsComponent implements OnInit {
  localSession: LocalSession;
  proyectInfo: ProyectInfo;
  erroresProyecto: any[];
  filtroSpan = 'Sin filtro';
  asignacion = 2;
  erroresProyectoFiltrado: any[] = [];
  errorInfo: any;
  errorActual: any;
  listaDesarrolladores: any[];
  prioridades = [
    { id_prioridades: 0, prioridad: 'Sin filtro'},
    { id_prioridades: 1, prioridad: 'Baja'},
    { id_prioridades: 2, prioridad: 'Media'},
    { id_prioridades: 3, prioridad: 'Alta'},
    { id_prioridades: 4, prioridad: 'Blocxer'},
  ];
  asignaciones = [
    { id_asignaciones: 1, asignacion: 'Asignado' },
    { id_asignaciones: 2, asignacion: 'No asignado' },
  ];
  constructor(
    private leaderService: LeaderService,
    private utilService: UtilService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    ) {
      this.localSession = JSON.parse(localStorage.getItem('session-bugoff'));
      this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    forkJoin({
      erroresProyecto: this.leaderService.obtenerTodosLosErroresDelProyecto(this.proyectInfo.id_proyectos),
    }).subscribe(data => {
      console.log(data);
      if (!data.erroresProyecto.error) {
        this.erroresProyecto = data.erroresProyecto.message;
        this.erroresProyectoFiltrado = data.erroresProyecto.message;
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Ocurrio un error al traer los proyectos'
        });
        console.log(data.erroresProyecto);
      }
    }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  filterPrioridad(prioridad: string): void {
    if (prioridad === 'Sin filtro') {
      this.erroresProyectoFiltrado = this.erroresProyecto;
      this.filtroSpan = 'Sin filtro';
    } else {
      const listTemp: ErrorList[] = [];
      this.erroresProyecto.forEach((error) => {
        if (error.grado_prioridad === prioridad) {
          listTemp.push(error);
        }
      });
      this.filtroSpan = prioridad;
      this.erroresProyectoFiltrado = listTemp;
    }
  }
  viewError(error: any): void {
      const modalRef = this.modalService.open(ViewErrorComponent, {size: 'xl', centered: true});
      modalRef.componentInstance.idErrores = error.id_errores;
  }

}
