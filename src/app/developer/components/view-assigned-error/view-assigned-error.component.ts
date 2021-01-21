import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../../services/util.service';
import { ErrorsService } from '../../../user/services/errors.service';
import { UsersService } from '../../../user/services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ErrorDataAsigned } from '../../../models/error.model';
import { UserInfo } from '../../../models/users.model';
import { DeveloperService } from '../../services/developer.service';

@Component({
  selector: 'app-view-assigned-error',
  templateUrl: './view-assigned-error.component.html',
  styleUrls: ['./view-assigned-error.component.scss']
})
export class ViewAssignedErrorComponent implements OnInit {

  errorInfo: ErrorDataAsigned;
  infoAsignado: UserInfo;
  infoAutor: UserInfo;
  @Input() idErrores: string;
  @Input() idUsuarios: string;
  estados = [
    {id_estados_errores: '4', estado: 'En proceso'},
    {id_estados_errores: '3', estado: 'En espera'},
  ];
  constructor(
    private utilService: UtilService,
    private errorsService: ErrorsService,
    private usersService: UsersService,
    public activeModal: NgbActiveModal,
    private developerService: DeveloperService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.utilService._loading = true;
    });
    this.errorsService.obtenerErrorPorIdAsignado(this.idErrores, this.idUsuarios)
      .subscribe(data => {
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
          console.log(data);
          Swal.fire({
            title: 'Error al obtener la información',
            icon: 'error',
            text: data.message
          });
        }
      }, err => console.log(err));
  }
  terminarError(): void {
    this.developerService.terminarErrorAsignado(this.errorInfo.id_errores_usuarios.toString())
      .subscribe(data => {
        if (!data.error) {
          Swal.fire({
            title: 'Se marco como terminado el error',
            icon: 'success'
          });
          this.developerService.cambiarEstadoDeUnError(this.idErrores, '5')
            .subscribe(resp => {
              if (resp.error) {
                console.log(resp);
                Swal.fire({
                  title: 'ocurrio un error al cambiar el estado',
                  icon: 'error'
                });
              }
            }, err => console.log(err));
        }
      }, err => console.log(err));
  }
  cambiarEstado(idEstadosErrores: string, estado: string): void {
    this.utilService._loading = true;
    this.developerService.cambiarEstadoDeUnError(this.idErrores, idEstadosErrores)
      .subscribe(data => {
        if (data.error) {
          console.log(data);
          Swal.fire({
            title: 'ocurrio un error al cambiar el estado',
            icon: 'error'
          });
        } else {
          this.errorInfo.estado = estado;
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
}
