import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorData } from '../../../models/error.model';
import { UtilService } from '../../../services/util.service';
import { ErroresService } from '../../services/errores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-errors-info',
  templateUrl: './errors-info.component.html',
  styleUrls: ['./errors-info.component.scss']
})
export class ErrorsInfoComponent implements OnInit {

  errorInfo: ErrorData;
  constructor(
    private utilService: UtilService,
    private activateRoute: ActivatedRoute,
    private errorsService: ErroresService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.errorsService.obtenerErrorPorId(this.activateRoute.snapshot.paramMap.get('id_errores'))
      .subscribe(data => {
        if (!data.error) {
          this.errorInfo = data.errorInfo;
        } else {
          Swal.fire({
            title: 'Error al obtener la información',
            icon: 'error',
            text: data.message
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }

}
