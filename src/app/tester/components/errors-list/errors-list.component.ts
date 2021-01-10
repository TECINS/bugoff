import { Component, OnInit } from '@angular/core';
import { ErroresService } from '../../services/errores.service';
import { UtilService } from '../../../services/util.service';
import { LocalSession } from '../../../models/session.model';
import { ProyectInfo } from '../../../models/proyectos.model';
import { ErrorData } from '../../../models/error.model';

@Component({
  selector: 'app-errors-list',
  templateUrl: './errors-list.component.html',
  styleUrls: ['./errors-list.component.scss']
})
export class ErrorsListComponent implements OnInit {
  localSession: LocalSession;
  proyectInfo: ProyectInfo;
  areaActual = 0;
  errores: ErrorData[];
  estados = [
    { id_estados: '0', estado: 'No Asignados' },
    { id_estados: '1', estado: 'Asignados' },
    { id_estados: '2', estado: 'Terminados por desarrollador' },
    { id_estados: '3', estado: 'Confirmados por Tester' },
  ];
  constructor(
    private errorsService: ErroresService,
    private utilService: UtilService
  ) {
    this.localSession = JSON.parse(localStorage.getItem('session-bugoff'));
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
    console.log(this.proyectInfo);
  }

  ngOnInit(): void {
    this.utilService._loading = true;
    this.errorsService.obtenerErroresDeUsuarioTester(this.localSession.id_usuarios, this.proyectInfo.id_proyectos)
      .subscribe(data => {
        console.log(data);
        if (!data.error) {
          this.errores = data.erroresTester;
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
}
