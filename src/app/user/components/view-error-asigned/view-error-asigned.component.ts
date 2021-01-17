import { Component, Input, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util.service';
import { ActivatedRoute } from '@angular/router';
import { ErrorsService } from '../../services/errors.service';
import { ErrorDataAsigned } from '../../../models/error.model';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';
import { UserInfo } from '../../../models/users.model';
import { forkJoin } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-error-asigned',
  templateUrl: './view-error-asigned.component.html',
  styleUrls: ['./view-error-asigned.component.scss']
})
export class ViewErrorAsignedComponent implements OnInit {

  errorInfo: ErrorDataAsigned;
  infoAsignado: UserInfo;
  infoAutor: UserInfo;
  @Input() idErrores: string;
  @Input() idUsuarios: string;
  constructor(
    private utilService: UtilService,
    private errorsService: ErrorsService,
    private usersService: UsersService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.errorsService.obtenerErrorPorIdAsignado(this.idErrores, this.idUsuarios)
      .subscribe(data => {
        console.log(data);
        if (!data.error) {
          this.errorInfo = data.errorInfo;
          forkJoin({
            asignado: this.usersService.obtenerInformacionUsuario(this.errorInfo.id_usuarios.toString()),
            responsable: this.usersService.obtenerInformacionUsuario(this.errorInfo.autor_reporte.toString()),
          }).subscribe (resp => {
            if (!resp.asignado.error && !resp.responsable.error) {
              this.infoAsignado = resp.asignado.message;
              this.infoAutor = resp.responsable.message;
            }
          }, err => console.log(err)).add(() => this.utilService._loading = false);
        } else {
          Swal.fire({
            title: 'Error al obtener la información',
            icon: 'error',
            text: data.message
          });
        }
      }, err => console.log(err));
  }
}
