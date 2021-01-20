import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util.service';
import { DeveloperService } from '../../services/developer.service';
import { ProyectInfo } from '../../../models/proyectos.model';
import { LocalSession } from '../../../models/session.model';
import Swal from 'sweetalert2';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewAssignedErrorComponent } from '../view-assigned-error/view-assigned-error.component';

@Component({
  selector: 'app-assigned-errors',
  templateUrl: './assigned-errors.component.html',
  styleUrls: ['./assigned-errors.component.scss']
})
export class AssignedErrorsComponent implements OnInit {

  prioridades = [
    { id_prioridades: 0, prioridad: 'Sin filtro'},
    { id_prioridades: 1, prioridad: 'Baja'},
    { id_prioridades: 2, prioridad: 'Media'},
    { id_prioridades: 3, prioridad: 'Alta'},
    { id_prioridades: 4, prioridad: 'Blocker'},
  ];
  filtroSpan = 'Sin filtro';
  erroresDev = [];
  erroresDevFiltrado = [];
  projectInfo: ProyectInfo;
  localSession: LocalSession;
  constructor(
    private utilService: UtilService,
    private developerService: DeveloperService,
    private modalService: NgbModal,
    config: NgbModalConfig,
  ) {
    this.projectInfo = JSON.parse(localStorage.getItem('proyect-info'));
    this.localSession = JSON.parse(localStorage.getItem('session-bugoff'));
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.developerService.obtenerErroresAsigndosDev(this.localSession.id_usuarios, this.projectInfo.id_proyectos)
      .subscribe(data => {
        console.log(data);
        if (!data.error) {
          this.erroresDev = data.errores_asignados;
          this.erroresDevFiltrado = data.errores_asignados;
        } else {
          console.log(data);
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Ocurrio un error al obtener los errores asignados'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  filterPrioridad(prioridad: string): void {
    if (prioridad === 'Sin filtro') {
      this.erroresDevFiltrado = this.erroresDev;
      this.filtroSpan = 'Sin filtro';
    } else {
      const listTemp = [];
      this.erroresDev.forEach((error) => {
        if (error.grado_prioridad === prioridad) {
          listTemp.push(error);
        }
      });
      this.filtroSpan = prioridad;
      this.erroresDevFiltrado = listTemp;
    }
  }
  viewError(error: any): void {
      const modalRef = this.modalService.open(ViewAssignedErrorComponent, {size: 'xl'});
      modalRef.componentInstance.idErrores = error.id_errores;
      modalRef.componentInstance.idUsuarios = error.id_usuarios;
  }
}
