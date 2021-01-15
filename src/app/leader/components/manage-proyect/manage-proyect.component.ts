import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../../services/leader.service';
import { ErrorList, ErrorAsignedList, ErrorData, ErrorDataAsigned } from '../../../models/error.model';
import { UtilService } from '../../../services/util.service';
import { LocalSession } from '../../../models/session.model';
import { ProyectInfo } from '../../../models/proyectos.model';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-manage-proyect',
  templateUrl: './manage-proyect.component.html',
  styleUrls: ['./manage-proyect.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ManageProyectComponent implements OnInit {

  localSession: LocalSession;
  proyectInfo: ProyectInfo;
  erroresProyecto: any[];
  titleList = 'Lista de errores no asignados';
  filtroSpan = 'Sin filtro';
  asignacion = 2;
  erroresProyectoFiltrado: any[];
  errorInfoAsigned: ErrorDataAsigned;
  errorInfo: ErrorData;
  errorActual: ErrorList;
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
  formError: FormGroup;
  formAsignarError: FormGroup;
  constructor(
    private leaderService: LeaderService,
    private utilService: UtilService,
    private router: Router,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private fb: FormBuilder
    ) {
      this.localSession = JSON.parse(localStorage.getItem('session-bugoff'));
      this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
      config.backdrop = 'static';
      config.keyboard = false;
      this.formError = this.fb.group({
          autor_reporte: [''],
          id_proyectos: [''],
          fecha_reporte: [{value: '', disabled: true}],
          titulo_error: [{value: '', disabled: true}, [Validators.required]],
          iteraciones: [{value: '', disabled: true}, [Validators.required]],
          porcentaje_aparicion: [{value: '', disabled: true}, [Validators.required]],
          dispositivo_uso: [{value: '', disabled: true}, [Validators.required]],
          descripcion: [{value: '', disabled: true}, [Validators.required]],
          id_prioridades: ['', [Validators.required]],
          anexo: ['anexo', [Validators.required]],
          rama_repositorio: [{value: '', disabled: true}, [Validators.required]],
      });
      this.formAsignarError = this.fb.group({
        id_usuarios: ['', [Validators.required]],
        id_errores: ['', [Validators.required]],
        fecha_de_entrega: ['', [Validators.required]]
      });
    }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.leaderService.obtenerListaErroresNoAsignados(this.proyectInfo.id_proyectos)
      .subscribe(data => {
        if (!data.error) {
          this.erroresProyecto = data.erroresNoAsignados;
          this.erroresProyectoFiltrado = data.erroresNoAsignados;
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
            this.titleList = 'Lista de errores asignados';
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
            this.titleList = 'Lista de errores no asignados';
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
  openEdit(content: any, error: ErrorList): void {
    console.log(error);
    this.utilService._loading = true;
    this.leaderService.obtenerErrorPorId(error.id_errores)
      .subscribe(data => {
        if (!data.error) {
          this.errorInfo = data.errorInfo;
          this.formError.get('titulo_error').setValue(data.errorInfo.titulo_error);
          this.formError.get('iteraciones').setValue(data.errorInfo.iteraciones);
          this.formError.get('descripcion').setValue(data.errorInfo.descripcion);
          this.formError.get('dispositivo_uso').setValue(data.errorInfo.dispositivo_uso);
          this.formError.get('porcentaje_aparicion').setValue(data.errorInfo.porcentaje_aparicion);
          this.formError.get('rama_repositorio').setValue(data.errorInfo.rama_repositorio);
          this.formError.get('id_prioridades').setValue(stringify(data.errorInfo.id_prioridades));
          this.modalService.open(content, {size: 'lg', centered: true});
        } else {
          console.log(data);
          Swal.fire({
            title: 'Error',
            text: 'Ocurrio un error al obtener la informacion del errro',
            icon: 'error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  openAsing(content: any, error: any): void {
    console.log(error);
    this.errorActual = error;
    this.modalService.open(content, {size: 'md', centered: true});
  }
  editarErrorReportado(): void {
    // TODO: servicio para editar error
    console.log('se edita el error');
  }
  asignarErrorReportado(): void {
    // TODO: servicio para asignar error
    console.log('se asigna el error');
  }
}
