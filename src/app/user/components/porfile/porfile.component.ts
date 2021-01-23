import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { LocalSession } from '../../../models/session.model';
import { UtilService } from '../../../services/util.service';
import { ProyectInfo } from '../../../models/proyectos.model';



@Component({
  selector: 'app-porfile',
  templateUrl: './porfile.component.html',
  styleUrls: ['./porfile.component.scss']
})
export class PorfileComponent implements OnInit {

  secionlocal: LocalSession;
  actualizarinfo: FormGroup;
  proyectInfo: ProyectInfo;
  @ViewChild('porfile', {
    read: ElementRef
  }) imagen: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private utilService: UtilService
    ) {

    this.secionlocal = JSON.parse(localStorage.getItem("session-bugoff"));
    this.proyectInfo = JSON.parse(localStorage.getItem('proyect-info'));
    this.actualizarinfo = this.formBuilder.group({
      nombre: [this.secionlocal.nombre, Validators.required],
      apellido_paterno: [this.secionlocal.apellido_paterno, Validators.required],
      apellido_materno: [this.secionlocal.apellido_materno, Validators.required],
      user_name: [this.secionlocal.user_name, Validators.required],
      correo: [this.secionlocal.correo, [Validators.required, Validators.email]],
      contrasenia: [this.secionlocal.contrasenia, Validators.required],
      descripcion: [this.secionlocal.descripcion, Validators.required],
      id_usuarios: [this.secionlocal.id_usuarios],
    });
  }


  ngOnInit(): void {

  }

  _ActualizarInfo() {
    this.utilService._loading = true;
    this.userService.actualizarUsuario(this.actualizarinfo.value).subscribe(
      data => {
        if (!data.error) {
          Swal.fire({
            title: 'Se actualizo correctamente',
            icon: 'success'
          });
          this.secionlocal.apellido_materno = this.actualizarinfo.value.apellido_materno;
          this.secionlocal.apellido_paterno = this.actualizarinfo.value.apellido_paterno;
          this.secionlocal.nombre = this.actualizarinfo.value.nombre;
          this.secionlocal.user_name = this.actualizarinfo.value.user_name;
          this.secionlocal.correo = this.actualizarinfo.value.correo;
          this.secionlocal.contrasenia = this.actualizarinfo.value.contrasenia;
          this.secionlocal.descripcion = this.actualizarinfo.value.descripcion;
          localStorage.setItem('session-bugoff', JSON.stringify(this.secionlocal));
        } else {
          console.log(data);
          Swal.fire({
            title: 'Ocurrio un error al actualizar',
            icon: 'info',
            text: data.message
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
  }
  openFile() {
    document.querySelector('input').click();
  }
  updatePorfilePicture(_: Event) {
    if (this.imagen.nativeElement.files[0]) {
      const value = new FormData();
    const porfilePicture = this.imagen.nativeElement.files[0];
    this.utilService._loading = true;
    value.append('foto_perfil', porfilePicture);
    value.append('id_usuarios', this.secionlocal.id_usuarios);
    value.append('user_name', this.secionlocal.user_name);
    this.userService.actualizarFotoPerfil(value)
      .subscribe(data => {
        if (!data.error) {
          Swal.fire({
            title: 'Actualizado',
            text: data.message,
            icon: 'success'
          });
          console.log(data);
          this.secionlocal.foto_perfil = data.ruta;
          localStorage.setItem('session-bugoff', JSON.stringify(this.secionlocal));
        } else {
          Swal.fire({
            title: 'Error',
            text: data.message,
            icon: 'error'
          });
        }
      }, err => console.log(err)).add(() => this.utilService._loading = false);
    }
  }
}
