import { Component, OnInit } from '@angular/core';
import { ErroresService } from '../../services/errores.service';
import { UtilService } from '../../../services/util.service';
import { LocalSession } from '../../../models/session.model';
import { ProyectInfo } from '../../../models/proyectos.model';
import { ErrorData, ErrorList } from '../../../models/error.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ViewErrorComponent } from '../../../user/components/view-error/view-error.component';

@Component({
  selector: 'app-errors-list',
  templateUrl: './errors-list.component.html',
  styleUrls: ['./errors-list.component.scss']
})
export class ErrorsListComponent implements OnInit {
  localSession: LocalSession;
  proyectInfo: ProyectInfo;
  areaActual = 0;
  errores: ErrorList[];
  erroresFilter: ErrorList[] = [];
  errorInfo: ErrorData;
  errorActual: ErrorList;
  estados = [
    { id_estados_errores: '3', estado: 'En espera' },
    { id_estados_errores: '4', estado: 'En proceso' },
    { id_estados_errores: '5', estado: 'Terminada' },
  ];
  constructor(
    private errorsService: ErroresService,
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
    this.errorsService.obtenerErroresDeUsuarioTester(this.localSession.id_usuarios, this.proyectInfo.id_proyectos)
      .subscribe(data => {
        if (!data.error) {
          this.errores = data.erroresTester;
          this.erroresFilter = data.erroresTester;
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }

  onChangeCb(value: boolean): void {
    if (value) {
      this.erroresFilter = this.errores;
      this.erroresFilter = this.filterConfirm(1);
    } else {
      this.erroresFilter = this.errores;
    }
  }

  filterConfirm(confirmValue: number): ErrorList[] {
    const erroresTemp: ErrorList[] = [];
    this.errores.forEach(error => {
      if (Number(error.confirmado) === confirmValue) {
        erroresTemp.push(error);
      }
    });
    return erroresTemp;
  }
  selectEstado(idEstadoError: string): void{
    this.erroresFilter = this.filterEstado(Number(idEstadoError));
  }
  filterEstado(idEstados: number): ErrorList[] {
    const erroresTemp: ErrorList[] = [];
    this.errores.forEach(error => {
      if (Number(error.id_estados_errores) === idEstados) {
        erroresTemp.push(error);
      }
    });
    return erroresTemp;
  }
  verError(error: ErrorList): void {
    const modalRef = this.modalService.open(ViewErrorComponent, {size: 'xl'});
    modalRef.componentInstance.idErrores = error.id_errores;
  }
  openConfirm(content: any, error: ErrorList): void {
    this.modalService.open(content, {centered: true});
    this.errorActual = error;
  }
  confirmarError(): void {
    this.utilService._loading = true;
    this.errorsService.confirmarError(this.errorActual.id_errores)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire({
            title: 'El error se confirmo correctamente',
            icon: 'success'
          });
          this.ngOnInit();
          this.modalService.dismissAll();
        } else {
          console.log(data);
          Swal.fire({
            title: 'Ocurrio un error al confirmar',
            icon: 'error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
}
