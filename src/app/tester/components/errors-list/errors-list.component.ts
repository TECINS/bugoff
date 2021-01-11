import { Component, OnInit } from '@angular/core';
import { ErroresService } from '../../services/errores.service';
import { UtilService } from '../../../services/util.service';
import { LocalSession } from '../../../models/session.model';
import { ProyectInfo } from '../../../models/proyectos.model';
import { ErrorData, ErrorList } from '../../../models/error.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  estados = [
    { id_estados_errores: '3', estado: 'En espera' },
    { id_estados_errores: '4', estado: 'En proceso' },
    { id_estados_errores: '5', estado: 'Terminada' },
  ];
  constructor(
    private errorsService: ErroresService,
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
      this.erroresFilter = this.filterConfirm(1);
    } else {
      this.erroresFilter = this.filterConfirm(0);
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
    this.router.navigateByUrl('/app/tester/error-info/' + error.id_errores);
  }
}
