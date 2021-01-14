import { Component, OnInit } from '@angular/core';
import { ErrorData } from '../../../models/error.model';
import { UtilService } from '../../../services/util.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { ErrorsService } from '../../services/errors.service';

@Component({
  selector: 'app-view-error',
  templateUrl: './view-error.component.html',
  styleUrls: ['./view-error.component.scss']
})
export class ViewErrorComponent implements OnInit {

  errorInfo: ErrorData;
  paramsPage: any;
  constructor(
    private utilService: UtilService,
    private activateRoute: ActivatedRoute,
    private errorsService: ErrorsService
  ) {
    this.paramsPage = this.activateRoute.snapshot.paramMap;
  }

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
