import { Component, OnInit } from '@angular/core';
import { LeaderService } from '../../services/leader.service';
import { ErrorList, ErrorData, ErrorDataAsigned } from '../../../models/error.model';
import { UtilService } from '../../../services/util.service';
import { LocalSession } from '../../../models/session.model';
import { ProyectInfo } from '../../../models/proyectos.model';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { stringify } from '@angular/compiler/src/util';
import { forkJoin } from 'rxjs';
import { ViewErrorComponent } from '../../../user/components/view-error/view-error.component';
import { ViewErrorAsignedComponent } from '../../../user/components/view-error-asigned/view-error-asigned.component';

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
  formError: FormGroup;
  formAsignarError: FormGroup;
  formEditarAsignado: FormGroup;
  constructor(
    private leaderService: LeaderService,
    private utilService: UtilService,
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
          fecha_de_entrega: [{value: '', disabled: true}, [Validators.required]],
      });
      this.formAsignarError = this.fb.group({
        id_usuarios: ['', [Validators.required]],
        id_errores: ['1', [Validators.required]],
        fecha_de_entrega: ['', [Validators.required]]
      });
      this.formEditarAsignado = this.fb.group({
        id_usuarios: [{value: '', disabled: true}, [Validators.required]],
        id_errores: [{value: '1', disabled: true}, [Validators.required]],
        fecha_de_entrega: [{value: '', disabled: false}, [Validators.required]]
      });
    }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    forkJoin({
      erroresNoAsignados: this.leaderService.obtenerListaErroresNoAsignados(this.proyectInfo.id_proyectos),
      listaDesarrolladores: this.leaderService.obtenerDesarrolladoresPorProyecto(this.proyectInfo.id_proyectos)
    }).subscribe(data => {
      if (!data.erroresNoAsignados.error) {
        this.erroresProyecto = data.erroresNoAsignados.erroresNoAsignados;
        this.erroresProyectoFiltrado = data.erroresNoAsignados.erroresNoAsignados;
      } else {
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Ocurrio un error al traer los proyectos'
        });
        console.log(data.erroresNoAsignados);
      }
      if (!data.listaDesarrolladores.error) {
        this.listaDesarrolladores = data.listaDesarrolladores.desarrolladores;
      } else {
        console.log(data.listaDesarrolladores);
        Swal.fire({
          title: 'Error',
          icon: 'error',
          text: 'Ocurrio un error al traer los proyectos'
        });
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
      const modalRef = this.modalService.open(ViewErrorAsignedComponent, {size: 'xl', centered: true});
      modalRef.componentInstance.idErrores = error.id_errores;
      modalRef.componentInstance.idUsuarios = error.id_usuarios;
    } else {
      const modalRef = this.modalService.open(ViewErrorComponent, {size: 'xl', centered: true});
      modalRef.componentInstance.idErrores = error.id_errores;
    }
  }
  openEdit(content: any, error: any): void {
    this.utilService._loading = true;
    if (error.fecha_de_entrega) {
      this.leaderService.obtenerErrorPorIdAsignado(error.id_errores, error.id_usuarios)
      .subscribe(data => {
        if (!data.error) {
          this.errorInfo = data.errorInfo;
          this.formError.get('titulo_error').setValue(this.errorInfo.titulo_error);
          this.formError.get('iteraciones').setValue(this.errorInfo.iteraciones);
          this.formError.get('descripcion').setValue(this.errorInfo.descripcion);
          this.formError.get('dispositivo_uso').setValue(this.errorInfo.dispositivo_uso);
          this.formError.get('porcentaje_aparicion').setValue(this.errorInfo.porcentaje_aparicion);
          this.formError.get('rama_repositorio').setValue(this.errorInfo.rama_repositorio);
          this.formError.get('id_prioridades').setValue(stringify(this.errorInfo.id_prioridades));
          this.formError.get('fecha_de_entrega').setValue(this.errorInfo.fecha_de_entrega.substring(0, 10));
          this.formError.get('fecha_reporte').setValue(this.errorInfo.fecha_reporte.substring(0, 10));
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
    } else {
      this.leaderService.obtenerErrorPorId(error.id_errores)
      .subscribe(data => {
        if (!data.error) {
          console.log(data.errorInfo);
          this.errorInfo = data.errorInfo;
          this.formError.get('titulo_error').setValue(this.errorInfo.titulo_error);
          this.formError.get('iteraciones').setValue(this.errorInfo.iteraciones);
          this.formError.get('descripcion').setValue(this.errorInfo.descripcion);
          this.formError.get('dispositivo_uso').setValue(this.errorInfo.dispositivo_uso);
          this.formError.get('porcentaje_aparicion').setValue(this.errorInfo.porcentaje_aparicion);
          this.formError.get('rama_repositorio').setValue(this.errorInfo.rama_repositorio);
          this.formError.get('id_prioridades').setValue(stringify(this.errorInfo.id_prioridades));
          this.formError.get('fecha_reporte').setValue(this.errorInfo.fecha_reporte.substring(0, 10));
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
  }
  openAsing(content: any, error: any): void {
    this.errorActual = error;
    this.modalService.open(content, {size: 'md', centered: true});
  }
  editarErrorReportado(): void {
    this.utilService._loading = true;
    this.leaderService.cambiarPrioridadError(this.errorInfo.id_errores.toString(), this.formError.get('id_prioridades').value)
      .subscribe(data => {
        if (!data.error) {
          this.ngOnInit();
          Swal.fire ({
            title: 'El error se edito correctamente',
            icon: 'success'
          });
          this.ngOnInit();
        } else {
          console.log(data);
          Swal.fire ({
            title: 'Ocurrio un error al editar',
            icon: 'error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  asignarErrorReportado(): void {
    this.formAsignarError.get('id_errores').setValue(this.errorActual.id_errores);
    this.utilService._loading = true;
    this.leaderService.asignarError(this.formAsignarError.value)
      .subscribe (data => {
        if (!data.error) {
          this.ngOnInit();
          Swal.fire({
            title: 'Asignado',
            icon: 'success',
            text: 'El error se asigno correctamente se envio un correo'
          });
        } else {
          console.log(data);
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Ocurrio un error al asignar el error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  editarErrorAsignado(): void {
    this.utilService._loading = true;
    this.leaderService.editarErrorAsignado(this.formEditarAsignado.value)
      .subscribe (data => {
        console.log(data);
        if (!data.error) {
          this.modalService.dismissAll();
          this.ngOnInit();
          Swal.fire({
            title: 'Editado',
            icon: 'success',
            text: 'El error asignado se edito correctamente se envio un correo'
          });
        } else {
          console.log(data);
          Swal.fire({
            title: 'Error',
            icon: 'error',
            text: 'Ocurrio un error al asignar el error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  openEditDate(content: any, error: any): void {
    this.errorActual = error;
    this.utilService._loading = true;
    this.leaderService.obtenerErrorAsignado({id_errores_usuarios: error.id_errores_usuarios})
      .subscribe (data => {
        if (!data.error) {
          console.log(data);
          this.formEditarAsignado.get('id_errores').setValue(data.message.id_errores);
          this.formEditarAsignado.get('fecha_de_entrega').setValue(data.message.fecha_de_entrega.substring(0, 10));
          this.formEditarAsignado.get('id_usuarios').setValue(data.message.id_usuarios);
        } else {
          Swal.fire({
            title: 'error al obtener informacion',
            icon: 'error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
    this.modalService.open(content, {size: 'md', centered: true});
  }
}
